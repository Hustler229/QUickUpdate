import { auth } from "@/config/firebase.config";
import { signOut } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

const LogoutUser = (req:NextApiRequest, res:NextApiResponse)=>{
    if (req.method !== "POST") {
        return res.status(400).json({
            message : 'Invalid method requested'
        })
    }

    try {
        signOut(auth).then(() => {
            return res.status(200).json({
                message : 'USer successfully signed out'
            })
          }).catch((error) => {
            // An error happened.
            return res.status(500).json({
                message : error.message
            })
          });
          
    } catch (error) {
        return res.status(500).json({
            message : 'Error signing',
            error : error
        })
    }
}
export default LogoutUser;