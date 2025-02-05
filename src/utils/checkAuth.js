export const checkAuth = () => {
  if (localStorage.getItem("username") !== null) {
    return true;
  }
};
