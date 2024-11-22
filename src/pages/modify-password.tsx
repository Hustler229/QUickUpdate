import Typography from "@/components/design/typography";
import { auth } from "@/config/firebase.config";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, User } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LiaEyeSlash, LiaEyeSolid } from "react-icons/lia";

type UpdatePasswordProps = {
  currentPassword: string;
  newPassword: string;
};

const UpdatePasswordComponent = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdatePasswordProps>();
  const [hide, setIsHidden] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const toggleHidden = () => {
    setIsHidden(!hide);
  };

  const handler: SubmitHandler<UpdatePasswordProps> = async (data: UpdatePasswordProps) => {
    const user = auth.currentUser;
    setIsLoading(true);

    if (!user) {
      setErrorMessage("Aucun utilisateur n'est connecté.");
      setIsLoading(false);
      return;
    }

    try {
      // Réauthentification avec le mot de passe actuel
      const credential = EmailAuthProvider.credential(user?.email || "", data.currentPassword);
      await reauthenticateWithCredential(user as User, credential);

      // Mise à jour du mot de passe
      await updatePassword(user as User, data.newPassword);

      setIsLoading(false);
      reset();
      router.push("/setting");
    } catch (error: unknown) {
      setIsLoading(false);
      reset();

      // Gestion des erreurs spécifiques
      switch ((error as FirebaseError).code) {
        case "auth/wrong-password":
          setErrorMessage("L'ancien mot de passe est incorrect.");
          break;
        case "auth/weak-password":
          setErrorMessage("Le nouveau mot de passe est trop faible. Veuillez utiliser au moins 6 caractères.");
          break;
        case "auth/too-many-requests":
          setErrorMessage("Trop de tentatives échouées. Veuillez réessayer plus tard.");
          break;
        case "auth/requires-recent-login":
          setErrorMessage("Cette action nécessite une reconnexion. Déconnectez-vous puis reconnectez-vous.");
          break;
        case "auth/operation-not-allowed":
        setErrorMessage("Veuillez confirmer votre email actuel avant de pouvoir le modifier");
        break;
        default:
          setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
          console.error("Erreur Firebase :", error); // Pour déboguer
          break;
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handler)} className="flex flex-col justify-normal gap-3 items-center">
        <div className="flex flex-col items-start justify-normal gap-3">
          <label htmlFor="currentPassword">
            <Typography className="font-bold">Ancien mot de passe</Typography>
          </label>
          <div className="flex flex-row items-center justify-normal gap-0 border px-2 rounded-lg border-gray-300">
            <input
              type={hide ? "password" : "text"}
              {...register("currentPassword", { required: true, minLength: 6 })}
              className="focus:outline-none min-w-[300px] w-full py-2 rounded-lg text-base-mobile"
            />
            {!hide ? (
              <LiaEyeSolid onClick={toggleHidden} size={20} />
            ) : (
              <LiaEyeSlash onClick={toggleHidden} size={20} />
            )}
          </div>
          {errors.currentPassword && (
            <Typography color="danger" tag="p">
              Mot de passe doit être au minimum 6 caractères.
            </Typography>
          )}
        </div>

        <div className="flex flex-col items-start justify-normal gap-3">
          <label htmlFor="newPassword">
            <Typography className="font-bold">Nouveau mot de passe</Typography>
          </label>
          <div className="flex flex-row items-center justify-normal gap-0 border px-2 rounded-lg border-gray-300">
            <input
              type={hide ? "password" : "text"}
              {...register("newPassword", { required: true, minLength: 6 })}
              className="focus:outline-none min-w-[300px] w-full py-2 rounded-lg text-base-mobile"
            />
            {!hide ? (
              <LiaEyeSolid onClick={toggleHidden} size={20} />
            ) : (
              <LiaEyeSlash onClick={toggleHidden} size={20} />
            )}
          </div>
          {errors.newPassword && (
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

export default UpdatePasswordComponent;
