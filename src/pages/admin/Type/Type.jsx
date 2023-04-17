import { useState } from "react";
import { useDispatch } from "react-redux";
import TypeModal from "../../../components/admin/type/TypeModal/TypeModal";
import TypeTable from "../../../components/admin/type/TypeTable/TypeTable";
import Button from "../../../components/common/button/Button";
import DeleteModal from "../../../components/deleteModal/DeleteModal";
import { openModal } from "../../../Features/modal";
import { Helmet } from "react-helmet-async";
import {
  useDeleteTypeMutation,
  useGetTypesQuery,
} from "../../../Features/admin/type";

const Type = () => {
  const dispatch = useDispatch();
  const [typeId, setTypeId] = useState();
  const [edit, setEdit] = useState(false);
  const { data, isLoading } = useGetTypesQuery();
  const [deleteCountry] = useDeleteTypeMutation();
  const [form, setForm] = useState({ id: "", name: "" });

  return (
    <>
      <Helmet>
        <title>Type</title>
      </Helmet>

      <DeleteModal
        headerTitle={"Delete Type"}
        deleteRequest={deleteCountry}
        id={form.id}
      />

      <TypeModal
        typeId={typeId}
        edit={edit}
        formData={form}
        setFormData={setForm}
      />

      <div className="country mt-4">
        <div className="container">
          <div style={{ textAlign: " right" }}>
            <Button
              type="button"
              btnClass="second-primary"
              onClick={() => {
                setEdit(false);
                dispatch(openModal(1));
                setForm({ id: "", name: "" });
              }}
            >
              Add New Type
            </Button>
          </div>

          <TypeTable
            data={data}
            isLoading={isLoading}
            setTypeId={setTypeId}
            setEdit={setEdit}
            formData={form}
            setFormData={setForm}
          />
        </div>
      </div>
    </>
  );
};

export default Type;
