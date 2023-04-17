import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { navigtePage } from "../../Features/filter";
import "./pagentation.css";

const Pagenation = ({ pagenation }) => {
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();
  new URLSearchParams(search).get("page");
  const {
    page: pageNumber,
    itemPerPage,
    totalItems,
    currentPage,
    hasNextPage,
    hasNextThreePage,
    hasNextTwoPage,
    hasPreviousPage,
    nextPage,
    nextThreePage,
    nextTwoPage,
    previousPage,
  } = pagenation;
  const {
    page: pageNum,
    limit,
    searchBy,
    searchValue,
    orderBy,
    sort,
  } = useSelector((state) => state.filter);

  const handleNavigate = (value) => {
    dispatch(navigtePage(value));
  };

  const query = `&limit=${limit}&searchBy=${searchBy}&searchValue=${searchValue}&orderBy=${orderBy}&sort=${sort}`;

  return (
    <div className="page-info mt-3">
      <div className="entry-info">
        <span>
          Showing {pageNumber} to {itemPerPage} of{" "}
          <span className="total-items">{totalItems}</span>
        </span>
      </div>

      <div className="pagena">
        <div className="pagination">
          <Link
            onClick={() => handleNavigate(previousPage)}
            to={`${pathname}?page=${previousPage}${query}`}
            className={
              previousPage === 0
                ? "page-link previous disabled"
                : "page-link previous"
            }
          >
            Previous
          </Link>

          {currentPage !== 1 && previousPage !== 1 && (
            <Link
              onClick={() => handleNavigate(1)}
              to={`${pathname}?page=1${query}`}
              className="page-link link"
            >
              1
            </Link>
          )}

          {hasPreviousPage && (
            <Link
              onClick={() => handleNavigate(previousPage)}
              to={`${pathname}?page=${previousPage}${query}`}
              className="page-link link"
            >
              {previousPage}
            </Link>
          )}

          <Link
            onClick={() => handleNavigate(currentPage)}
            to={`${pathname}?page=${currentPage}${query}`}
            className="page-link active link"
          >
            {currentPage}
          </Link>

          {hasNextPage && (
            <Link
              onClick={() => handleNavigate(nextPage)}
              to={`${pathname}?page=${nextPage}${query}`}
              className="page-link link"
            >
              {nextPage}
            </Link>
          )}

          {hasNextTwoPage && (
            <Link
              onClick={() => handleNavigate(nextTwoPage)}
              to={`${pathname}?page=${nextTwoPage}${query}`}
              className="page-link link"
            >
              {nextTwoPage}
            </Link>
          )}

          {hasNextThreePage && (
            <Link
              onClick={() => handleNavigate(nextThreePage)}
              to={`${pathname}?page=${nextThreePage}${query}`}
              className="page-link link"
            >
              {nextThreePage}
            </Link>
          )}

          <Link
            onClick={() => handleNavigate(nextPage)}
            to={`${pathname}?page=${nextPage}${query}`}
            className={
              !hasNextPage ? "page-link next disabled" : "page-link next"
            }
          >
            nextPage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pagenation;
