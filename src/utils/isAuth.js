const JWT = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("user"));

export const accessToken = () => {
  if (!JWT) {
    return false;
  }

  const { token, refreshToken } = JWT;
  if (token && refreshToken) {
    return JWT;
  } else {
    return false;
  }
};

export const isAuthenticated = () => {
  if (!accessToken()) {
    return false;
  } else if (
    user.role !== "user" ||
    !user.is_active ||
    user.is_expired ||
    !user.has_countries
  ) {
    return false;
  }

  return true;
};

export const isUserAdmin = () => {
  if (!accessToken()) {
    return false;
  } else if (user.role !== "admin") {
    return false;
  }
  return true;
};
