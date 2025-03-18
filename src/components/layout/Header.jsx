import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.scss'
import momentumImg from '../../assets/images/momentum.png'
import Button from '../ui/Button.jsx'
import CreateEmployeeModal from '../common/CreateEmployeeModal.jsx'

const Header = () => {
  const navigate = useNavigate()
  const modalRef = useRef()

  return (
    <header className="header">
      <img src={momentumImg} alt={'momentum logo'}
           onClick={() => navigate('/')}/>
      <div className={'btns-container'}>
        <Button className="button" onClick={() => {
          modalRef?.current?.handleOpenModal()
        }}>
        თანამშრომლის შექმნა
        </Button>
        <Button to={'/create-task'} isPurple>+ შექმენი ახალი დავალება</Button>
      </div>
      <CreateEmployeeModal modalRef={modalRef}/>
    </header>
  )
}

export default Header