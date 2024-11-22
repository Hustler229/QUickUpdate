import { auth } from "@/config/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

const CreateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Invalid method requested. Only POST is allowed.",
    });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  try {
    // Crée un nouvel utilisateur avec Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return res.status(200).json({
      message: "User created successfully",
      user: {
        uid: user.uid,
        email: user.email,
      },
    });
  } catch (error: unknown) {
    // Gère les erreurs renvoyées par Firebase
    const errorCode = error;
    const errorMessage = error
    // Ajoute une correspondance entre les codes Firebase et les statuts HTTP
    const statusCodes: { [key: string]: number } = {
      "auth/email-already-in-use": 409,
      "auth/invalid-email": 400,
      "auth/weak-password": 400,
    };

    const statusCode = statusCodes[errorCode as string] || 500; // 500 si le code n'est pas trouvé
    return res.status(statusCode).json({
      error: errorCode,
      message: errorMessage,
    });
  }
};

export default CreateUser;
