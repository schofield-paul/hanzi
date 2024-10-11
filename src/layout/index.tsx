import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

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
