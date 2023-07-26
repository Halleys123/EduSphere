common();
let hostel = "KBH";
let today = new Date()
  .toLocaleDateString("en-in", { weekday: "long" })
  .toLocaleLowerCase();
let foodItems = document.querySelectorAll(
  ".main__content__menu--item--food--des--sec"
);

window.addEventListener("DOMContentLoaded", () => {
  fetch(`http://127.0.0.1:3000/api/v1/mess`, {
    method: "GET",
    headers: {
      Authentication: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dataInsertion(data.message);
      console.log(data);
      frosted();
      for (let i = 0; i < 5; i++) {
        // console.log(data.data.mess.menu[i]);
        let menu = data.message.data.mess.menu[i];
        // console.log(menu);
        foodItems.forEach((item, index) => {
          let foods = "";

          menu.menu[index].menu.forEach((food) => {
            foods += food + ", ";
          });
          item.children[1].textContent = foods;
        });
      }
      let html = ``;
      data.message.data.mess.updates.forEach((item) => {
        html += itemGenerate(item);
      });
      document.querySelector(".main__content__assignments__items").innerHTML =
        "";
      document
        .querySelector(".main__content__assignments__items")
        .insertAdjacentHTML("beforeend", html);
      console.log(data.message.user);
      data.message.user.complaints.forEach((item) => {
        document
          .querySelector(".main__content__Complaints__items")
          .insertAdjacentHTML("beforeend", complaintGen(item));
      });
    })
    .catch((err) => {
      notValid();
      console.log(err);
    });
});

function itemGenerate(data) {
  let html = `
    <div class="main__content__updates--content">
    <div class="main__content__updates--content--left">
      <div class="main__content__updates--content--left--icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
          <path
            d="M479-40 298-408q-69 12-123.5-30T120-555q0-45 27.5-88t80.5-58q16-99 88.5-159T480-920q91 0 163 60t89 159q53 15 80.5 58t27.5 88q0 75-56.5 117T664-408L479-40ZM266-465q18 0 34-5t25-14l26-27 23 20q25 17 54.5 21.5T483-465q25 0 51-4.5t51-21.5l24-20 25 27q9 9 25.5 14t33.5 5q34 0 60.5-27.5T780-555q0-31-19-54t-54-29l-35-5-2-39q-11-79-61.5-128.5T480-860q-78 0-129 49.5T290-682l-3 39-35 8q-30 8-51 28.5T180-555q0 35 26.5 62.5T266-465Zm213 289 128-252-6-6q-28 15-60.5 22t-57.5 7q-32 0-65-7t-58-22l-6 5 125 253Zm1-486Z" />
        </svg>
      </div>
      <div class="main__content__updates--content--left--text>">
        <p class="main__content__updates--content--ledt--text--subject">
          ${data.item}
        </p>
        <p class="main__content__updates--content--left--text--date">
${data.message}        </p>
      </div>
    </div>
    <div class="main__content__updates--content--right">
      <button>Clear</button>
    </div>
  </div>
    `;
  return html;
}

function complaintGen(data) {
  let x = data.type;
  let type = "";
  if (x == "breakfast" || x == "lunch" || x == "dinner") {
    type = "Mess";
  } else {
    type = "Hostel";
  }
  let html = `
  <div class="main__content__Complaints--content">
  <div class = util>
  <div class="main__content__Complaints--content--icon">
    <img src="../../icons/notification.svg" />
  </div>
  <div class="main__content__Complaints--content--text>">
    <p class="main__content__Complaints--content--text--subject">
      Compalint for ${type}
    </p>
    <p class="main__content__Complaints--content--text--date">
      ${data.complaint}
    </p>
    <p class="main__content__Complaints--content--text--status">
     ${data.status}
    </p>
  </div>
  </div>
  <button class="clearButton" id="button">Clear</button>
</div>
  `;
  return html;
}
