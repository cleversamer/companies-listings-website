import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearInput, searchInput } from "../../Features/filter";
import Button from "../common/button/Button";
import InputField from "../common/input/Input";
import SelectField from "../common/select/Select";
import "./search.css";

const Search = ({ options }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const inputRef = useRef(null);
  const { page, limit, searchBy, searchValue, orderBy, sort } = useSelector(
    (state) => state.filter
  );
  const [search, setSearch] = useState({
    searchBy: searchBy || options[0],
    searchValue: "",
  });

  useEffect(() => {
    setSearch({
      searchBy: searchBy || options[0],
      searchValue: searchValue,
    });
  }, [options]);

  const query = `?page=${page}&limit=${limit}&searchBy=${search.searchBy}&searchValue=${search.searchValue}&orderBy=${orderBy}&sort=${sort}`;

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (inputRef.current.value == "") {
      inputRef.current.focus();
    } else {
      dispatch(
        searchInput({
          searchBy: search.searchBy,
          searchValue: search.searchValue,
        })
      );

      navigate(`${pathname}${query}`);
    }
  };

  const handleClear = () => {
    setSearch({
      searchBy: options[0],
      searchValue: "",
    });

    dispatch(clearInput());
    navigate(`${pathname}${query}`);
  };

  return (
    <div className="record-filter">
      <SelectField
        value={search.searchBy}
        name="searchBy"
        onChange={(e) => handleChange(e)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </SelectField>

      <div className="search-info">
        <InputField
          value={search.searchValue}
          closeIcon={true}
          clearInput={handleClear}
          inputRef={inputRef}
          type="text"
          name="searchValue"
          placeholder="Search here"
          handleChange={(e) => handleChange(e)}
        />

        <div className="btn">
          <Button
            aria-label="search"
            btnClass="second-primary"
            style={{ margin: "0 10px" }}
            onClick={handleClick}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
