import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequestModal from "../../../components/admin/pending/RequestModal/RequestModal";
import Search from "../../../components/search/Search";
import PendingTable from "../../../components/admin/pending/Table/PendingTable";
import Entry from "../../../components/entry/entry";
import Pagenation from "../../../components/pagenation/Pagenation";
import { notify } from "../../../utils/responseMsg";
import { oldData } from "../../../Features/filter";
import { showLoader, hideLoader } from "../../../Features/loader";
import { closeModal, openModal } from "../../../Features/modal";
import { Helmet } from "react-helmet-async";
import { limit } from "../../../utils/filter";
import {
  useAcceptUserMutation,
  useGetPendingRequestsQuery,
  useRejectUserMutation,
} from "../../../Features/admin/pending";

const Pending = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const [headerTitle, setHeaderTitle] = useState();
  const [btnTitle, setBtnTitle] = useState();
  const [content, setContent] = useState();
  const [status, setStatus] = useState();
  const [userId, setUserId] = useState();
  const [acceptUser] = useAcceptUserMutation();
  const [rejectUser] = useRejectUserMutation();
  const options = ["10", "20", "40", "50", "80", "100"];
  const serachOptions = ["user_name", "company_name", "whats_app"];
  const { data, isLoading } = useGetPendingRequestsQuery({
    page: filter.page || 1,
    limit: filter.limit || 10,
    searchBy: filter.searchBy || "",
    searchValue: filter.searchValue || "",
    orderBy: filter.orderBy || "createdAt",
    sort: filter.sort || "DESC",
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

  const handleRequestModal = (headerTitle, btnTitle, content, status, id) => {
    dispatch(openModal(2));
    setHeaderTitle(headerTitle);
    setContent(content);
    setBtnTitle(btnTitle);
    setStatus(status);
    setUserId(id);
  };

  const handleRequest = async (e) => {
    dispatch(showLoader(true));

    try {
      e.preventDefault();

      if (status === "accept") {
        var response = await acceptUser(userId).unwrap();
      } else if (status === "reject") {
        var response = await rejectUser(userId).unwrap();
      }

      notify("success", response.message);
      dispatch(hideLoader());
      dispatch(closeModal());
    } catch (err) {
      notify("error", err.data.message);
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <Helmet>
        <title>Pending</title>
      </Helmet>

      <RequestModal
        headerTitle={headerTitle}
        btnTitle={btnTitle}
        content={content}
        handleRequest={handleRequest}
      />

      <div className="pending-page mt-4 mb-3">
        <div className="container">
          <div className="user-search">
            <Entry options={options} />
            <Search options={serachOptions} />
          </div>

          <PendingTable
            data={data?.pending}
            isLoading={isLoading}
            handleRequestModal={handleRequestModal}
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

export default Pending;
