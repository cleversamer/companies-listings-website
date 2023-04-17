import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useGetCountriesQuery } from "../../../../Features/admin/Country";
import "./countries.css";

const CountryOptions = ({ formData, setFormData, edit }) => {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [count, setCount] = useState(0);
  const [showList, setShowList] = useState(false);
  const [selectedCountriesId, setSelectedCountriesId] = useState([]);
  const { data } = useGetCountriesQuery();

  useEffect(() => {
    setCount(formData?.countries.length);
    setSelectedCountriesId([...formData.countries.map((item) => item.id)]);
  }, []);

  // handleClickOuSide The List And Button
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef, buttonRef]);

  const chooseCountry = (value) => {
    let selectedCountries;

    if (edit) {
      selectedCountries = [...formData.countries];
    } else {
      selectedCountries = formData.countries;
    }

    // Chek If The Country Already Choosen
    const index = selectedCountries.findIndex(
      (country) => country.id === value.id
    );

    if (index >= 0) {
      selectedCountries.splice(index, 1);
      setCount((count) => count - 1);
    } else {
      selectedCountries.push(value);
      setCount((count) => count + 1);
    }

    setFormData({ ...formData, countries: [...selectedCountries] });
    setSelectedCountriesId(selectedCountries.map((item) => item.id));
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
            data.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => chooseCountry({ id: item.id })}
                >
                  <span>{item.name}</span>

                  {selectedCountriesId?.includes(item.id) && (
                    <span>
                      <img src="/images/right.png" alt="/images/right.png" />
                    </span>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default CountryOptions;
