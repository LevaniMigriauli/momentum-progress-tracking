import './Header.scss'
import momentumImg from "../../assets/images/momentum.png"
import Button from "../ui/Button.jsx";

const Header = () => {

  return (
      <header className="header">
        <img src={momentumImg} alt={'momentum logo'}/>
        <div className={'btns-container'}>
          <Button className="button">თანამშრომლის შექმნა</Button>
          <Button to={'/create-task'} isPurple>+ შექმენი ახალი დავალება</Button>
        </div>
      </header>
  );
}

export default Header;