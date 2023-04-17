import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
