import dropdown from "../js/dropdownElement.js";

const dropdown1 = new dropdown(
  document.querySelector(".main__nav__pageName"),
  document.querySelectorAll(".dropdown__element"),
  [
    {
      name: "display",
      value: "flex",
    },
    {
      name: "color",
      value: "black",
    },
  ]
);
dropdown1.init();
//
