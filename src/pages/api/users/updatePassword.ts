import { auth } from "@/config/firebase.config";
import { updatePassword, User } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

const UpdatePassword = (req:NextApiRequest, res:NextApiResponse)=> {
    if (req.method !== "PATCH") {
        return res.status(403).json({
            message : "Invalid method requested"
        })
    }
    const {password} = req.body
    if (!password) {
        return res.status(403).json({
            message : "Password is required"
        })
    }

    try {
        updatePassword(auth.currentUser as User, password).then(() => {
            return res.status(200).json({
                message : 'Password updated successfully'
            })
          }).catch((error) => {
            return res.status(500).json({
                message : "Error updating password",
                error : error
            })
          });
          
    } catch (error) {
        return res.status(500).json({
            message : "Error updating password",
            error : error
        })
    }
}

export default UpdatePassword