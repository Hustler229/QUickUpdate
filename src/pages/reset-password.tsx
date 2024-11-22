/* eslint-disable react/no-unescaped-entities */
import Typography from "@/components/design/typography";
import { auth } from "@/config/firebase.config";
import clsx from "clsx";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
type Inputs = {
    email: string;
  };
const ResetPassword = ()=>{
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<Inputs>();
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSend, setIsSend] = useState(false);

    const onSubmit = async(data:Inputs)=>{
      setIsLoading(true);
      setErrorMessage(null);
      reset()
      try {
        await sendPasswordResetEmail(auth, data.email)
        setIsSend(true)
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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-normal gap-4 max-w-screen-md mx-auto py-10">
                <div className="flex flex-col justify-normal items-start gap-5">
                  <Typography className="text-center">Veuillez entrer votre email pour y recevoir un lien de réinitialisation de votre mot de passe</Typography>
                    <label htmlFor="email">Entrez votre email</label>
                    <input type="email"  id="email" {...register('email', {required:true})} className="focus:outline-none border min-w-[300px] w-full py-2 px-2 rounded-lg text-base-mobile border-gray-300" />
                    {errors.email && <Typography color="danger">L'email est requis</Typography>}
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
                Demander le lien de réinitialisation
              </button>

            </form>
            {isSend && <Typography color="secondary" className="border text-center border-secondary px-4 py-2 rounded-lg"> Lien de réinitialisation envoyé </Typography>}
        </>
    )
}

export default ResetPassword