import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../common/Modal/Modal";
import Button from "../../../common/button/Button";
import { closeModal } from "../../../../Features/modal";

const RequestModal = ({ headerTitle, content, btnTitle, handleRequest }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.value);

  return (
    <Modal
      center={true}
      width={"450px"}
      headerTitle={headerTitle}
      show={modal === 2}
    >
      <div>
        <span>{content}</span>
      </div>

      <div className="mt-3 text-center">
        <Button
          btnClass="second-primary"
          type={"submit"}
          style={{ margin: "0 10px" }}
          onClick={handleRequest}
        >
          {btnTitle}
        </Button>

        <Button
          btnClass={"cancel-btn"}
          type={"button"}
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default RequestModal;
