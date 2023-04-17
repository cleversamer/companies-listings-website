import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTypesQuery } from "../../../Features/admin/type";
import { updateType } from "../../../Features/filterUserRecord";
import Spinner from "../../common/loader/Spinner";

const Type = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filterRecords);
  const { data = [], isLoading } = useGetTypesQuery();

  useEffect(() => {
    const type = localStorage.getItem("type") || data[0]?.name;
    dispatch(updateType({ type }));
  }, [data[0]?.name]);

  const handleClick = (value) => {
    localStorage.setItem("type", value);
    dispatch(updateType({ type: value }));
  };

  return (
    <div className="record-choose">
      <div className="boxes">
        <h2>Type</h2>

        <div className="box">
          {isLoading && (
            <div>
              <Spinner width={"30px"} />
            </div>
          )}

          {!isLoading && (!data || data.length < 1) && (
            <div>
              <span>No Data</span>
            </div>
          )}

          {data?.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.name)}
              className={`box-info ${
                filter.type === item.name ? "active" : ""
              }`}
            >
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Type;
