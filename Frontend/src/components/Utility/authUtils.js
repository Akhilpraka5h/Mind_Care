import axios from "axios";

export const checkUserToken = () => {
  const userToken = localStorage.getItem("token");
  return userToken && userToken !== "undefined";
};

export const setLoginStatus = (setIsLoggedIn) => {
  const status = checkUserToken();
  setIsLoggedIn(status);
};
export const getlogginedStatus = () => {
  const status = localStorage.getItem("logginedin");
  return status && status !== "undefined";
};

export const checkrole = (checkrole) => {
  axios
    .get("http://localhost:3000/user/profile", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      const role = res.data.role;
      console.log(role == checkrole);
      return (role == checkrole);
    })
    .catch((e) => {
      return false;
    });
};
