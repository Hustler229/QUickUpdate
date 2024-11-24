/* eslint-disable react/no-unescaped-entities */
import Button from "@/components/design/button"
import Typography from "@/components/design/typography"
import { auth } from "@/config/firebase.config"
import Link from "next/link"

type dataType = {
  title : string,
  detail : string
}
const IndexPage :React.FC = ()=>{
  const user= auth.currentUser
  const data = [
    {
      title: "Synchronisation gmail",
      detail : "Connectez facilement votre compte pour importer vos contacts quui y sont enregistrés."
    },
    {
      title : "Mise à jour intelligente",
      detail : "Détectez et remplacez les anciens numéros par les nouveaux formats."
    },
    {
      title : "Sauvegarde sécurisée",
      detail : " Enregistrez vos fichiers pour un accès ultérieur."
    }
  ]

  return (
    <div className="flex flex-col justify-normal items-start gap-5">
      <div className="flex  flex-col justify-center items-start gap-5 md:gap-10  py-3 rounded-lg md:py-5 overflow-hidden border my-5 px-2 md:px-5  shadow-sm">
        <Typography variant="h1" className="font-bold">Simplifiez la mise à jour de vos contacts téléphoniques</Typography>
        <Typography> <span className="font-bold">QuickUpdate</span> vous aide à détecter les numéros de tous les réseaux téléphoniques béninois, s'assure de les mettre à jour tout en conservant vos autres numéros internationales.</Typography>
        <Link href={user ? '/auth' : '/connexion'}><Button className="hover:bg-primary hover:text-white transition-colors " size="small">Commencer gratuitement</Button></Link>
      </div>
      <div className="flex flex-col justify-normal gap-2 items-start p-3 md:p-5 w-full overflow-hidden shadow-sm border rounded-lg">
        <Typography variant="h4" className="font-bold">Fonctionnalités clés</Typography>
        {data.map((d:dataType)=>(
          <>
            <details className="flex flex-col items-start justify-normal gap-1 w-full">
            <summary> <Typography tag="span" className="font-bold">{d.title}</Typography> </summary>
            <Typography className="py-2 px-3  transition-opacity" > {d.detail} </Typography>
            </details>
          </>
        ))}
      </div>
      <div className="flex flex-col gap-5">
        <Typography variant="h4" className="font-bold">Pourquoi utiliser Quick Update ?</Typography>
        <Typography variant="h6">En raison de la nouvelle mise à jour des numéros qui a sera effectué sur le territoire béninois dès le 30 novembre 2024, la modification des numéros enregistré sur chaque téléphone s'avère une nécessité. C'est dans ce contexte que QuickUpdate a été crée afin de vous faciliter la tâche. Efficace, sécurisé et rapide, Quick Update est votre solution du moment.</Typography>
      </div>
    </div>
  )
}

export default IndexPage