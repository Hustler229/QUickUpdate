import { auth } from "@/config/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

const ResetPassword = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(403).json({
      message: "Invalid method passed",
    });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(403).json({
      message: "Email is required",
    });
  }
  try {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        return res.status(200).json({
            message : 'Password reset link was sent'
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return res.status(errorCode).json({
            message : errorMessage
        })
      });
  } catch (error) {
    return res.status(500).json({
        message : "An error occurred",
        error : error
    })
  }
};

export default ResetPassword;
