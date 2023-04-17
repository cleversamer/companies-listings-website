import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../api/auth";
import { signout } from "../../Features/auth";

const AdminList = ({ hideSidebar }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <ul className="list">
      <li>
        <NavLink to="/records" onClick={hideSidebar}>
          <img src="/images/menu.png" alt="menu-img" />
          <span>Data</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/countries" onClick={hideSidebar}>
          <img src="/images/countries.png" alt="user-img" />
          <span>Countries</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/type" onClick={hideSidebar}>
          <img src="/images/customer-behavior.png" alt="user-img" />
          <span>Types</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/users" onClick={hideSidebar}>
          <img src="/images/user.png" alt="user-img" />
          <span>Users</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/Pending-Requests" onClick={hideSidebar}>
          <img src="/images/timer.png" alt="list-img" />
          <span>Pending</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/admin/settings" onClick={hideSidebar}>
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

export default AdminList;
