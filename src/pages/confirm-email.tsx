/* eslint-disable react/no-unescaped-entities */
import Button from "@/components/design/button";
import Typography from "@/components/design/typography";
import { auth } from "@/config/firebase.config";
import clsx from "clsx";
import { sendEmailVerification, User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
type Inputs = {
    email: string;
  };
const ConfirmEmailComponent = ()=>{
    const {
        handleSubmit,
      } = useForm<Inputs>();
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSend, setIsSend] = useState(false);
const router = useRouter()
    const onSubmit = async()=>{
      setIsLoading(true);
      setErrorMessage(null);
      try {
        await sendEmailVerification(auth.currentUser as User)
        setIsSend(true)
        auth.signOut()
        router.push('/connexion')
      } catch (error:unknown) {
        if (isFirebaseError(error)) {
          const errorMapping: { [key: string]: string } = {
            "auth/user-not-found": "Aucun utilisateur trouvé avec cet email.",
            "auth/wrong-password": "Mot de passe incorrect.",
            "auth/invalid-email": "L'email est invalide.",
            "auth/invalid-credential": "Les identifiants sont invalides.",
            "auth/too-many-requests": "Trop de tentatives, veuillez réessayer plus tard.",
          };
    
          // Définit un message d'erreur lisible par l'utilisateur
          setErrorMessage(
            errorMapping[error.code] || "Une erreur inattendue s'est produite."
          );
        } else {
          // Gère les erreurs non liées à Firebase
          setErrorMessage("Une erreur inattendue s'est produite. Veuillez réessayer.");
        }
      } finally {
        setIsLoading(false);
      }
      
    }
    function isFirebaseError(error: unknown): error is { code: string } {
      return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as { code: unknown }).code === "string"
      );
    }
    
    return (
        <>
            { auth.currentUser && 
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-normal gap-4 max-w-screen-md mx-auto py-10">
                <div className="flex flex-col justify-normal items-start gap-5">
                  <Typography className="text-center">Veuillez cliquer sur le bouton en bas pour confirmer votre email</Typography>
                </div>
                {errorMessage && (
                  <Typography color="danger" className="text-center">
                    {errorMessage}
                  </Typography>
                )}
              <button
                type="submit"
                className={clsx(
                  "text-white px-10 py-2 rounded-lg",
                  loading ? "bg-gray-400" : "bg-black"
                )}
                disabled={loading}
              >
                Confirmer votre email
              </button>
            </form>}
            {isSend && <Typography color="secondary" className="border text-center border-secondary px-4 py-2 rounded-lg"> Lien de confirmation d'email envoyé </Typography>}
            {
              !auth.currentUser && 
              <div className="flex flex-col justify-normal items-center max-w-sm my-10">
                <Typography>Veuillez vous connecté afin de pouvoir valider votre email</Typography>
                <Link href={'/connexion'}><Button >Connectez-vous</Button></Link>
              </div>
            }
        </>
    )
}

export default ConfirmEmailComponent