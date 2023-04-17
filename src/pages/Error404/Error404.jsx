import { Helmet } from "react-helmet-async";
import "./error.css";

const Error404 = () => {
  return (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>

      <div className="row">
        <div className="left-side">
          <img
            style={{ height: "500px" }}
            src="/images/undraw_Page_not_found_re_e9o6.png"
            alt=""
          />
        </div>

        <div className="right-side">
          <div>
            <span>Page Not Found</span>
            <a href="/">Back to site</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
