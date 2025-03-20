import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import SvgIcons from '../common/SvgIcons.jsx'

const Layout = () => {
  return (
    <>
      <SvgIcons />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
