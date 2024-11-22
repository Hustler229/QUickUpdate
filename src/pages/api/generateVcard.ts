import supabase from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import vCard from 'vcf';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { data, id } = req.body;

      // Vérification des données reçues
      if (!data || !id) {
        return res.status(400).json({ error: 'Les données ou l\'ID sont manquants.' });
      }

      // Créer un tableau de promesses pour la création des vCards
      const vCardPromises = data.map((contact: { name: string; phone: string }) => {
        return new Promise<string>((resolve) => {
          const card = new vCard();
          card.add('fn', contact.name);  // Nom complet
          card.add('tel', contact.phone);  // Numéro de téléphone
          resolve(card.toString());  // Convertir la vCard en chaîne de caractères
        });
      });

      // Attendre que toutes les promesses soient résolues
      const vCardData = await Promise.all(vCardPromises);

      // Joindre chaque vCard par une nouvelle ligne
      const vCardContent = vCardData.join('\n');

      // Créer un buffer à partir des données vCard
      const buffer = Buffer.from(vCardContent, 'utf-8');

      // Stocker le fichier vCard dans Supabase
      const { error } = await supabase.storage
        .from('vcard-files')
        .upload(`${id}.vcf`, buffer, {
          contentType: 'text/vcard',
          upsert: true,
        });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      // Retourner l'URL du fichier dans Supabase

      res.status(200).json({ fileId: id });
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la génération du vCard.', errorMsg: error });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}