import Spinner from "../../../common/loader/Spinner";
import Table from "../../../common/table/Table";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../Features/modal";

const thead = [
  { title: "Rgn", className: "sort", order: "rgn", sort: "ASC" },
  { title: "Owner", className: "sort", order: "owner", sort: "ASC" },
  { title: "Comp", className: "sort", order: "comp", sort: "ASC" },
  { title: "Phas", className: "sort", order: "phas", sort: "ASC" },
  { title: "Type", className: "sort", order: "type", sort: "ASC" },
  { title: "BS", className: "sort", order: "bs", sort: "ASC" },
  { title: "Fg", className: "sort", order: "fg", sort: "ASC" },
  { title: "BUA", className: "", order: "", sort: "" },
  { title: "GA", className: "", order: "", sort: "" },
  { title: "RA", className: "", order: "", sort: "" },
  { title: "UTP", className: "", order: "", sort: "" },
  { title: "DP", className: "", order: "", sort: "" },
  { title: "YS", className: "", order: "", sort: "" },
  { title: "Dly", className: "", order: "", sort: "" },
  {
    title: "Deleiverd",
    className: "sort",
    order: "dly_delivered",
    sort: "ASC",
  },
];

const RecordTable = ({
  isLoading,
  data,
  setItemSelected,
  setEdit,
  setUserId,
}) => {
  const dispatch = useDispatch();

  const handleEdit = (item) => {
    dispatch(openModal(2));
    setItemSelected(item);
    setEdit(true);
  };

  return (
    <Table thead={thead}>
      {isLoading && (
        <tr>
          <td colSpan={16}>
            <Spinner width="30px" />
          </td>
        </tr>
      )}

      {data?.map((item) => {
        const {
          id,
          rgn,
          owner,
          comp,
          phas,
          type,
          bs,
          fg,
          bua_from,
          bua_to,
          ga_from,
          ga_to,
          ra_from,
          ra_to,
          utp_from,
          utp_to,
          dp_from,
          dp_to,
          ys_from,
          ys_to,
          dly_from,
          dly_to,
          dly_delivered,
        } = item;

        return (
          <tr key={id}>
            <td>{rgn}</td>
            <td>{owner}</td>
            <td>{comp}</td>
            <td>{phas}</td>
            <td>{type}</td>
            <td>{bs}</td>
            <td>{fg}</td>
            <td>
              {bua_from === bua_to ? (
                <span>{bua_from} </span>
              ) : (
                <>
                  <span>{bua_from} </span>:<span> {bua_to}</span>
                </>
              )}
            </td>

            <td>
              {ga_from === ga_to ? (
                <span>{ga_from} </span>
              ) : (
                <>
                  <span>{ga_from} </span>:<span> {ga_to}</span>
                </>
              )}
            </td>

            <td>
              {ra_from === ra_to ? (
                <span>{ra_from} </span>
              ) : (
                <>
                  <span>{ra_from} </span>:<span> {ra_to}</span>
                </>
              )}
            </td>

            <td>
              {utp_from || utp_to ? (
                utp_from === utp_to ? (
                  <span>{utp_from} </span>
                ) : (
                  <>
                    <span>{utp_from} </span>:<span> {utp_to}</span>
                  </>
                )
              ) : (
                <span>-</span>
              )}
            </td>

            <td>
              {dp_from || dp_to ? (
                dp_from === dp_to ? (
                  <span>{(dp_from * 100).toFixed(0)}%</span>
                ) : (
                  <>
                    <span>{(dp_from * 100).toFixed(0)}% </span>:
                    <span> {(dp_to * 100).toFixed(0)}%</span>
                  </>
                )
              ) : (
                <span>-</span>
              )}
            </td>

            <td>
              {ys_from === ys_to ? (
                <span>{ys_from} </span>
              ) : (
                <>
                  <span>{ys_from} </span>:<span> {item.ys_to}</span>
                </>
              )}
            </td>

            <td>
              <span>{dly_from} </span>:<span>{dly_to} </span>
            </td>

            <td>{dly_delivered ? "true" : "false"}</td>

            <td className="actions">
              <span className="edit" onClick={() => handleEdit(item)}>
                <BiEdit />
              </span>

              <span
                className="delete"
                onClick={() => {
                  dispatch(openModal(0));
                  setUserId(id);
                }}
              >
                <MdDelete />
              </span>
            </td>
          </tr>
        );
      })}

      {data?.length < 1 && !isLoading && (
        <tr>
          <td colSpan={16}>No Data</td>
        </tr>
      )}
    </Table>
  );
};

export default RecordTable;
