export default function IsLoggedIn() {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
}

export const logout = () => {
  console.log("logout");
  localStorage.removeItem("user");
  window.location.href = "/";
};

export const getCurrentUser = JSON.parse(localStorage.getItem("user"));


