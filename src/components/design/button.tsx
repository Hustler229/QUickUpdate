import clsx from "clsx"

interface ButtonProps{
    children : React.ReactNode
    variant ?: 'primary'|'secondary'|'tertiary'|'danger'|'default'
    style ?: 'outline'|'block'
    size ?: 'small'|'medium'|'large'
    action ?: unknown
    className ? : string
}

const Button = ({children, variant = 'primary', style = 'outline', size= 'medium', action, className}:ButtonProps)=>{
    let bgColor
    let borderColor
    let textColor


    if (style == 'block') {
        switch (variant) {
            case 'primary':
                bgColor = 'bg-primary'
                borderColor = ''
                textColor = 'text-white'
            break;
            case 'secondary':
                bgColor = 'bg-secondary'
                borderColor = ''
                textColor = 'text-white'
            break;
            case 'tertiary':
                bgColor = 'bg-tertiary'
                borderColor = ''
                textColor = 'text-white'
            break;
            case 'danger':
                bgColor = 'bg-danger'
                borderColor = ''
                textColor = 'text-white'
            break;
            case 'default':
                bgColor = 'bg-default'
                borderColor = ''
                textColor = 'text-white'
            break;
        }
    }else if (style == 'outline') {
        switch (variant) {
            case 'primary':
                bgColor = ''
                borderColor = 'border-primary'
                textColor = 'text-primary'
            break;
            case 'secondary':
                bgColor = ''
                borderColor = 'border-secondary'
                textColor = 'text-secondary'
            break;
            case 'tertiary':
                bgColor = ''
                borderColor = 'border-tertiary'
                textColor = 'text-tertiary'
            break;
            case 'danger':
                bgColor = ''
                borderColor = 'border-danger'
                textColor = 'text-danger'
            break;
            case 'default':
                bgColor = ''
                borderColor = 'border-default'
                textColor = 'text-default'
            break;
        }
    }



    let fontSize
    let rounded
    let padding

    switch (size) {
        case 'small':
            fontSize = ' text-[15px] '
            rounded = 'rounded-sm'
            padding = ' px-[16px] py-[6px] '
        break;
        case 'medium':
            fontSize = ' text-[18px] '
            rounded = ' rounded-md '
            padding = ' px-[16px] py-[8px] '
        break;
        case 'large':
            fontSize = ' text-[22px] '
            rounded = ' rounded-lg '
            padding = ' px-[24px] py-[14px] '
        break;

    }
    const isStyle = ()=> {
        if (style == 'outline') {
            return true
        }else if (style == 'block') {
            return false
        }
    }
    const styleSwitcher = isStyle()
    return <button onClick={()=>action}
    className= {clsx(
        styleSwitcher ? 'border' : '',
        'font-bold',
        fontSize,
        rounded,
        padding,
        bgColor,
        borderColor,
        textColor,
        className
    )}
     >{children}</button>
}

export default Button