export const handleDate = (dateValue) => {
  const date = new Date(dateValue);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

// Format Date for input Date
export const formatDate = (dateValue) => {
  const dateStr = dateValue;
  const dateObj = new Date(dateStr);
  const year = dateObj.getUTCFullYear();
  const month = `0${dateObj.getUTCMonth() + 1}`.slice(-2);
  const day = `0${dateObj.getUTCDate()}`.slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
