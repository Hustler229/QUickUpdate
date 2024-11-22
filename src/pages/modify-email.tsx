import Typography from "@/components/design/typography";
import { auth } from "@/config/firebase.config";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, User } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LiaEyeSlash, LiaEyeSolid } from "react-icons/lia";

type UpdateEmailProps = {
  password: string;
  newEmail: string;
};

const UpdateEmailComponent = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateEmailProps>();
  const [hide, setIsHidden] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const toggleHidden = () => {
    setIsHidden(!hide);
  };

  const handler: SubmitHandler<UpdateEmailProps> = async (data: UpdateEmailProps) => {
    const user = auth.currentUser;
    setIsLoading(true);

    if (!user) {
      setErrorMessage("Aucun utilisateur n'est connecté.");
      setIsLoading(false);
      return;
    }

    try {
      // Réauthentification avec mot de passe
      const credential = EmailAuthProvider.credential(user?.email || "", data.password);
      await reauthenticateWithCredential(user as User, credential);

      // Mise à jour de l'email
      await updateEmail(user as User, data.newEmail);

      setIsLoading(false);
      reset();
      router.push("/setting");
    } catch (error: unknown) {
      setIsLoading(false);
      reset();

      // Gestion des erreurs spécifiques
      switch ((error as FirebaseError).code) {
        case "auth/invalid-email":
          setErrorMessage("L'adresse e-mail saisie est invalide.");
          break;
        case "auth/email-already-in-use":
          setErrorMessage("Cette adresse e-mail est déjà utilisée par un autre compte.");
          break;
        case "auth/wrong-password":
          setErrorMessage("Le mot de passe est incorrect.");
          break;
        case "auth/too-many-requests":
          setErrorMessage("Trop de tentatives. Réessayez plus tard.");
          break;
        case "auth/invalid-credential":
            setErrorMessage("Mot de passe incorrect");
            break;
        case "auth/operation-not-allowed":
            setErrorMessage("Veuillez confirmer votre email actuel avant de pouvoir le modifier");
            break;
        default:
          setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
          break;
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handler)} className="flex flex-col justify-normal gap-3">
        <div className="flex flex-col items-start justify-normal gap-3">
          <label htmlFor="email">
            <Typography className="font-bold">Email</Typography>
          </label>
          <input
            type="email"
            id="email"
            {...register("newEmail", { required: true })}
            className="focus:outline-none border min-w-[300px] w-full py-2 px-2 rounded-lg text-base-mobile border-gray-300"
          />
          {errors.newEmail && (
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
        {errorMessage && <Typography color="danger" className="text-center"> {errorMessage} </Typography>}
        <button
          type="submit"
          className="px-10 py-2 text-sm font-bold text-white bg-default rounded-lg disabled:bg-gray-500"
          disabled={loading}
        >
          {loading ? "Modification ..." : "Modifier"}
        </button>
      </form>
    </div>
  );
};

export default UpdateEmailComponent;
