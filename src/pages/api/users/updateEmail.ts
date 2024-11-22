import { auth } from "@/config/firebase.config";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

const UpdateEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({
      message: "Method Not Allowed. Use PATCH.",
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  try {
    const user = auth.currentUser;
    if (!user) {
      return res.status(401).json({
        message: "No authenticated user found.",
      });
    }

    // Créer les credentials pour la ré-authentification
    const credential = EmailAuthProvider.credential(user.email!, password);

    // Ré-authentifier l'utilisateur
    await reauthenticateWithCredential(user, credential);

    // Mettre à jour l'email
    await updateEmail(user, email);

    return res.status(200).json({
      message: "Email updated successfully.",
    });
  } catch (error) {
    console.error("Error updating email:", error);

    return res.status(500).json({
      message: "Failed to update email.",
      error: error,
    });
  }
};

export default UpdateEmail;
