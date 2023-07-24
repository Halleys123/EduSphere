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
document.querySelectorAll(".clearButton").forEach((item) => {
  item.addEventListener("click", () => {
    if (
      !item.parentElement.parentElement.classList.contains(
        "main__content__notices--noticeupdates"
      )
    )
      item.parentElement.remove();
    else {
      item.parentElement.parentElement.remove();
    }
    // console.log(item);
  });
});
