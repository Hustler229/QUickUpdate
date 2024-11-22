import { db } from "@/config/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

const UpdateDocument = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(400).json({
      message: "Invalid method requested",
    });
  }

  const { data, docName } = req.body;
  const { id } = req.query;
  if (!data || !id || !docName) {
    return res.status(401).json({
      message: "Missing required parameter",
    });
  }

  try {
    const docRef = doc(db, docName, id as string);
    await updateDoc(docRef, {
      data,
    });
    return res.status(200).json({
        message : 'Updated successfully'
    })
  } catch (error) {
    return res.status(500).json({
        message : 'An error occurred',
        error : error
    })
  }
};

export default UpdateDocument;
