common();
fetch("http://127.0.0.1:3000/api/v1/mess", {
  method: "GET",
  headers: {
    Authentication: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    let html = ``;
    data.message.data.mess.updates.forEach((item) => {
      html += itemGenerate(item);
    });
    document.querySelector(".").innerHTML = "";
    document
      .querySelector(".main__content__assignments__items")
      .insertAdjacentHTML("beforeend", html);
  });
