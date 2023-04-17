import { useDispatch } from "react-redux";
import { openModal } from "../../../Features/modal";
import "./addNew.css";

const AddNew = ({ modal, setEdit, resetForm }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(openModal(modal));
    setEdit(false);
    resetForm();
  };

  return (
    <div className="add-new">
      <span className="new-circle" onClick={handleSubmit}>
        +
      </span>
    </div>
  );
};

export default AddNew;
