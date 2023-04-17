import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { sortData } from "../../../Features/filter";
import "./table.css";

const Table = ({ thead, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [order, setOrder] = useState("DESC");
  const [column, setColumn] = useState(null);
  const { page, limit, searchBy, searchValue } = useSelector(
    (state) => state.filter
  );

  const handleHeaderClick = (columnName) => {
    const query = `?page=${page}&limit=${limit}&searchBy=${searchBy}&searchValue=${searchValue}&orderBy=${columnName}&sort=${order}`;

    // Toggle the sorting order if the same column is clicked again
    if (columnName === column) {
      setOrder(order === "ASC" ? "DESC" : "ASC");
      setColumn(columnName);
    } else {
      setOrder(order === "ASC" ? "DESC" : "ASC");
      setColumn(columnName);
    }

    dispatch(sortData({ orderBy: columnName, sort: order }));
    navigate(`${pathname}${query}`);
  };

  return (
    <div className="table mt-1">
      <table className="text-center">
        <thead>
          <tr>
            {thead.map((item, index) => (
              <th
                onClick={() => item.sort && handleHeaderClick(item.order)}
                key={index}
                className={item.className}
                data-sort={item.sort}
                data-order={item.order}
              >
                {item.title}
              </th>
            ))}

            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="real">{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
