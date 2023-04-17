import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/common/button/Button";
import Pagenation from "../../components/Record/pagenation/Pagenation";
import SearchModal from "../../components/Record/SearchModal/SearchModal";
import RecordTable from "../../components/Record//RecordTable/RecordTable";
import { openModal } from "../../Features/modal";
import { useGetUserRecordsQuery } from "../../Features/UserRecord";
import Type from "../../components/Record/Type/Type";
import { Helmet } from "react-helmet-async";

const Record = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filterRecords);
  const { data, isLoading: recordLoading } = useGetUserRecordsQuery({
    page: filter.page,
    rgn: filter.rgn,
    type: filter.type,
    owner: filter.owner,
    comp: filter.comp,
    phas: filter.phas,
    bs: filter.bs,
    fg: filter.fg,
    dp: filter.dp,
    ys: filter.ys,
    utp_from: filter.utp_from,
    utp_to: filter.utp_to,
    bua_from: filter.bua_from,
    bua_to: filter.bua_to,
    dly: filter.dly,
  });

  return (
    <>
      <Helmet>
        <title>Country</title>
      </Helmet>

      <SearchModal results={data?.results} filter={filter} />

      <div className="record mt-2 mb-2">
        <div className="container">
          <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
            <Type filter={filter} />
          </div>

          <div className="" style={{ textAlign: "right" }}>
            <Button
              type="button"
              btnClass="second-primary"
              onClick={() => dispatch(openModal(1))}
            >
              Search
            </Button>
          </div>

          <RecordTable records={data?.records} isLoading={recordLoading} />

          {data?.pagenation.hasPagenation && (
            <Pagenation pagenation={data?.pagenation} filter={filter} />
          )}
        </div>
      </div>
    </>
  );
};

export default Record;
