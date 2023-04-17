import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminList from "./AdminList";
import UserList from "./UserList";
import Logo from "./Logo";
import { hideSidebar } from "../../Features/sidebar";
import { AiOutlineClose } from "react-icons/ai";
import "./sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { show } = useSelector((state) => state.sidebar);
  const asideRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleHideSidebar = () => {
    dispatch(hideSidebar());
  };

  return (
    <aside className={show ? "show" : ""} ref={asideRef}>
      <div className="side-bar">
        <span className="close">
          <AiOutlineClose onClick={() => dispatch(hideSidebar())} />
        </span>

        <Logo />

        {user?.role === "admin" ? (
          <AdminList hideSidebar={handleHideSidebar} />
        ) : (
          <UserList hideSidebar={handleHideSidebar} />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
