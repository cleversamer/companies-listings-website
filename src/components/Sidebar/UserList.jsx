import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../api/auth";
import { signout } from "../../Features/auth";

const UserList = ({ hideSidebar }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <ul className="list">
      <li>
        <NavLink to="/record" onClick={hideSidebar}>
          <img src="/images/menu.png" alt="menu-img" />
          <span>Data</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/settings" onClick={hideSidebar}>
          <img src="/images/cogwheel.png" alt="list-img" />
          <span>Settings</span>
        </NavLink>
      </li>

      <li>
        <button
          aria-label="logout"
          type="button"
          onClick={() => {
            logout(auth?.role);
            dispatch(signout());
          }}
        >
          <img src="/images/power-off.png" alt="power-img" />
          <span style={{ fontSize: "17px" }}>Logout</span>
        </button>
      </li>
    </ul>
  );
};

export default UserList;
