import { FaListUl } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showSidebar } from "../../Features/sidebar";
import Country from "../Record/countries/Country";
import { useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isClosed = useSelector((state) => state.site.isClosed);
  const { pathname } = useLocation();

  return (
    <nav>
      <div className="container">
        <div className="navbar right-side">
          <ul className="nav-list">
            <li className="nav-icon" onClick={() => dispatch(showSidebar())}>
              <FaListUl />
            </li>

            {pathname === "/record" ? (
              <li className="country-list">
                <Country />
              </li>
            ) : (
              <li>{pathname.replaceAll("/", "")}</li>
            )}

            {auth?.role == "admin" && isClosed == true && (
              <li>Site Is Closed</li>
            )}

            <li>Hello {auth?.user_name}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
