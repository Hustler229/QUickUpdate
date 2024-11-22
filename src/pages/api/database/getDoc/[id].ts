import { db } from "@/config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

const GetDocument = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "Invalid method requested",
    });
  }

  const { id } = req.query;
  const {docName} = req.body;
  if (!id || !docName) {
    return res.status(400).json({
      message: "Missing parameter",
    });
  }

  try {
    const docRef = doc(db, docName,id as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return res.status(200).json({
        message : 'Doc already exists',
        Documents: docSnap.data()
      })
    } else {
      return res.status(404).json({
        message : 'Doc not found',
      })
    }
  } catch (error) {
    return res.status(404).json({
        message : 'Error: ' + error
    })
  }
};

export default GetDocument;
