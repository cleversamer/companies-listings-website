import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCountry } from "../../../Features/filterUserRecord";
import { useGetUserCountriesQuery } from "../../../Features/userCountry";
import Spinner from "../../common/loader/Spinner";
import "./conutry.css";

const Country = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filterRecords);
  const { data = [], isLoading } = useGetUserCountriesQuery();

  useEffect(() => {
    const country = localStorage.getItem("country") || data[0]?.name;
    dispatch(updateCountry({ rgn: country }));
  }, [data[0]?.name]);

  const handleClick = (value) => {
    localStorage.setItem("country", value);
    dispatch(updateCountry({ rgn: value }));
  };

  return (
    <div className="record-choose">
      <div className="boxes">
        <h2>Countries</h2>

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

          {data?.map((country) => (
            <div
              key={country.id}
              onClick={() => handleClick(country.name)}
              className={`box-info ${
                filter.rgn === country.name ? "active" : ""
              }`}
            >
              <h3>{country.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Country;
