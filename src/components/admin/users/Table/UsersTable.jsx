import Table from "../../../common/table/Table";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../Features/modal";
import { handleDate } from "../../../../utils/date";
import Spinner from "../../../common/loader/Spinner";
import "./userTable.css";

const thead = [
  {
    title: "ID",
    className: "sort",
    order: "id",
    sort: "ASC",
  },
  { title: "username", className: "sort", order: "user_name", sort: "ASC" },
  {
    title: "whatsApp",
    className: "sort",
    order: "whats_app",
    sort: "ASC",
  },
  {
    title: "company name",
    className: "sort",
    order: "company_name",
    sort: "ASC",
  },
  {
    title: "Date Created",
    className: "sort",
    order: "createdAt",
    sort: "ASC",
  },
  {
    title: "verify Date",
    className: "sort",
    order: "verify_date",
    sort: "ASC",
  },
  {
    title: "Date Expiry",
    className: "sort",
    order: "expire_date",
    sort: "ASC",
  },
];

function UsersTable({ setEdit, setFormData, isLoading, users, setUserId }) {
  const dispatch = useDispatch();

  return (
    <Table thead={thead}>
      {isLoading && (
        <tr>
          <td colSpan={14}>
            <Spinner width="30px" />
          </td>
        </tr>
      )}

      {users?.map((user) => {
        return (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.user_name}</td>
            <td>{user.whats_app}</td>
            <td>{user.company_name || "-"}</td>
            <td>{handleDate(user.createdAt)}</td>
            <td>{user.verify_date ? handleDate(user.verify_date) : "-"}</td>
            <td>{user.expire_date ? handleDate(user.expire_date) : "-"}</td>
            <td className="actions">
              <span
                className="edit"
                onClick={() => {
                  setEdit(true);
                  dispatch(openModal(1));
                  setFormData(user);
                }}
              >
                <BiEdit />
              </span>

              <span
                className="delete"
                onClick={() => {
                  dispatch(openModal(0));
                  setUserId(user.id);
                }}
              >
                <MdDelete />
              </span>
            </td>
          </tr>
        );
      })}

      {users?.length < 1 && !isLoading && (
        <tr>
          <td colSpan={14}>No Data</td>
        </tr>
      )}
    </Table>
  );
}

export default UsersTable;
