import "./button.css";

const Button = ({ type, btnClass, handleClick, children, ...props }) => {
  return (
    <button type={type} className={btnClass} onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
