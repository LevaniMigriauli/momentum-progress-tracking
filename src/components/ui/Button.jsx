import {Link} from "react-router-dom";
import './Button.scss'

const Button = ({to, children, onClick, className, type = 'button', isPurple = false}) => {

  if (to) {
    return (
        <Link to={to} className={`button ${className} ${isPurple ? 'purple' : ''}`} role={'button'}>{children}</Link>
    )
  }

  return (
      <button className={`button ${className} ${isPurple ? 'purple' : ''}`} onClick={onClick} type={type}>
        {children}
      </button>
  )
}

export default Button;