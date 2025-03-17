import {useNavigate} from "react-router-dom";
import './Header.scss'
import momentumImg from "../../assets/images/momentum.png"
import Button from "../ui/Button.jsx";

const Header = () => {
  const navigate = useNavigate();

  return (
      <header className="header">
        <img src={momentumImg} alt={'momentum logo'} onClick={() => navigate('/')}/>
        <div className={'btns-container'}>
          <Button className="button">თანამშრომლის შექმნა</Button>
          <Button to={'/create-task'} isPurple>+ შექმენი ახალი დავალება</Button>
        </div>
      </header>
  );
}

export default Header;