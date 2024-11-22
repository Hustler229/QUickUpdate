/* eslint-disable react/no-unescaped-entities */
import Typography from "@/components/design/typography";
import { auth, db } from "@/config/firebase.config";
import supabase from "@/lib/supabase";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type DownloadFileProps = {
    bucket: string;
    fileId: string;
};



const GetUserData = async (id: string): Promise<DocumentData | undefined> => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return undefined;
    }
};




const SettingComponent = () => {
    const [loading1, setLoading1] = useState(false);  
    const [loading2, setLoading2] = useState(false);  
    const [deleteLoading1, setDeleteLoading1] = useState(false);  
    const [deleteLoading2, setDeleteLoading2] = useState(false);  
    const [data, setData] = useState<DocumentData | undefined>(undefined);  
    const [error, setError] = useState<string | null>(null);  
    const [deleteError, setDeleteError] = useState<string | null>(null);  
    const user = auth.currentUser;  
    const userId = user?.uid;  
    const router = useRouter()
    useEffect(() => {  
      const fetchData = async () => {  
        if (userId) {  
          const userData = await GetUserData(userId);  
          setData(userData);  
        }  
      };  
      fetchData();  
    }, [userId]);  
  
    const ElderContactFile = data?.importedFiles?.[0] + '.vcf';  
    const UpdatedContactFile = data?.updatedFiles?.[0] + '.vcf';  
  
    const handleDownload = async ({ bucket, fileId }: DownloadFileProps) => {  
      if (fileId === undefined) {  
        setError("L'identifiant du fichier est manquant.");  
        return;  
      }    
      setError(null);  
      try {  
        const { data: response, error } = await supabase.storage.from(bucket).download(fileId);  
        if (error) {  
          setError("Erreur lors du téléchargement : " + error.message);   
          return;  
        }  
        const blob = new Blob([response], { type: response.type });  
        const url = window.URL.createObjectURL(blob);  
        const link = document.createElement("a");  
        link.href = url;  
        link.download = fileId;  
        link.click();  
        window.URL.revokeObjectURL(url);  
      } catch (err) {  
        setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue");  
      } finally {  
 
      }  
    };  

    const handleDownloadFile1 = async({ bucket, fileId }: DownloadFileProps) => {
        try {
            setLoading1(true);
            await handleDownload({bucket, fileId})
            setLoading1(false);
        } catch (error) {
            setLoading1(false);
            return error;
        }
        
    }
    const handleDownloadFile2 = async({ bucket, fileId }: DownloadFileProps) => {
        try {
            setLoading2(true);
            await handleDownload({bucket, fileId})
            setLoading2(false);
        } catch (error) {
            setLoading2(false);
            return error;
        }
        
    }
  
    const deleteFile = async (bucket: string, fileId: string) => {  
      try {  
        const { error } = await supabase.storage.from(bucket).remove([fileId]);  
        if (error) {  
          setDeleteError(error.message);  
        }  
      } catch (err) {  
        setDeleteError(err instanceof Error ? err.message : "Une erreur inconnue est survenue");  
      } finally {  
      }  
    };  

    const handleDeleteFile1 = async(bucket: string, fileId: string)=>{
        try {
            setDeleteLoading1(true)
            await deleteFile(bucket,fileId)
            setDeleteLoading1(false)
        } catch (error) {
            setDeleteLoading1(false)
            return error
        }
    }

    const handleDeleteFile2 = async(bucket: string, fileId: string)=>{
        try {
            setDeleteLoading2(true)
            await deleteFile(bucket,fileId)
            setDeleteLoading2(false)
        } catch (error) {
            setDeleteLoading2(false)
            return error
        }
    }
    const SignOut = ()=>{
        auth.signOut()
        router.push('/connexion')
    }
    return (
        <>
        <div className="py-2">
        <Typography variant="h2" className="font-bold">Paramètres</Typography>
        </div>
        {!user && <div className="flex flex-col gap-7">
         <Typography className="font-semibold">Vous n'êtes pas connecté</Typography>
         <Typography>Pour avoir accès aux paramètres, veuillez vous connecter à votre compte <Link href={'/connexion'}><span className="font-semibold text-primary">ici</span></Link></Typography>
            </div>}
        {user && 
            <>
                <div className="flex flex-col gap-3">
                <Typography variant="h5" className="font-semibold">Téléchargement de fichier</Typography>
                <div className="flex flex-col  gap-2">
                    <Typography>Télécharger le fichier des contacts qui ont été importés</Typography>
                    <button className="px-10 py-2 text-sm text-primary border border-primary rounded-lg hover:text-white hover:bg-primary" onClick={() => handleDownloadFile1({ bucket: "vcard-files", fileId: ElderContactFile })} disabled={loading1}>{loading1 ?'Téléchargement ...': 'Télécharger'}</button>
                </div>
                <div className="flex flex-col  gap-2">
                    <Typography>Télécharger le fichier des contacts mis à jour</Typography>
                    <button className="px-10 py-2 text-sm text-primary border border-primary rounded-lg hover:text-white hover:bg-primary" onClick={() => handleDownloadFile2({ bucket: "vcard-files", fileId: UpdatedContactFile })} disabled={loading2}>{loading2 ?'Téléchargement ...': 'Télécharger'}</button>
                </div>
                <div>
                    {error && <Typography color="danger"> {error} </Typography>}
                </div>
                <div className="flex flex-col gap-3">
                    <Typography variant="h5" color="danger" className="font-semibold">Suppression de fichier (les suppression sont irréversibles, faites attention donc)</Typography>
                    <div className="flex flex-col gap-3">
                        <Typography>
                            Supprimer le fichier des contacts importés 
                        </Typography>
                        <button className="px-10 py-2 text-danger border border-danger rounded-lg hover:text-white hover:bg-danger" onClick={()=> handleDeleteFile1("vcard-files",ElderContactFile )}> {deleteLoading1 ? 'Suppression ...' : 'Supprimer'} </button>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Typography>
                            Supprimer le fichier des contacts mise à jour 
                        </Typography>
                        <button className="px-10 py-2 text-danger border border-danger rounded-lg hover:text-white hover:bg-danger" onClick={()=> handleDeleteFile2("vcard-files",UpdatedContactFile )}> {deleteLoading2 ? 'Suppression ...' : 'Supprimer'} </button>
                    </div>
                    <div>
                        {deleteError && <Typography color="danger">Erreur durant la suppression </Typography>}
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col justify-normal gap-3">
                    <Typography variant="h5" className="font-bold">Espace Utilisateur</Typography>
                    <Link href={'/modify-password'}>
                        <Typography>Modifier le mot de passe</Typography>
                    </Link>
                    <Link href={'/modify-email'}>
                        <Typography>Modifier l'email</Typography>
                    </Link>
                    <button onClick={()=>SignOut()} className="px-10 py-2 text-white bg-danger rounded-lg text-sm font-bold">Déconnexion</button>
                </div>
            </div>
        </>
        }
        </>
    );
}

export default SettingComponent;
