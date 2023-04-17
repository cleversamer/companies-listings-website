import "./select.css";

const SelectField = ({
  value,
  htmlFor,
  selectRef,
  label,
  children,
  ...props
}) => {
  return (
    <div className="select-form">
      <label htmlFor={htmlFor}>{label}</label>

      <select ref={selectRef} id={htmlFor} value={value} {...props}>
        {children}
      </select>
    </div>
  );
};

export default SelectField;
