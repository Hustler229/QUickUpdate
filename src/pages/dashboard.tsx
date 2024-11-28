/* eslint-disable react/no-unescaped-entities */
import Typography from "@/components/design/typography";
import { auth, db } from "@/config/firebase.config";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";



const DashboardComponent = () => {
  const [data, setData] = useState<DocumentData | undefined>(undefined); 
  const user = auth.currentUser; 
  const userId = user?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userData = await GetUserData(userId);
        setData(userData); 
        console.log(userData);
      }
    };

    fetchData(); 
  }, [userId]); 
  const GetUserData = async (id: string): Promise<DocumentData | undefined> => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data(); 
    } else {
      return undefined; 
    }
  };
  const importedContacts = data?.contact_imported
  const selectedContacts = data?.contact_selected
  const updatedContacts = data?.contact_updated

  return (
    <>
      {!user && <div className="flex flex-col gap-7">
         <Typography className="font-semibold">Vous n'êtes pas connecté</Typography>
         <Typography>Pour voir les statistiques de vos contacts, veuillez vous connecter à votre compte <Link href={'/connexion'}><span className="font-semibold text-primary">ici</span></Link></Typography>
      </div>}
      {
        user && 
        <div className="flex flex-col gap-5 md:gap-10">
            <Typography variant="h2" className="font-bold">Tableau de bord</Typography>
            <div>
                <Typography> <span className="font-semibold text-danger">Note important :</span> Lors de l'importation des contacts il y a d'abord une première filtrage des contacts, qui enlève les contacts dont les numéros de téléphone ne sont pas définit de la liste, c'est ça qui est désigné par les contacts sélectionnés (souvent c'est dû à des enregistrement de contacts sans nom ou des erreurs d'enregistrement des noms sans contacts), ensuite il y a un triage qui a lieu pour sélectionner unique les contacts  béninois afin de ne pas modifier les numéros internationales enregistrés sur le compte gmail, c'est ça qui est désigné par les contacts mise à jour. Ce sont ces filtrages qui explique la variation das valeurs du statisque.</Typography>
            </div>
            <Typography variant="h5" className="font-semibold">Statistiques des contacts </Typography>
            <div className="flex flex-col md:flex-row justify-around md:items-center gap-5 mx-5">
                <div className="flex flex-col justify-center items-center shadow-2xl px-10 py-10 md:py-10 rounded-lg ">
                    <Typography variant="h6" className="font-semibold">Contacts Importés</Typography>
                    <Typography>{importedContacts}</Typography>
                </div>
                <div className="flex flex-col justify-center items-center shadow-2xl px-10 py-10 md:py-10 rounded-lg ">
                    <Typography variant="h6" className="font-semibold">Contacts Sélectionnés</Typography>
                    <Typography> {selectedContacts} </Typography>
                </div>
                <div className="flex flex-col justify-center items-center shadow-2xl px-10 py-10 md:py-10 rounded-lg ">
                    <Typography variant="h6" className="font-semibold">Contacts Mise à jour</Typography>
                    <Typography> {updatedContacts} </Typography>
                </div>
            </div>
        </div>
      }
    </>
  );
};

export default DashboardComponent;
