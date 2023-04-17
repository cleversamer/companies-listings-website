import { useEffect, useState } from "react";
import InputField from "../../../common/input/Input";
import Button from "../../../common/button/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./form.css";
import { useUpdateAdminMutation } from "../../../../Features/admin/users";
import { notify } from "../../../../utils/responseMsg";
import { useDispatch } from "react-redux";
import { updateData } from "../../../../Features/auth";

const SettingForm = ({ user }) => {
  const dispatch = useDispatch();
  const [updateAdmin] = useUpdateAdminMutation();
  const [formData, setFormData] = useState({
    user_name: "",
    whats_app: "",
    password: "",
  });

  useEffect(() => {
    setFormData(user);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await updateAdmin(formData).unwrap();

      localStorage.setItem(
        "user",
        JSON.stringify({
          has_countries: false,
          id: 6,
          is_active: true,
          is_expired: false,
          role: "admin",
          user_name: formData.user_name,
          whats_app: formData.whats_app,
        })
      );

      notify("success", response.message);

      setFormData({ ...formData, password: "" });

      dispatch(
        updateData({
          user_name: formData.user_name,
          whats_app: formData.whats_app,
        })
      );
    } catch (error) {
      notify("error", error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="admin-setting-form mt-4">
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="user_name"
          value={formData?.user_name}
          onChange={(e) => handleChange(e)}
        >
          userName
        </InputField>

        <div className="phone-info">
          <label htmlFor="whatsapp-input">WhatsApp</label>

          <PhoneInput
            country={"eg"}
            name="whats_app"
            value={formData?.whats_app}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <InputField
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
        >
          New Password
        </InputField>

        <div className="text-center mt-2">
          <Button type="submit" btnClass={"second-primary"}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingForm;
