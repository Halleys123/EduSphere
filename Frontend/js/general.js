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
if (document.querySelectorAll(".left__navi__bottom__item")[1]) {
  document
    .querySelectorAll(".left__navi__bottom__item")[1]
    .addEventListener("click", () => {
      localStorage.removeItem("token");
      location.href = "/Frontend/pages/login/login.html";
    });
}
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
const frosted = () => {
  document.querySelector(".frosted-glass").classList.toggle("hide");
  document.querySelector(".main__content").style.overflowY = "scroll";
  document.querySelector(".waitingBox").classList.toggle("waitingBoxHide");
};
const notValid = () => {
  document.querySelector(".waitingBox__text").innerHTML =
    "Sorry there was an error fetching your data Please try agan later or log in again ";
  document.querySelector(".waitingBox__loadingCircle").style.display = "none";
  const cross = document.createElement("img");
  const box = document.createElement("div");
  box.setAttribute("class", "waitingBox__crossBox");
  cross.setAttribute("class", "waitingBox__cross");
  cross.setAttribute(
    "src",
    "../../icons/icons8-cross-windows-11-color/icons8-cross-96.svg"
  );
  box.append(cross);
  const loginBtn = document.createElement("input");
  const retry = document.createElement("input");
  const btnContainer = document.createElement("div");

  loginBtn.value = "Log In";
  loginBtn.setAttribute("type", "button");
  loginBtn.addEventListener("click", () => {
    location.href = "/Frontend/pages/login/login.html";
  });
  loginBtn.classList.add("waitingBox__Btn");
  loginBtn.classList.add("waitingBox__loginBtn");

  retry.innerHTML = "Retry";
  retry.setAttribute("type", "button");
  retry.addEventListener("click", () => {
    location.reload();
  });
  retry.classList.add("waitingBox__retryBtn");
  retry.classList.add("waitingBox__Btn");
  retry.value = "Retry";

  btnContainer.setAttribute("class", "waitingBox__btnContainer");
  btnContainer.append(loginBtn);
  btnContainer.append(retry);
  btnContainer.setAttribute("display", "flex");
  btnContainer.setAttribute("justify-content", "space-evenly");

  document.querySelector(".waitingBox").append(btnContainer);
  document.querySelector(".waitingBox").prepend(box);
  // console.log(err);
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
