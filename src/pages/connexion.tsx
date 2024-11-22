/* eslint-disable react/no-unescaped-entities */
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase.config"; // Assurez-vous que ceci configure correctement Firebase
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import { LiaEyeSlash, LiaEyeSolid } from "react-icons/lia";
import Link from "next/link";
import Typography from "@/components/design/typography";
import { useRouter } from "next/router";

type Inputs = {
  email: string;
  password: string;
};

const ConnexionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const router = useRouter()
  const [loading, setIsLoading] = useState(false);
  const [hide, setIsHidden] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleHidden = () => {
    setIsHidden(!hide);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setIsLoading(true);
    setErrorMessage(null); // Réinitialise le message d'erreur
    try {
      // Tentative de connexion avec Firebase
     await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
  
      
      // Réinitialise le formulaire après succès
      reset();
      router.push('/auth')
    } catch (error: unknown) {
  
      // Vérifie si l'erreur est un objet et contient la propriété `code`
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
  };
  
  // Fonction utilitaire pour vérifier si l'erreur est de type FirebaseError
  function isFirebaseError(error: unknown): error is { code: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof (error as { code: unknown }).code === "string"
    );
  }
  

  return (
    <div>
      <div className="flex flex-col w-full py-10 justify-start items-center">
        <Typography
          variant="h1"
          color="primary"
          className="text-center font-bold"
        >
          Connexion
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-normal gap-4"
        >
          <div className="flex flex-col items-start justify-normal gap-3">
            <label htmlFor="email">
              <Typography className="font-bold">Email</Typography>
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="focus:outline-none border min-w-[300px] w-full py-2 px-2 rounded-lg text-base-mobile border-gray-300"
            />
            {errors.email && (
              <Typography color="danger" tag="p">
                Email requis
              </Typography>
            )}
          </div>
          <div className="flex flex-col items-start justify-normal gap-3">
            <label htmlFor="password">
              <Typography className="font-bold">Mot de passe</Typography>
            </label>
            <div className="flex flex-row items-center justify-normal gap-0 border px-2 rounded-lg border-gray-300">
              <input
                type={hide ? "password" : "text"}
                id="password"
                {...register("password", { required: true, minLength: 6 })}
                className="focus:outline-none min-w-[300px] w-full py-2 rounded-lg text-base-mobile"
              />
              {!hide ? (
                <LiaEyeSolid onClick={toggleHidden} size={20} />
              ) : (
                <LiaEyeSlash onClick={toggleHidden} size={20} />
              )}
            </div>
            {errors.password && (
              <Typography color="danger" tag="p">
                Mot de passe doit être au minimum 6 caractères.
              </Typography>
            )}
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
            {loading ? "Connexion..." : "Connexion"}
          </button>

          <Link href={"/reset-password"}>
            <Typography color="primary">Mot de passe oublié ?</Typography>
          </Link>
          <Link href={"/register"}>
            <Typography color="primary">
              Vous n'avez pas un compte ? Créez ici
            </Typography>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ConnexionComponent;
