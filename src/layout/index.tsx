import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <body>
        <Outlet />
      </body>
      <Footer />
    </div>
  );
};

export default Layout;
