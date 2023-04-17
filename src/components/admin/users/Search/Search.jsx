import Button from "../../../common/button/Button";
import InputField from "../../../common/input/Input";
import SelectField from "../../../common/select/Select";

const Search = () => {
  return (
    <div className="record-filter">
      <SelectField>
        <option value="user_name">name</option>
        <option value="company_name">company</option>
        <option value="whats_app">whats_app</option>
        <option value="createdAt">createdAt</option>
        <option value="expire_date">ExpireDate</option>
      </SelectField>

      <div className="search-info">
        <InputField type="text" placeholder="Search here" />

        <div className="btn">
          <Button
            aria-label="search"
            btnClass={"primary"}
            style={{ margin: "0 10px" }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
