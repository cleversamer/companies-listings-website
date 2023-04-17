import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../Features/loader";
import { closeModal } from "../../Features/modal";
import { notify } from "../../utils/responseMsg";
import Button from "../common/button/Button";
import Modal from "../common/Modal/Modal";
import "./deleteModa.css";

const DeleteModal = ({ headerTitle, id, deleteRequest }) => {
  const modal = useSelector((state) => state.modal.value);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(showLoader(true));

    try {
      const response = await deleteRequest(id).unwrap();
      notify("success", response.message);
      dispatch(hideLoader(true));
      dispatch(closeModal());
    } catch (error) {
      notify("success", error?.response?.data?.message || error.message);
      dispatch(hideLoader(true));
    }
  };

  return (
    <Modal
      center={true}
      width={"400px"}
      headerTitle={headerTitle}
      headerClass={"delete"}
      show={modal === 0}
    >
      <div className="delete-modal">
        <span>Are You Sure You Want to Delete ?</span>

        <div className="btns text-center">
          <Button
            type={"button"}
            btnClass="second-primary"
            onClick={handleDelete}
          >
            Delete
          </Button>

          <Button type={"button"} onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
