import { useState } from "react";
import { notify } from "../../../utils/responseMsg";
import Spinner from "../../common/loader/Spinner";
import Table from "../../common/table/Table";
import { BiShareAlt } from "react-icons/bi";
import { IoMdDownload } from "react-icons/io";
import "./recordTable.css";
import ShareModal from "../shareModal/ShareModal";
import { useDispatch } from "react-redux";
import { openModal } from "../../../Features/modal";
import {
  useGetPDFMutation,
  useSharePDFMutation,
} from "../../../Features/UserRecord";

const thead = [
  { title: "comp", className: "", order: "", sort: "" },
  { title: "bua", className: "", order: "", sort: "" },
  { title: "ga", className: "", order: "", sort: "" },
  { title: "ra", className: "", order: "", sort: "" },
  { title: "utp", className: "", order: "", sort: "" },
  { title: "bs", className: "", order: "", sort: "" },
];

const RecordTable = ({ records, isLoading }) => {
  const [link, setLink] = useState();
  const dispatch = useDispatch();
  const [getPDf] = useGetPDFMutation();
  const [sharePDF, { isLoading: shareLoading }] = useSharePDFMutation();

  const handleGetPDf = async (rgn, comp) => {
    try {
      await getPDf(`${rgn}-${comp}`).unwrap();
    } catch (error) {
      notify("error", error?.response?.data?.message || error.message);
    }
  };

  const sharePDf = async (rgn, comp) => {
    try {
      const data = await sharePDF(`${rgn}-${comp}`).unwrap();
      dispatch(openModal(2));
      setLink(data);
    } catch (error) {
      notify("error", error?.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <ShareModal link={link} isLoading={shareLoading} />

      <Table thead={thead}>
        {isLoading && (
          <tr>
            <td colSpan={7}>
              <Spinner width={"30px"} />
            </td>
          </tr>
        )}

        {(records?.length < 1 || !records) && !isLoading && (
          <tr>
            <td colSpan="7">No Data</td>
          </tr>
        )}

        {records?.map((item) => (
          <tr key={item.id}>
            <td>{item.comp}</td>

            <td>
              {item.bua_from === item.bua_to ? (
                <span>{item.bua_from} </span>
              ) : (
                <>
                  <span>{item.bua_from} </span>:<span> {item.bua_to}</span>
                </>
              )}
            </td>

            <td>
              {item.ga_from === item.ga_to ? (
                <span>{item.ga_from} </span>
              ) : (
                <>
                  <span>{item.ga_from} </span>:<span> {item.ga_to}</span>
                </>
              )}
            </td>

            <td>
              {item.ra_from === item.ra_to ? (
                <span>{item.ra_from} </span>
              ) : (
                <>
                  <span>{item.ra_from} </span>:<span> {item.ra_to}</span>
                </>
              )}
            </td>

            <td>
              {item.utp_from === item.utp_to ? (
                <span>{item.utp_from} </span>
              ) : (
                <>
                  <span>{item.utp_from} </span>:<span> {item.utp_to}</span>
                </>
              )}
            </td>

            <td>{item.bs || "-"}</td>

            <td className="record-actions">
              <span
                onClick={() => {
                  handleGetPDf(item.rgn, item.comp);
                }}
                className="download"
              >
                <IoMdDownload />
              </span>

              <span
                className="share"
                onClick={() => {
                  sharePDf(item.rgn, item.comp);
                }}
              >
                <BiShareAlt />
              </span>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
};

export default RecordTable;
