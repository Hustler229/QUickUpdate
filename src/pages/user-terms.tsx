/* eslint-disable react/no-unescaped-entities */
import Typography from "@/components/design/typography"

const UserTermsComponent = ()=> {
    return (
        <div className="flex flex-col justify-normal items-start gap-5 md:gap-10">
            <div className="flex flex-col justify-normal items-start gap-3">
                <Typography variant="h2" className="font-bold">Conditions d'utilisation</Typography>
                <Typography variant="h5" className="font-semibold">Introduction</Typography>
                <Typography>
                    En utilisant <span className="font-semibold">QuickUpdate</span>, vous acceptez de respecter les présentes Conditions d'Utilisation. Veuillez lire attentivement ces conditions avant d'utiliser notre service.
                </Typography>
                <Typography variant="h6">
                    Si vous n'êtes pas d'accord avec ces conditions, vous ne devez pas utiliser l'application.
                </Typography>
            </div>
            <div className="flex flex-col justify-normal items-start gap-3">
                <Typography variant="h5" className="font-semibold">Services fournis</Typography>
                <Typography>
                    <span className="font-semibold">QuickUpdate</span> vous permet de gérer et mettre à jour vos contacts facilement, grâce aux fonctionnalités suivantes :
                </Typography>
                <Typography tag="div">
                    <ul className="list-disc list-inside">
                        <li>Importer des contacts depuis votre compte Gmail.</li>
                        <li>Mettre à jour les numéros de téléphone de vos contacts selon des critères définis.</li>
                        <li>Sauvegarder vos contacts dans des fichiers VCF via notre intégration avec Supabase.</li>
                        <li>Gérer vos fichiers sauvegardés via la page "Settings".</li>
                    </ul>
                </Typography>
            </div>
            <div className="flex flex-col justify-normal items-start gap-3">
                <Typography variant="h5" className="font-semibold">Conditions d’accès</Typography>
                <Typography>
                    L'utilisation de <span className="font-semibold">QuickUpdate</span> nécessite un compte Google valide pour l'authentification. Vous devez également autoriser l'application à accéder à vos contacts pour que nous puissions les importer et les mettre à jour.
                </Typography>
            </div>
            <div className="flex flex-col justify-normal items-start gap-3">
                <Typography className="font-semibold" variant="h5">Responsabilités de l'utilisateur</Typography>
                <Typography>
                    Vous êtes responsable de la véracité des informations que vous fournissez à <span className="font-semibold">QuickUpdate</span>, notamment vos informations de contact et votre compte Google. Vous vous engagez à ne pas utiliser notre service de manière illégale, nuisible ou contraire à l'éthique. Vous vous engagez également à ne pas importer des contacts qui seraient en violation de la loi ou qui ne vous appartiennent pas.
                </Typography>
            </div>
            <div className="flex flex-col justify-normal items-start gap-3">
                <Typography className="font-semibold" variant="h5">Propriété intellectuelle</Typography>
                <Typography>
                    Tout le contenu de <span className="font-semibold">QuickUpdate</span>, y compris les textes, graphiques, logos, images, et logiciels, est la propriété de <span className="font-semibold">QuickUpdate</span> ou de ses partenaires et est protégé par des droits d'auteur et des lois sur la propriété intellectuelle. Vous n'êtes pas autorisé à copier, distribuer ou exploiter ce contenu sans autorisation.
                </Typography>
            </div>
            <div className="flex flex-col justify-normal items-start gap-3">
                <Typography variant="h5" className="font-semibold">Limitation de responsabilité</Typography>
                <Typography>
                    Nous nous efforçons de fournir un service fiable et sécurisé, mais nous ne pouvons garantir que <span className="font-semibold">QuickUpdate</span> sera exempt d’erreurs ou d’interruptions. Nous ne sommes pas responsables des pertes ou dommages causés par l’utilisation de notre application, ni des erreurs dues à des problèmes externes tels que des serveurs tiers (par exemple, Google ou Supabase).
                </Typography>
            </div>
            <div className="flex flex-col justify-normal items-start gap-3">
                <Typography variant="h5" className="font-semibold">Modifications des conditions</Typography>
                <Typography>
                    Nous pouvons modifier ces Conditions d'Utilisation à tout moment. Nous vous informerons de toute modification en publiant la nouvelle version sur cette page. Votre utilisation continue de <span className="font-semibold">QuickUpdate</span> après une modification constitue votre acceptation des nouvelles conditions.
                </Typography>
            </div>
            <div className="flex flex-col justify-normal items-start gap-3">
                <Typography variant="h5" className="font-semibold">Résiliation</Typography>
                <Typography>
                    Nous nous réservons le droit de suspendre ou de résilier votre accès à <span className="font-semibold">QuickUpdate</span> si vous enfreignez les présentes conditions.
                </Typography>
            </div>
            <div className="flex flex-col justify-normal items-start gap-3">
                <Typography variant="h5" className="font-semibold">Lois applicables et résolution des conflits</Typography>
                <Typography>
                    Ces Conditions d'Utilisation sont régies par les lois en vigueur dans le pays où QuickUpdate est hébergé. Tout conflit relatif à l'utilisation de l'application sera soumis à la compétence exclusive des tribunaux compétents.
                </Typography>
            </div>
        </div>
    )
}

export default UserTermsComponent;
