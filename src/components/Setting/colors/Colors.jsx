import { useEffect } from "react";
import "./colors.css";

const Colors = () => {
  useEffect(() => {
    const storedColor = JSON.parse(localStorage.getItem("selectedColor"));
    if (storedColor) {
      const root = document.querySelector(":root");
      root.style.setProperty("--back-ground", storedColor.color);
      root.style.setProperty("--second-color", storedColor.btnColor);
      root.style.setProperty("--second-hover-color", storedColor.hoverColor);
    }
  }, []);

  const handleColorChange = (color, btnColor, hoverColor) => {
    const root = document.querySelector(":root");
    root.style.setProperty("--back-ground", color);
    root.style.setProperty("--second-color", btnColor);
    root.style.setProperty("--second-hover-color", hoverColor);

    localStorage.setItem(
      "selectedColor",
      JSON.stringify({ color, btnColor, hoverColor })
    );
  };

  return (
    <div className="colors">
      <span
        className="one"
        onClick={() => handleColorChange("#3694bf", "#337fa8", "#1a668f")}
      ></span>

      <span
        className="two"
        onClick={() => handleColorChange("#606585", "#606585", "#3c3f52")}
      ></span>

      <span
        className="three"
        onClick={() => handleColorChange("#C56C86", "#C56C86", "#b34565")}
      ></span>

      <span
        className="four"
        onClick={() => handleColorChange("#0db3a3", "#0db3a3", "#0b9386")}
      ></span>
    </div>
  );
};

export default Colors;
