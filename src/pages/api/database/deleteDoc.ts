import { db } from "@/config/firebase.config"
import { deleteDoc, doc } from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"

const DeleteDocument = async(req:NextApiRequest, res:NextApiResponse)=>{
    if (req.method !== "Delete") {
        
        return res.status(400).json({
            message : 'Method not allowed'
        })

    }

    const {docName,Id} = req.body
    if (!docName || !Id) {
        return res.status(400).json({
            message : 'docName and Id'
        })
    }

    try {
        await deleteDoc(doc(db, docName,Id));
        return res.status(200).json({
            message : 'Document deleted successfully'
        })
    } catch (error) {
        return res.status(400).json({
            message : 'Error deleting',
            error : error
        })
    }
}

export default DeleteDocument