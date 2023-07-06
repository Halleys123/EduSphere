document.querySelectorAll(".left__navi__item__item").forEach((item) => {
  item.addEventListener("click", function (e) {
    window.location.href = e.currentTarget.getAttribute("href");
  });
});
