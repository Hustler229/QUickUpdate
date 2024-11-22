/* eslint-disable react/no-unescaped-entities */

import Typography from "@/components/design/typography";
import GoogleLoginButton from "@/components/googleLoginBtn";
import { auth, db } from "@/config/firebase.config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";

// Types
type PhoneNumber = {
  value: string;
  canonicalForm?: string;
};

type Contact = {
  etag: string;
  names?: { displayName: string }[];
  phoneNumbers?: PhoneNumber[];
};

interface ContactFiltered {
  id: string;
  nom: string | undefined;
  contact: string | undefined;
}

type ResponseType = {
  access_token: string;
};

// Fonction pour récupérer les contacts via l'API Next.js
const fetchContacts = async (accessToken: string): Promise<Contact[]> => {
  try {
    const response = await fetch(`/api/contacts?access_token=${accessToken}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des contacts");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API contacts:", error);
    return [];
  }
};

// Fonction pour appeler l'API et sauvegarder les vCards
const saveVcfToSupabase = async (contacts: ContactFiltered[], userId: string, fileNamePrefix: string) => {
  try {
    const response = await fetch('/api/generateVcard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: contacts.map((contact) => ({
          name: contact.nom,  // Nom du contact
          phone: contact.contact,  // Numéro du contact
        })),
        id: `${userId}-${fileNamePrefix}`,  // L'ID du fichier
      }),
    });

    const result = await response.json();

    if (response.ok) {
      // Retourner l'ID du fichier ou son URL dans Supabase
      return result.fileId;
    } else {
      return result.error
    }
  } catch (error) {
    return error;
  }
};

// Appel de l'API pour sauvegarder les contacts importés et mis à jour
const saveBothVcfFiles = async (
  importedContacts: ContactFiltered[],
  allContacts: ContactFiltered[],
  userId: string
) => {
  try {
    const importedFileId:string = await saveVcfToSupabase(importedContacts, userId, 'Elder');
    const allFileId:string = await saveVcfToSupabase(allContacts, userId, 'Updated');

    return { importedFileId, allFileId };
  } catch (error) {
    return error;
  }
};


const updateUserDocumentWithVcf = async (
  userId: string,
  filePath: string,
  isUpdated: boolean
) => {
  const userDoc = doc(db, "users", userId);
  const fileType = isUpdated ? "updatedFiles" : "importedFiles";

  await updateDoc(userDoc, {
    [fileType]: arrayUnion(filePath), 
  });
};

const UpdateUserData = async (
  nbrImported:number,
  nbrSelection :number,
  nbrUpdated:number,
  userId:string
) => {
  const userDoc = doc(db, "users", userId);

  await updateDoc(userDoc, {
    contact_imported:nbrImported,
    contact_selected:nbrSelection,
    contact_updated:nbrUpdated
  });
};

// Composant principal
const UpdateComponent = () => {
  // États
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const user = auth.currentUser

  // Callback de succès après connexion Google
  const onSuccess = async (response: unknown) => {
    setLoading(true);
    try {
      if (
        typeof response === "object" &&
        response !== null &&
        "access_token" in response
      ) {
        const accessToken = (response as ResponseType).access_token;
        const contactsResponse = await fetchContacts(accessToken);
  
        const contactArray = contactsResponse.map((contact) => ({
          id: contact.etag,
          nom: contact.names?.[0]?.displayName,
          contact: contact.phoneNumbers?.[0]?.canonicalForm,
        }));
  
        const importedContacts = contactArray.filter(
          (contact) => contact.contact !== undefined
        );
  
        // Mettre à jour les numéros de téléphone
        const allContacts = importedContacts.map((contact) => {
          if (contact.contact?.startsWith("+229") && /^\+229\d{8}$/.test(contact.contact)) {
            return {
              ...contact,
              contact: contact.contact.replace("+229", "+22901"),
            };
          }
          return contact;
        });
        const filterContactsByNumber = (contacts: ContactFiltered[]): ContactFiltered[] => {
          return contacts.filter(contact => {
            const phoneRegex = /^\+229\d{8}$/; // Vérifie si le numéro commence par +229 et est suivi de 8 chiffres
            return phoneRegex.test(contact.contact || ""); // Teste le champ `contact`
          });
        };

        const updatedContacts = filterContactsByNumber(importedContacts)
        
        // Générer les fichiers et sauvegarder
        setIsUpdating(true);
  
        const userId = auth.currentUser?.uid;
        if (!userId) {
          setErrors('utilisateur non authentifié')
        }
  
        const { importedFileId, allFileId } = await saveBothVcfFiles(
          importedContacts,
          allContacts,
          userId as string
        ) as { importedFileId: string; allFileId: string };
        const nbrUpdated = updatedContacts.length
        // Mise à jour du document utilisateur dans Firestore
        await updateUserDocumentWithVcf(userId as string, importedFileId, false); // Non modifiés
        await updateUserDocumentWithVcf(userId as string, allFileId, true); // Tous les contacts
        await UpdateUserData(contactsResponse.length, importedContacts.length, nbrUpdated, userId as string)
        setIsUpdating(false);
        setIsUpdated(true);
        setLoading(false);
        setIsDone(true);
      } else {
        setErrors("Réponse invalide lors de la connexion avec Google");
      }
    } catch (error) {
      setLoading(false);
      setErrors(
        error instanceof Error ? error.message : "Une erreur inconnue est survenue"
      );
    }
  };

  // Callback en cas d'échec de la connexion Google
  const onFailure = (error: unknown) => {
    const errorMessage =
      error instanceof Error ? error.message : "Échec de la connexion avec Google";
    setErrors(errorMessage);
    setLoading(false);
  };

  return (
    <div>
      {!user && <div>
          <div>
            <Typography>Vous n'êtes pas connecter pour pouvoir vous authentifié, veuillez vous connecter <Link href={'/connexion'} className="text-blue-600 underline">ici</Link> pour pouvoir importer vos contacts</Typography>
          </div>
        </div>}
      {user && <div className="flex flex-col justify-normal items-start gap-3">
        <Typography variant="h3" className="font-bold">
          Authentification pour autoriser l'importation des contacts
        </Typography>
        <Typography>
          Pour que Quick Update puisse avoir accès à vos contacts enregistrés sur votre compte email,
          vous devez l'autoriser. Ne vous inquiétez pas, la seule action de Quick Update est
          d'importer vos contacts, rien de plus. Pour ce qu'il en est de la condition dans laquelle
          vos données sont traitées, veuillez consulter notre{" "}
          <Link href={"/privacy-policy"} className="text-blue-600 font-bold">
            Politique de confidentialité
          </Link>{" "}
          pour plus d'informations.
        </Typography>
        <Typography>
          Après avoir cliqué sur le bouton permettant d'effectuer l'importation de contacts, soyez
          sûr de sélectionner le compte Gmail sur lequel vos contacts sont enregistrés, au cas où
          vous avez plusieurs comptes Gmail.
        </Typography>
        <Typography>
          <span className="text-red-500 font-bold">Note importante : </span>Juste après
          l'importation débute le processus de mise à jour des contacts. Veuillez donc patienter
          pour avoir la notification de confirmation que tout est terminé et ensuite vous serez
          guidé sur l'action qui doit suivre.
        </Typography>

        <GoogleLoginButton onSuccess={onSuccess} onFailure={onFailure} loading={loading} />
        {errors && <Typography color="danger">Erreur : {errors}</Typography>}
        {isDone && (
          <div className="flex flex-col justify-normal items-start gap-5">
            <Typography
              className="border border-secondary px-6 py-2 rounded-lg w-full text-center"
              color="secondary"
            >
              Contacts importés
            </Typography>
            {isUpdating && (
              <Typography
                className="border border-primary px-6 py-2 rounded-lg w-full text-center"
                color="primary"
              >
                Mise à jour en cours ...
              </Typography>
            )}
            {isUpdated && (
              <Typography
                className="border border-secondary px-6 py-2 rounded-lg w-full text-center"
                color="secondary"
              >
                Mise à jour terminée
              </Typography>
            )}
            <Typography>
              Maintenant que vos contacts sont importés et mis à jour, veuillez vous rendre dans
              l'onglet{" "}
              <Link href={"/dashboard"}>
                <span className="font-bold">Dashboard</span>
              </Link>{" "}
              pour voir vos statistiques de contacts qui ont été importés et dans l'onglet{" "}
              <Link href={"/setting"}>
                <span className="font-bold">Paramètres</span>
              </Link>{" "}
              pour télécharger vos fichiers de contacts (anciens comme mis à jour).
            </Typography>
          </div>
        )}
      </div>}
    </div>
  );
};

export default UpdateComponent;
