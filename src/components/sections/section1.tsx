import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import { LiaEyeSlash, LiaEyeSolid } from "react-icons/lia";
import Link from "next/link";
import Typography from "../design/typography";
import { auth, db } from "@/config/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

interface UserDocProps {
  email: string;
  elderContacts: string | null;
  updatedContacts: string | null;
}

type Inputs = {
  email: string;
  password: string;
};

const FirstSection = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
  const router = useRouter()
  const [loading, setIsLoading] = useState(false);
  const [hide, setIsHidden] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleHidden = () => setIsHidden(!hide);

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setIsLoading(true);
    setErrorMessage(null); // Réinitialise le message d'erreur

    try {
      // Création de l'utilisateur avec Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      // Création d'un document utilisateur dans Firestore
      const userDoc: UserDocProps = {
        email: data.email,
        elderContacts: null,
        updatedContacts: null,
      };

      await setDoc(doc(db, "users", user.uid), userDoc);

      // Réinitialise le formulaire après succès
      reset();
      router.push('/confirm-email')
    } catch (error: unknown) {

      // Gestion des erreurs Firebase
      if (isFirebaseError(error)) {
        const errorMapping: { [key: string]: string } = {
          "auth/email-already-in-use": "Cet email est déjà utilisé.",
          "auth/invalid-email": "L'email est invalide.",
          "auth/operation-not-allowed": "L'inscription est actuellement désactivée.",
          "auth/weak-password": "Le mot de passe est trop faible.",
        };

        setErrorMessage(
          errorMapping[error.code] || "Une erreur inattendue s'est produite."
        );
      } else {
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
    <>
      <div>
        <div className="flex flex-col w-full py-10 justify-start items-center">
          <Typography variant="h1" color="primary" className="text-center font-bold">
            Inscription
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-normal gap-4">
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
                <Typography color="danger" className="" tag="p">
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
                <Typography color="danger" className="" tag="p">
                  Mot de passe doit être au minimum 6 caractères
                </Typography>
              )}
            </div>
            {errorMessage && (
              <Typography color="danger" className="" tag="p">
                {errorMessage}
              </Typography>
            )}
            <button
              type="submit"
              className={clsx(
                "text-white bg-black px-10 py-2 rounded-lg",
                loading ? "bg-gray-400" : "bg-black"
              )}
              disabled={loading}
            >
              Envoyer
            </button>
            <Link href={"/connexion"}>
              <Typography color="primary">
                Vous avez un compte ? Connectez-vous ici
              </Typography>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default FirstSection;
