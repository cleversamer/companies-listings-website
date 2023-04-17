import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Tabs from "../../components/Setting/tabs/Tabs";
import Form from "../../components/Setting/Form/Form";
import Colors from "../../components/Setting/colors/Colors";
import "./setting.css";

const Settings = () => {
  const [active, setActive] = useState(1);

  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <div className="setting-page mt-4">
        <div className="container">
          <div>
            <Tabs active={active} setActive={setActive} />
            {active === 1 && <Form />}
            {active === 3 && <Colors />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
