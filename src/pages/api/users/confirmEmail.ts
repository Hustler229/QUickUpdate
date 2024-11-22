import { auth } from "@/config/firebase.config";
import { sendEmailVerification, User } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

const EmailVerification = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Invalid method requested",
    });
  }

  try {
    sendEmailVerification(auth.currentUser as User).then(() => {
      return res.status(200).json({
        message : "Verification email sent",
      })
    }).catch((error) => {
        return res.status(500).json({
            error: error.message
        })
    });
  } catch (error) {
    return res.status(500).json({
        message : "An error occurred",
        error: error
    });
  }
};

export default EmailVerification;
