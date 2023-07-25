document.querySelectorAll(".left__navi__item__item").forEach((item) => {
  item.addEventListener("click", function (e) {
    window.location.href = e.currentTarget.getAttribute("href");
  });
});

document.querySelectorAll(".changePageMenu").forEach((item) => {
  item.addEventListener("click", function (e) {
    window.location.href = e.currentTarget.getAttribute("href");
  });
});
document
  .querySelectorAll(".left__navi__bottom__item")[1]
  .addEventListener("click", () => {
    localStorage.removeItem("token");
    location.href = "/Frontend/pages/login/login.html";
  });
const common = () => {
  document.querySelector("body").insertAdjacentHTML(
    "afterbegin",
    `<div class="waitingBox">
  <div class="waitingBox__loadingCircle"></div>
  <div class="waitingBox__text">Edusphere is fetching your data please wait</div>
</div>
<div class="frosted-glass"></div>`
  );
};
const frosted = (data) => {
  document.querySelector(".frosted-glass").classList.toggle("hide");
  document.querySelector(".main__content").style.overflowY = "scroll";
  document.querySelector(".waitingBox").classList.toggle("waitingBoxHide");
};
const notValid = () => {
  document.querySelector(".waitingBox__text").innerHTML =
    "Sorry there was an error fetching your data Please try agan later or log in again ";
  document.querySelector(".waitingBox__loadingCircle").style.display = "none";
  const cross = document.createElement("img");
  cross.setAttribute("src", "../../icons/cross.svg");
  document.querySelector(".waitingBox").prepend(cross);
  console.log(err);
};
const dataInsertion = (data) => {
  console.log(data.user.name);
  document.querySelector(
    ".main__nav__right__right__account__details--name"
  ).innerHTML = data.user.name;
  document.querySelector(
    ".main__nav__right__right__account__details--mail"
  ).innerHTML = data.user.email;
};
