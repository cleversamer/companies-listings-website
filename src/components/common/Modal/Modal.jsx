import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import "./modal.css";
import { closeModal } from "../../../Features/modal";

const Modal = ({
  headerTitle,
  headerClass,
  width,
  top,
  hideClose,
  show,
  children,
  center,
  ...props
}) => {
  const dispatch = useDispatch();

  return (
    show &&
    ReactDOM.createPortal(
      <div className={`modal ${center ? "center" : "top"}`} {...props}>
        <div
          className="modal-container"
          style={{ paddingTop: top ? "30px" : 0, width: width && width }}
        >
          <div className="modal-content">
            <div className={`modal-header ${headerClass || ""}`}>
              <h3>{headerTitle}</h3>

              {!hideClose && (
                <div className="close">
                  <GrClose onClick={() => dispatch(closeModal())} />
                </div>
              )}
            </div>

            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>,
      document.getElementById("modal-root")
    )
  );
};

export default Modal;
