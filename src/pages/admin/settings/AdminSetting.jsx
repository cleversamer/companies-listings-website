import { useState } from "react";
import SettingForm from "../../../components/admin/settings/Form/SettingForm";
import Site from "../../../components/admin/settings/Site/Site";
import Colors from "../../../components/Setting/colors/Colors";
import Tabs from "../../../components/Setting/tabs/Tabs";

const AdminSetting = () => {
  const [active, setActive] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="setting-page mt-4">
      <div className="container">
        <Tabs active={active} setActive={setActive} />
        {active === 1 && <SettingForm user={user} />}
        {active === 2 && <Site />}
        {active === 3 && <Colors />}
      </div>
    </div>
  );
};

export default AdminSetting;
