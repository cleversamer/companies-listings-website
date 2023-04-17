import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "./responseMsg.css";

const ResponseMsg = () => {
  return ReactDOM.createPortal(
    <ToastContainer />,
    document.getElementById("modal-root")
  );
};

export default ResponseMsg;
