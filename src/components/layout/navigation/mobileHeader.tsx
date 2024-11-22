import Typography from "@/components/design/typography"
import Image from "next/image"

const MobileHeader = ()=>{
    return (
        <div>
            <div className="flex flex-row justify-start items-center py-2 gap-2 bg-tertiary fixed w-full top-0 px-5">
                <Image src={'/icons/icon2.svg'} alt="icon" width={50} height={50} />
                <div className="flex flex-row items-end justify-center font-bold">
                    <Typography className="text-white" variant="h1" >Quick</Typography>
                    <Typography className="text-white">Update</Typography>
                </div>
            </div>
        </div>
    )
}

export default MobileHeader