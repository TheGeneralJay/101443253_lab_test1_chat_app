const signup = async () => {
  const formElement = document.querySelector("form");

  const formData = new FormData(formElement);
  const data = new URLSearchParams(formData);

  fetch("/api/signup", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.replace("http://localhost:3000/view/login");
    })
    .catch((error) => {
      alert("Incorrect username or password!");
      location.reload();
    });
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  signup();
});
