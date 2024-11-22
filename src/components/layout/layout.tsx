import { useEffect, useState } from "react"
import DesktopNavigation from "./navigation/desktop"
import MobileNavigation from "./navigation/mobile"
import MobileHeader from "./navigation/mobileHeader"
import FooterComponent from "./navigation/footer"
interface Props{
    children :React.ReactNode
}

const GetInfo = () =>{
    const [windowSize, setWindowSize] = useState({
      width : 0,
      height : 0
    })
    useEffect(()=>{
      const updateWindowSize = ()=>{
        setWindowSize({width : window.innerWidth,
          height : window.innerHeight
          })
      }
      window.addEventListener('resize', updateWindowSize)
      updateWindowSize()
      return ()=> window.removeEventListener('resize', updateWindowSize)
    },[])
    return windowSize
  }
const Layout = ({children}:Props)=>{
    const info = GetInfo()
    return (
        <div className="">
            {info.width >= 800 ? <DesktopNavigation/> : ''}
            {info.width < 800 ? <MobileHeader/> : ''}
            <div className="my-[80px] md:my-0 max-w-4xl md:mx-auto mx-3">
                {children}
              <div className="my-5">
              <FooterComponent></FooterComponent>
            </div>
            </div>
            
            <div className="">
              {info.width < 800 ? <MobileNavigation/> : ''}
            </div>
        </div>
    )
}

export default Layout