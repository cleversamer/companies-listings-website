import Button from "../../../common/button/Button";
import { useDispatch } from "react-redux";
import { notify } from "../../../../utils/responseMsg";
import { showLoader, hideLoader } from "../../../../Features/loader";
import { closeModal } from "../../../../Features/modal";
import {
  useCloseSiteMutation,
  useOpenSiteMutation,
} from "../../../../Features/admin/setting";

const Site = () => {
  const dispatch = useDispatch();
  const [openSite] = useOpenSiteMutation();
  const [closeSite] = useCloseSiteMutation();

  const handleClick = async (value) => {
    dispatch(showLoader(true));
    try {
      if (value === "open") {
        var { message } = await openSite().unwrap();
      } else {
        var { message } = await closeSite().unwrap();
      }

      notify("success", message);

      dispatch(hideLoader());

      dispatch(closeModal());
    } catch (error) {
      notify("error", error?.response?.data?.message || error.message);
      dispatch(hideLoader());
    }
  };

  return (
    <div className="setting">
      <div
        className="close-site text-center"
        style={{
          padding: "10px 0",
        }}
      >
        <Button
          type="button"
          btnClass="second-primary"
          onClick={() => handleClick("close")}
          style={{ margin: "0 10px" }}
        >
          Close
        </Button>

        <Button
          type="button"
          btnClass="second-primary"
          onClick={() => handleClick("open")}
          style={{ margin: "0 10px" }}
        >
          Open
        </Button>
      </div>
    </div>
  );
};

export default Site;
