import "./styles.css"

const Button = ({text,onClick,disabled}) => {
    return(

    <button type='button' disabled={disabled} className='button-load' onClick={onClick}>{text}</button>
    )
    }

export default Button