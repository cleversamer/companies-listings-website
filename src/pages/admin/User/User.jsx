import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersTable from "../../../components/admin/users/Table/UsersTable";
import UserModal from "../../../components/admin/users/UserModal/UserModal";
import Button from "../../../components/common/button/Button";
import Entry from "../../../components/entry/entry";
import Search from "../../../components/search/Search";
import Pagenation from "../../../components/pagenation/Pagenation";
import { openModal } from "../../../Features/modal";
import "./user.css";
import { limit } from "../../../utils/filter";
import { oldData } from "../../../Features/filter";
import DeleteModal from "../../../components/deleteModal/DeleteModal";
import { Helmet } from "react-helmet-async";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../Features/admin/users";

const User = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const [edit, setEdit] = useState(false);
  const [userId, setUserId] = useState();
  const [deleteUser] = useDeleteUserMutation();
  const options = ["10", "20", "40", "50", "80", "100"];
  const searchOptions = ["user_name", "whats_app", "company_name"];
  const { data, isLoading } = useGetUsersQuery({
    page: filter.page || 1,
    limit: filter.limit || 10,
    searchBy: filter.searchBy || "",
    searchValue: filter.searchValue || "",
    orderBy: filter.orderBy || "createdAt",
    sort: filter.sort || "DESC",
  });
  const [form, setForm] = useState({
    id: "",
    user_name: "",
    whats_app: "",
    company_name: "",
    expire_date: "",
    password: "",
    countries: [],
  });

  useEffect(() => {
    dispatch(
      oldData({
        limit: limit || 10,
        page: 1,
        searchBy: "",
        searchValue: "",
        orderBy: "createdAt",
        sort: "DESC",
      })
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>

      <UserModal
        edit={edit}
        setEdit={setEdit}
        formData={form}
        setFormData={setForm}
      />

      <DeleteModal
        id={userId}
        headerTitle={"Delete User"}
        deleteRequest={deleteUser}
      />

      <div className="user-page mt-4 mb-3">
        <div className="container">
          <div className="user-search">
            <Entry options={options} />

            <Search options={searchOptions} />

            <Button
              type="button"
              btnClass="second-primary"
              onClick={() => {
                setEdit(false);
                dispatch(openModal(1));
                setForm({
                  id: "",
                  user_name: "",
                  whats_app: "",
                  company_name: "",
                  expire_date: "",
                  password: "",
                  countries: [],
                });
              }}
            >
              Add New User
            </Button>
          </div>

          <UsersTable
            users={data?.users}
            isLoading={isLoading}
            edit={edit}
            setEdit={setEdit}
            setFormData={setForm}
            setUserId={setUserId}
          />
          {data?.pagenation.hasPagenation && (
            <Pagenation pagenation={data?.pagenation} />
          )}
        </div>
      </div>
    </>
  );
};

export default User;
