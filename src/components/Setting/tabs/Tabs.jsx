import "./tabs.css";

const Tabs = ({ setActive, active }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = (value) => {
    setActive(value);
  };

  return (
    <div className="tabs mb-3">
      <ul>
        <li
          className={`tab ${active === 1 ? "active" : ""}`}
          onClick={() => handleClick(1)}
        >
          Profile
        </li>

        {user.role === "admin" && (
          <li
            className={`tab ${active === 2 ? "active" : ""}`}
            onClick={() => handleClick(2)}
          >
            site
          </li>
        )}

        <li
          className={`tab ${active === 3 ? "active" : ""}`}
          onClick={() => handleClick(3)}
        >
          colors
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
