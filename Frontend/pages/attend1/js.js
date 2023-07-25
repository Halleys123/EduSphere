const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get("subject");
console.log(subject);

document.addEventListener("DOMContentLoaded", () => {
  fetch(`http://127.0.0.1:3000/api/v1/fetchUser`, {
    method: "GET",
    headers: {
      Authentication: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(err);
    })
    .catch((err) => {
      console.log(err);
    });
});
