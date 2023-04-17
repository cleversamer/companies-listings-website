import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../common/input/Input";
import Modal from "../../common/Modal/Modal";
import Button from "../../common/button/Button";
import SelectField from "../../common/select/Select";
import Spinner from "../../common/loader/Spinner";
import "./searchModal.css";
import { closeModal } from "../../../Features/modal";
import { useNavigate } from "react-router";
import { updateData } from "../../../Features/filterUserRecord";

const SearchModal = ({ results, isLoading, filter }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.value);
  const navigate = useNavigate();
  const [searchItem, setSearchItems] = useState({
    owner: "",
    comp: "",
    phas: "",
    bs: "",
    fg: "",
    dp: "",
    ys: "",
    utp_from: "",
    utp_to: "",
    bua_from: "",
    bua_to: "",
    dly: "",
  });

  //  filter Owners By Rgn
  const owners = [
    ...new Set(
      results
        ?.filter((record) => record.rgn === filter.rgn)
        .map((item) => item.owner)
    ),
  ];

  // // filter comps By Owners
  const comps = [
    ...new Set(
      results
        ?.filter((item) => item.owner === searchItem.owner)
        .map((item) => item.comp)
    ),
  ];

  // // filter Phas by comp
  const phas = [
    ...new Set(
      results
        ?.filter(
          (item) =>
            item.comp === searchItem.comp && item.owner === searchItem.owner
        )
        .map((item) => item.phas)
    ),
  ];

  const ys_from = [...new Set(results?.map((item) => item.ys_from))];
  const ys_to = [...new Set(results?.map((item) => item.ys_to))];
  const maxYs = Math.max(...ys_from.concat(ys_to));

  let ys = [];

  for (let i = 1; i <= maxYs; i++) {
    ys.push(i);
  }

  // get The Current Year and 5 years after
  const currentYear = new Date().getFullYear();
  const nextFiveYears = [];

  for (let i = 0; i < 5; i++) {
    nextFiveYears.push(currentYear + i);
  }

  const handleChange = (e) => {
    setSearchItems({ ...searchItem, [e.target.name]: e.target.value.trim() });
  };

  const query = `?page=${filter.page}&rgn=${filter.rgn}&type=${filter.type}&owner=${filter.owner}&comp=${filter.comp}&phas=${filter.phas}&bs=${filter.bs}&fg=${filter.fg}&dp=${filter.dp}&ys=${filter.ys}&utp_from=${filter.utp_from}&utp_to=${filter.utp_to}&bua_from=${filter.bua_from}&bua_to=${filter.bua_to}&dly=${filter.dly}`;

  const handleSearch = () => {
    dispatch(
      updateData({
        owner: searchItem.owner,
        comp: searchItem.comp,
        phas: searchItem.phas,
        bs: searchItem.bs,
        fg: searchItem.fg,
        dp: searchItem.dp,
        ys: searchItem.ys,
        utp_from: searchItem.utp_from,
        utp_to: searchItem.utp_to,
        bua_from: searchItem.bua_from,
        bua_to: searchItem.bua_to,
        dly: searchItem.dly,
      })
    );

    dispatch(closeModal());
    navigate(query);
  };

  const resetForm = () => {
    setSearchItems({
      owner: "",
      comp: "",
      phas: "",
      bs: "",
      fg: "",
      dp: "",
      ys: "",
      utp_from: "",
      utp_to: "",
      bua_from: "",
      bua_to: "",
      dly: "",
    });
  };

  return (
    <Modal
      width={"800px"}
      show={modal === 1 && true}
      top={true}
      headerTitle={"Filter to Search"}
    >
      {isLoading && (
        <div style={{ padding: "10px 0" }}>
          <Spinner />
        </div>
      )}

      {!isLoading && (
        <div className="form-search-modal">
          <form>
            <div className="search-form">
              <SelectField
                label={"Owner"}
                name="owner"
                onChange={(e) => handleChange(e)}
                value={searchItem.owner}
              >
                <option value="">Choose Owner</option>

                {owners?.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </SelectField>

              <SelectField
                label={"Comp"}
                name="comp"
                onChange={(e) => handleChange(e)}
                value={searchItem.comp}
              >
                <option value="">Choose Comp</option>

                {comps?.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </SelectField>

              <SelectField
                label={"Phas"}
                name="phas"
                onChange={(e) => handleChange(e)}
                value={searchItem.phas}
              >
                <option value="">Choose Phas</option>

                {phas?.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </SelectField>

              <SelectField
                label={"BS"}
                name="bs"
                onChange={handleChange}
                value={searchItem.bs}
              >
                <option value="">Choose bs</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </SelectField>

              <SelectField
                label={"FG"}
                name="fg"
                onChange={(e) => handleChange(e)}
                value={searchItem.fg}
              >
                <option value="">choose fg</option>
                <option value="fg A">fg A</option>
                <option value="fg B">fg B</option>
                <option value="fg C">fg C</option>
              </SelectField>

              <SelectField
                label={"Dp"}
                name="dp"
                onChange={(e) => handleChange(e)}
                value={searchItem.dp}
              >
                <option value="">choose dp</option>
                <option value="0.00">0%</option>
                <option value="0.05">5%</option>
                <option value="0.10">10%</option>
                <option value="0.15">15%</option>
                <option value="0.20">20%</option>
                <option value="0.25">25%</option>
                <option value="0.30">30%</option>
                <option value="0.35">35%</option>
                <option value="0.40">40%</option>
                <option value="0.45">45%</option>
                <option value="0.50">50%</option>
              </SelectField>

              <SelectField
                label={"YS"}
                name="ys"
                onChange={(e) => handleChange(e)}
                value={searchItem.ys}
              >
                <option value="">Choose ys</option>

                {ys.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </SelectField>

              <SelectField
                label={"dly"}
                name="dly"
                onChange={(e) => handleChange(e)}
                value={searchItem.dly}
              >
                <option value="">Choose dly</option>
                <option value={"true"}>now</option>
                {nextFiveYears.map((year, index) => (
                  <option key={index}>{year}</option>
                ))}
              </SelectField>

              <InputField
                type="text"
                name="bua_from"
                handleChange={handleChange}
                value={searchItem.bua_from}
              >
                Bua_from
              </InputField>

              <InputField
                type="text"
                name="bua_to"
                handleChange={handleChange}
                value={searchItem.bua_to}
              >
                Bua_To
              </InputField>

              <InputField
                type="text"
                name="utp_from"
                handleChange={handleChange}
                value={searchItem.utp_from}
              >
                UTB_From
              </InputField>

              <InputField
                type="text"
                name="utp_to"
                handleChange={handleChange}
                value={searchItem.utp_to}
              >
                UTB_to
              </InputField>
            </div>

            <div
              className="text-center mt-1"
              style={{
                borderTop: "1px solid rgba(0, 0, 0, 0.116)",
                padding: "15px 0 10px",
              }}
            >
              <Button
                type="button"
                btnClass="second-primary"
                style={{ margin: "0 10px" }}
                onClick={handleSearch}
              >
                Search
              </Button>

              <Button
                type="button"
                btnClass="second-primary"
                onClick={resetForm}
              >
                clear
              </Button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default SearchModal;
