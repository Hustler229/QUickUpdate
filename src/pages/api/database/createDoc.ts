import { db } from "@/config/firebase.config"
import { doc, setDoc } from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"

const CreateDoc = async(req:NextApiRequest, res:NextApiResponse)=>{
    if (req.method !== "POST") {
        return res.status(400).json({
            message : 'Invalid API request'
        })
    }

    const {data, docName, id} = req.body
    if (!data || !docName || !id) {
        return res.status(401).json({
            message : 'Missing parameters'
        })
    }
    try {
        await setDoc(doc(db, docName, id),data);
        return res.status(200).json({
            message : 'Document created successfully'
        })
    } catch (error) {
        return res.status(500).json({
            message : 'Error creating',
            error : error instanceof Error ? error.message : 'Error creating'
        })
    }
}

export default CreateDoc