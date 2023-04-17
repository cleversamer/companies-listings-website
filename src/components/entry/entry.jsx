import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { changeLimit } from "../../Features/filter";
import SelectField from "../common/select/Select";
import "./entry.css";

const Entry = ({ options }) => {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page, limit, searchBy, searchValue, orderBy, sort } = useSelector(
    (state) => state.filter
  );

  const handleChange = (e) => {
    dispatch(changeLimit(e.target.value));

    navigate(
      `${pathname}?page=${page}&limit=${e.target.value}&searchBy=${searchBy}&searchValue=${searchValue}&orderBy=${orderBy}&sort=${sort}`
    );
  };

  return (
    <div className="entry">
      <span>Show</span>

      <SelectField value={limit} onChange={(e) => handleChange(e)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </SelectField>

      <span>entries</span>
    </div>
  );
};

export default Entry;
