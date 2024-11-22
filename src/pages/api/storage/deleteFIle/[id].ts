import supabase from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

const DeleteFile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    return res.status(400).json({
      message: "Méthode non supportée",
    });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({
      message: "L'ID du fichier est requis",
    });
  }

  try {
    const { data, error } = await supabase.storage
      .from("vcard-files")
      .remove([`${id}.vcf`]);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(200)
             .setHeader('Content-Type', 'text/vcard')
             .json(data);

  } catch (error) { 
    return res.status(500).json({
      message: "Erreur lors de la suppresion du fichier",
      error: error instanceof Error ? error.message : 'Error inconue'
    });
  }
};

export default DeleteFile;