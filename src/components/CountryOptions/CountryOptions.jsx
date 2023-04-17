import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { getCountries } from "../../api/auth";
import "./countryOption.css";

const CountryOptions = ({ data, setData, countries, setCountries }) => {
  const [count, setCount] = useState(0);
  const [showList, setShowList] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    getAllCountrise();
  }, []);

  // handleClickOuSide The List And Button
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowList(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef, buttonRef]);

  const chooseCountry = (value) => {
    const arr = countries;

    // check if the country Already Choosen
    const index = countries.findIndex((country) => country === value);
    if (index >= 0) {
      arr.splice(index, 1);
      setCount((count) => count - 1);
    } else {
      arr.push(value);
      setCount((count) => count + 1);
    }

    setCountries(arr);
  };

  // get All Countries
  const getAllCountrise = async () => {
    try {
      const { data } = await getCountries();
      setData(data);
    } catch (err) {
      if (err.status === 401) {
        localStorage.clear();
        return (window.location.href = "/auth/sign");
      }
    }
  };

  return (
    <div className="country-info">
      <div
        className="country-btn"
        onClick={() => setShowList(!showList)}
        ref={buttonRef}
      >
        <span>{count} Counrty Selected</span>

        <span>
          <IoMdArrowDropdown />
        </span>
      </div>

      <div
        ref={menuRef}
        className={`${showList ? "show countries-list" : "countries-list"}`}
      >
        <ul>
          {data &&
            data.map((item) => (
              <li key={item.id} onClick={() => chooseCountry(item.id)}>
                <span>{item.name}</span>

                {countries.includes(item.id) && (
                  <span>
                    <img src="/images/right.png" alt="/images/right.png" />
                  </span>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CountryOptions;
