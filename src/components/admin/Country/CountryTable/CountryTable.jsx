import { useDispatch } from "react-redux";
import { openModal } from "../../../../Features/modal";
import { handleDate } from "../../../../utils/date";
import Spinner from "../../../common/loader/Spinner";
import Table from "../../../common/table/Table";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

const thead = [
  {
    title: "id",
    className: "",
    order: "id",
    sort: "",
  },
  {
    title: "name",
    className: "",
    order: "name",
    sort: "",
  },
  {
    title: "createAt",
    className: "",
    order: "createAt",
    sort: "",
  },
];

const CountryTable = ({ data, isLoading, setFormData, setEdit }) => {
  const dispatch = useDispatch();

  return (
    <Table thead={thead}>
      {isLoading && (
        <tr>
          <td colSpan={4}>
            <Spinner width="30px" />
          </td>
        </tr>
      )}

      {data &&
        data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{handleDate(item.createdAt)}</td>
            <td className="actions">
              <span
                className="edit"
                style={{ margin: "0 10px" }}
                onClick={() => {
                  setEdit(true);
                  setFormData(item);
                  dispatch(openModal(1));
                }}
              >
                <BiEdit />
              </span>

              <span
                className="delete"
                onClick={() => {
                  dispatch(openModal(0));
                  setFormData(item);
                }}
              >
                <MdDelete />
              </span>
            </td>
          </tr>
        ))}

      {data?.length < 1 && !isLoading && (
        <tr>
          <td colSpan={4}>No Data</td>
        </tr>
      )}
    </Table>
  );
};

export default CountryTable;
