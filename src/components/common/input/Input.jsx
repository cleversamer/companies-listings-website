import { AiOutlineClose } from "react-icons/ai";
import "./input.css";

const InputField = ({
  children,
  htmlFor,
  type,
  placeholder,
  value,
  inputRef,
  handleChange,
  closeIcon,
  clearInput,
  ...props
}) => {
  if (type === "file") {
    return (
      <div className="input-form">
        <label htmlFor={htmlFor}>{children}</label>
        <input
          style={{ display: "none" }}
          ref={inputRef}
          id={htmlFor}
          type={type}
          value={value}
          onChange={(e) => handleChange(e)}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className="input-form">
      <label htmlFor={htmlFor}>{children}</label>

      <input
        id={htmlFor}
        type={type}
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        {...props}
      />

      {closeIcon && (
        <span className="close-icon" onClick={() => clearInput()}>
          <AiOutlineClose />
        </span>
      )}
    </div>
  );
};

export default InputField;
