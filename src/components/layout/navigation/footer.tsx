/* eslint-disable react/no-unescaped-entities */
import Typography from "@/components/design/typography"
import Link from "next/link"

const FooterComponent = ()=>{
    return (
        <div className="max-w-[70rem] mx-auto flex flex-col justify-normal items-center gap-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-10">
                <Link href={'/user-terms'}><Typography>Conditions d'utilisation</Typography></Link>
                <Link href={'/privacy-policy'}><Typography>Politique de confidentialité</Typography></Link>
                <Link href={'https://wa.me/22957940206'}><Typography>Nous contacter</Typography></Link>
            </div>
            <div>
                <Typography className="text-center">Copyright © 2024 QuickUpdate - Tous droits réservés.</Typography>
            </div>
        </div>
    )
}

export default FooterComponent