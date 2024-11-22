import Typography from "@/components/design/typography"
import { auth } from "@/config/firebase.config"
import clsx from "clsx"
import { User } from "firebase/auth"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


const DesktopNavigation = ()=>{
    const [user, setUser] = useState<User | null>(null); // Permet null comme valeur initiale
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Pas besoin de caster si le type est bien configuré
    });

    return () => unsubscribe();
  }, []);

    return (
        <>
            <div className="flex flex-row items-center justify-around py-2 bg-tertiary">
                <div className="flex flex-row items-center">
                    <div>
                        <Image src={'/icons/icon2.svg'} alt="icon" width={50} height={50}/>
                    </div>
                    <div className="flex flex-col items-start justify-center font-bold">
                        <Typography className="text-white">Quick</Typography>
                        <Typography className="text-white">Update</Typography>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-normal gap-10">
                    <Link href={'/'}> <Typography className={clsx("font-bold  hover:text-gray-300 active:text-gray-300", router.pathname == "/" ? "text-gray-300" : "text-white")} variant="subtitle">Acceuil</Typography> </Link>
                    <Link href={'/auth'}> <Typography className={clsx("font-bold  hover:text-gray-300 active:text-gray-300", router.pathname == "/auth" ? "text-gray-300" : "text-white")} variant="subtitle">Auth</Typography> </Link>
                    <Link href={'/dashboard'}> <Typography className={clsx("font-bold  hover:text-gray-300 active:text-gray-300", router.pathname == "/dashboard" ? "text-gray-300" : "text-white")} variant="subtitle">Dashboard</Typography> </Link>
                    <Link href={'/setting'}> <Typography className={clsx("font-bold  hover:text-gray-300 active:text-gray-300", router.pathname == "/setting" ? "text-gray-300" : "text-white")} variant="subtitle">Paramètres</Typography> </Link>
                    <Link href={'/help'}> <Typography className={clsx("font-bold  hover:text-gray-300 active:text-gray-300", router.pathname == "/help" ? "text-gray-300" : "text-white")} variant="subtitle">Aide</Typography> </Link>
                    {!user ? <Link href={'/connexion'}> <Typography className={clsx("font-bold", router.pathname == "/register" ? "text-gray-500" : "text-black")} variant="subtitle" color="default" >Connexion</Typography> </Link> : ''}
                </div>
            </div>
        </>
    )
}

export default DesktopNavigation