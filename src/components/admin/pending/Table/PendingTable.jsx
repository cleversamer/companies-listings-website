import Table from "../../../common/table/Table";
import { handleDate } from "../../../../utils/date";
import "./pending.css";
import Spinner from "../../../common/loader/Spinner";

const thead = [
  { title: "username", className: "sort", order: "user_name", sort: "ASC" },
  {
    title: "companyname",
    className: "sort",
    order: "company_name",
    sort: "ASC",
  },
  { title: "whatsApp", className: "sort", order: "whats_app", sort: "ASC" },
  { title: "CreatedAt", className: "sort", order: "createdAt", sort: "ASC" },
];

const PendingTable = ({ handleRequestModal, data, isLoading }) => {
  return (
    <Table thead={thead}>
      {isLoading && (
        <tr>
          <td colSpan={14}>
            <Spinner width="30px" />
          </td>
        </tr>
      )}

      {data &&
        data.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.user_name}</td>
              <td>{user.company_name}</td>
              <td>{user.whats_app}</td>
              <td>{handleDate(user.createdAt)}</td>
              <td className="actions">
                <a
                  target={"_blanc"}
                  href={`https://api.whatsapp.com/send?phone=${user.whats_app}`}
                >
                  <img src="images/whatsapp.png" alt="images/whatsapp.png" />
                </a>

                <span
                  className="accept"
                  onClick={() => {
                    handleRequestModal(
                      "Accept User",
                      "Ok",
                      "Are You Sure You want To Add This User !!",
                      "accept",
                      user.id
                    );
                  }}
                >
                  <img src="images/right2.png" alt="images/right2.png" />
                </span>

                <span
                  className="delete"
                  onClick={() => {
                    handleRequestModal(
                      "Refuse User",
                      "ok",
                      "Are You Sure You want To Refuse This User !!",
                      "reject",
                      user.id
                    );
                  }}
                >
                  <img src="images/wrong2.png" alt="images/wrong2.png" />
                </span>
              </td>
            </tr>
          );
        })}

      {data?.length < 1 && !isLoading && (
        <tr>
          <td colSpan={14}>No Pending Requests</td>
        </tr>
      )}
    </Table>
  );
};

export default PendingTable;
