import type { NextApiRequest, NextApiResponse } from "next";

const getAllContacts = async (accessToken: string): Promise<[]> => {
  let contacts = [''];
  let nextPageToken: string | undefined;

  do {
    const url = new URL("https://people.googleapis.com/v1/people/me/connections");
    url.searchParams.append("personFields", "names,emailAddresses,phoneNumbers");
    if (nextPageToken) {
      url.searchParams.append("pageToken", nextPageToken);
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des contacts");
    }

    const data = await response.json();
    contacts = contacts.concat(data.connections || []);
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return contacts as [];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { access_token } = req.query;

    if (!access_token || typeof access_token !== "string") {
      return res.status(400).json({ error: "Token d'accès manquant ou invalide." });
    }

    try {
      const contacts = await getAllContacts(access_token);
      res.status(200).json(contacts);
    } catch (error) {
      console.error("Erreur interne:", error);
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  } else {
    res.status(405).json({ error: "Méthode HTTP non autorisée." });
  }
}
