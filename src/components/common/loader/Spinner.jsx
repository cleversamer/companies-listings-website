const Spinner = ({ width }) => {
  return (
    <div
      style={{ width, height: width, margin: "auto" }}
      className="loader-inner"
    />
  );
};

export default Spinner;
