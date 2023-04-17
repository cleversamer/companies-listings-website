import { useState } from "react";
import { useDispatch } from "react-redux";
import CountryModal from "../../../components/admin/Country/CountryModal/CountryModal";
import CountryTable from "../../../components/admin/Country/CountryTable/CountryTable";
import Button from "../../../components/common/button/Button";
import DeleteModal from "../../../components/deleteModal/DeleteModal";
import { openModal } from "../../../Features/modal";
import { Helmet } from "react-helmet-async";
import {
  useDeleteCountryMutation,
  useGetCountriesQuery,
} from "../../../Features/admin/Country";

const Country = () => {
  const dispatch = useDispatch();
  const [countryId, setCountryId] = useState();
  const [edit, setEdit] = useState(false);
  const { data, isLoading } = useGetCountriesQuery();
  const [deleteCountry] = useDeleteCountryMutation();
  const [form, setForm] = useState({
    id: "",
    name: "",
  });

  return (
    <>
      <Helmet>
        <title>Country</title>
      </Helmet>

      <DeleteModal
        headerTitle={"Delete Country"}
        deleteRequest={deleteCountry}
        id={form.id}
      />

      <CountryModal
        countryId={countryId}
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
              Add New Country
            </Button>
          </div>

          <CountryTable
            data={data}
            isLoading={isLoading}
            setCountryId={setCountryId}
            setEdit={setEdit}
            formData={form}
            setFormData={setForm}
          />
        </div>
      </div>
    </>
  );
};

export default Country;
