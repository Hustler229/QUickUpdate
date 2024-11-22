import { auth } from "@/config/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

const LoginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" }); // Code HTTP correct pour méthode invalide
  }

  const { email, password } = req.body;

  // Validation des champs
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Connexion avec Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return res.status(200).json({
      message: "User connected successfully",
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      },
    });
  } catch (error) {
    console.error("Firebase login error:", error);

    const errorMapping: { [key: string]: { status: number; message: string } } = {
      "auth/user-not-found": { status: 404, message: "User not found" },
      "auth/wrong-password": { status: 401, message: "Invalid password" },
      "auth/invalid-email": { status: 400, message: "Invalid email" },
    };

    const mappedError = errorMapping[error as string] || {
      status: 500,
      message: "An unexpected error occurred",
    };

    return res.status(mappedError.status).json({ message: mappedError.message });
  }
};

export default LoginUser;
