import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (status, msg) => {
  if (status === "success") {
    toast.success(msg);
  } else if (status === "warn") {
    toast.warn(msg);
  } else {
    toast.error(msg);
  }
};
