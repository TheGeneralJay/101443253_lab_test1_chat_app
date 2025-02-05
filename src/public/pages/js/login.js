const login = async () => {
  const formElement = document.querySelector("form");

  const formData = new FormData(formElement);
  const data = new URLSearchParams(formData);

  fetch("/api/login", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("username", data.username);

      window.location.replace("http://localhost:3000/");
    })
    .catch((error) => {
      alert("Incorrect username or password!");
      location.reload();
    });
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  login();
});
