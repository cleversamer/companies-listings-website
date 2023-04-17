import { useState } from "react";
import Button from "../../components/common/button/Button";
import "./country.css";
import { validateCountriesForm } from "../../utils/validation";
import { chooseCountries } from "../../api/auth";
import { notify } from "../../utils/responseMsg";
import { hideLoader, showLoader } from "../../Features/loader";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import CountryOptions from "../../components/CountryOptions/CountryOptions";

const Country = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [countries, setCountries] = useState([]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const errors = validateCountriesForm(countries);

      if (errors) {
        notify("error", errors);
      } else {
        dispatch(showLoader(true));
        const { data } = await chooseCountries(countries);
        const user = JSON.parse(sessionStorage.getItem("user"));
        const token = JSON.parse(sessionStorage.getItem("token"));

        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, has_countries: true })
        );

        localStorage.setItem(
          "token",
          JSON.stringify({
            token: token.token,
            refreshToken: token.refreshToken,
          })
        );

        sessionStorage.clear();

        notify("success", data.message);

        setTimeout(() => {
          window.location.href = "/record";
        }, 1000);
      }
    } catch (error) {
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <Helmet>
        <title>Country</title>
      </Helmet>

      <div className="country-page">
        <div className="left-side">
          <img
            src="/images/undraw_Working_re_ddwy.png"
            alt="images/undraw_Working_re_ddwy.png"
          />
        </div>

        <div className="right-side">
          <div className="form">
            <h2>Choose Countries</h2>

            <CountryOptions
              data={data}
              setData={setData}
              countries={countries}
              setCountries={setCountries}
            />

            <div className="text-center mt-2">
              <Button
                type="submit"
                btnClass={"second-primary"}
                onClick={handleSubmit}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;
