import {Outlet} from "react-router-dom";
import Header from "./Header.jsx";

const Layout = () => {

  return (
      <>
        <Header/>
        <main>
          <Outlet/>
        </main>
      </>
  )
}

export default Layout;