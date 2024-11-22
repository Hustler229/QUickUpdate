import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoHome } from "react-icons/go";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { SiAuthelia } from "react-icons/si";

const MobileNavigation = () => {
  const router = useRouter();


  return (
    <div className="bg-tertiary fixed w-full bottom-0">
      {/* Affichage du statut de connexion */}
      <div className="flex flex-row justify-around items-center gap-2">
        <Link href="/">
          <div
            className={clsx(
              "flex flex-col items-center gap-1 hover:text-black p-2",
              router.pathname === "/" ? "text-black" : "text-white"
            )}
          >
            <GoHome size={23} />
            <span className="text-[12px]">Accueil</span>
          </div>
        </Link>
        <Link href="/auth">
          <div
            className={clsx(
              "flex flex-col items-center gap-1 hover:text-black p-2",
              router.pathname === "/auth" ? "text-black" : "text-white"
            )}
          >
            <SiAuthelia size={23} />
          <span className="text-[12px]">Auth</span>
          </div>
        </Link>
        <Link href="/dashboard">
          <div
            className={clsx(
              "flex flex-col items-center gap-1 hover:text-black p-2",
              router.pathname === "/dashboard" ? "text-black" : "text-white"
            )}
          >
            <LuLayoutDashboard size={23} />
            <span className="text-[12px]">Dashboard</span>
          </div>
        </Link>
        <Link href="/setting">
          <div
            className={clsx(
              "flex flex-col items-center gap-1 hover:text-black p-2",
              router.pathname === "/setting" ? "text-black" : "text-white"
            )}
          >
            <IoSettingsOutline size={23} />
            <span className="text-[12px]">Paramètres</span>
          </div>
        </Link>
        <Link href="/help">
          <div
            className={clsx(
              "flex flex-col items-center gap-1 hover:text-black p-2",
              router.pathname === "/help" ? "text-black" : "text-white"
            )}
          >
            <IoMdHelpCircleOutline size={23} />
            <span className="text-[12px]">Aide</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
