import ReactDOM from "react-dom";
import "./loader.css";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="loader">
      <div className="loader-inner"></div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Loader;
