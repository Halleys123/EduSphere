document.querySelectorAll(".main__content__box").forEach((item) => {
  item.addEventListener("click", () => {
    localStorage.setItem("subject", item.getAttribute("name"));
    location.href = `/Frontend/pages/attend1/attend2.html?subject=${item.getAttribute(
      "name"
    )}`;
  });
});
