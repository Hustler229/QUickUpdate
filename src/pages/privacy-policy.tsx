/* eslint-disable react/no-unescaped-entities */
import Typography from "@/components/design/typography"

const PrivacyPolicyComponent = ()=>{
    return (
        <div className="flex flex-col justify-normal items-start gap-5 md:gap-10">
            <Typography variant="h2" className="font-bold">Politique de Confidentialité</Typography>
            <div className="flex flex-col justify-normal items-start gap-5 md:gap-10">
                <div className="flex flex-col items-start justify-normal gap-3">
                    <Typography variant="h5" className="font-semibold">Introduction</Typography>
                    <Typography>Chez <span className="font-bold">QuickUpdate</span>, nous respectons la confidentialité de vos informations personnelles. Cette Politique de Confidentialité explique comment nous collectons, utilisons, et protégeons vos données lorsque vous utilisez notre application.</Typography>
                </div>
                <div className="flex flex-col items-start justify-normal gap-3">
                    <Typography variant="h5" className="font-semibold">Collecte des informations</Typography>
                    <Typography>Lorsque vous utilisez QuickUpdate, nous collectons certaines informations personnelles afin de vous offrir une expérience optimale. Les informations que nous collectons peuvent inclure :</Typography>
                    <Typography tag="div">
                        <ul className="list-disc list-inside">
                            <li><span className="font-semibold">Données d'authentification :</span> Nous utilisons Firebase pour gérer l'authentification des utilisateurs. Lorsque vous vous connectez via Google, nous récupérons les informations de base associées à votre compte Google, telles que votre adresse e-mail et votre nom.</li>
                            <li><span className="font-semibold">Contacts :</span> Lorsque vous autorisez l'application à accéder à vos contacts, nous collectons les informations relatives aux contacts, telles que leurs noms et numéros de téléphone. Nous ne collectons pas de données autres que celles nécessaires à la fonctionnalité de l'application.</li>
                            <li><span className="font-semibold">Données d’utilisation :</span> Nous collectons également des informations sur la façon dont vous utilisez l’application pour améliorer notre service (par exemple, le nombre de contacts importés et mis à jour).</li>
                        </ul>
                    </Typography>
                </div>
                <div className="flex flex-col items-start justify-normal gap-3">
                    <Typography variant="h5" className="font-semibold">Utilisation des informations</Typography>
                    <Typography>Les informations collectées sont utilisées uniquement dans le but de vous offrir les services suivants :</Typography>
                    <Typography tag="div">
                        <ul className="list-disc list-inside">
                            <li>Importation de vos contacts Gmail.</li>
                            <li>Mise à jour des numéros de téléphone selon les critères définis dans l'application.</li>
                            <li>Sauvegarde des fichiers générés, comme les fichiers VCF.</li>
                            <li>Envoi de notifications pour vous tenir informé de l'état de vos demandes.</li>
                        </ul>
                    </Typography>
                </div>
                <div className="flex flex-col items-start justify-normal gap-3">
                    <Typography variant="h5" className="font-semibold">Partage des informations</Typography>
                    <Typography>Nous ne partageons pas vos informations personnelles avec des tiers, à l'exception des services tiers qui nous aident à fournir notre service, comme Firebase pour l'authentification et Supabase pour le stockage des fichiers.</Typography>
                </div>
                <div className="flex flex-col items-start justify-normal gap-3">
                    <Typography variant="h5" className="font-semibold">Protection des données</Typography>
                    <Typography>Nous prenons des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé, altération, divulgation ou destruction.</Typography>
                </div>
                <div className="flex flex-col items-start justify-normal gap-3">
                    <Typography variant="h5" className="font-semibold">Vos droits</Typography>
                    <Typography>Vous avez le droit de consulter, modifier ou supprimer vos informations personnelles. Pour ce faire, vous pouvez accéder à votre profil utilisateur dans l’application ou nous contacter directement.</Typography>
                </div>
                <div className="flex flex-col items-start justify-normal gap-3">
                    <Typography variant="h5" className="font-semibold">Modifications de la politique</Typography>
                    <Typography>Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout moment. Toute modification sera publiée sur cette page.</Typography>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicyComponent