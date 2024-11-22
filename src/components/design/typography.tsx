import clsx from "clsx"
import { useEffect, useState } from "react"

interface TypographyProperties{
    children : React.ReactNode 
    className ?: string
    variant ?: 'base' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle'
    color ?: 'primary' | 'secondary' | 'tertiary' | 'default' | 'danger'
    tag ?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' 
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

const Typography = ({children, className, variant = 'base', color = 'default', tag:Tag = 'p'}:TypographyProperties)=>{
    let variantValue
    let colorValue
    let window
    const size = GetInfo()
    if(size.width <= 700) {
        window = 'mobile'
    }else {
        window = 'desktop'
    }
    if (window == 'desktop') {
        switch (variant) {
            case 'base':
                variantValue = 'text-base-desktop'
            break;
            case 'h1':
                variantValue = 'text-h1-desktop'
            break;
            case 'h2':
                variantValue = 'text-h2-desktop'
            break;
            case 'h3':
                variantValue = 'text-h3-desktop'
            break;
            case 'h4':
                variantValue = 'text-h4-desktop'
            break;
            case 'h5':
                variantValue = 'text-h5-desktop'
            break;
            case 'h6':
                variantValue = 'text-h6-desktop'
            break;
            case 'subtitle':
                variantValue = 'text-subtitle-desktop'
            break;
        }
    } else if (window == 'mobile'){
        switch (variant) {
            case 'base':
                variantValue = 'text-base-mobile'
            break;
            case 'h1':
                variantValue = 'text-h1-mobile'
            break;
            case 'h2':
                variantValue = 'text-h2-mobile'
            break;
            case 'h3':
                variantValue = 'text-h3-mobile'
            break;
            case 'h4':
                variantValue = 'text-h4-mobile'
            break;
            case 'h5':
                variantValue = 'text-h5-mobile'
            break;
            case 'h6':
                variantValue = 'text-h6-mobile'
            break;
            case 'subtitle':
                variantValue = 'text-subtitle-mobile'
            break;
        }
    }

    switch (color) {
        case 'primary':
            colorValue = 'text-primary'
        break;
        case 'secondary':
            colorValue = 'text-secondary'
        break;
        case 'tertiary':
            colorValue = 'text-tertiary'
        break;
        case 'default':
            colorValue = 'text-default'
        break;
        case 'danger':
            colorValue = 'text-danger'
        break;
    }

    return (<Tag className= {clsx(variantValue, colorValue, window == 'desktop' ? 'leading-normal-desktop' : 'leading-normal-mobile', className)} >
        {children}
    </Tag>)
}

export default Typography