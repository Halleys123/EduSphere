const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get("subject");
let serial = 1;
common();

console.log(subject);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".main__content__head--text").innerHTML = subject;
  fetch(`http://127.0.0.1:3000/api/v1/fetchUser`, {
    method: "GET",
    headers: {
      Authentication: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dataInsertion({ user: data });
      let att = data.data.user.attendance;
      let currentSub;
      let currentSubI;
      att.forEach((e, i) => {
        console.log(subject);
        if (e.subjectName == subject) {
          currentSub = e.subjectName;
          currentSubI = i;
        }
      });
      document.querySelectorAll(".main__content__second__item").forEach((e) => {
        if (!e.classList.contains("headItem")) {
          // console.log(e.classList.contains("headItem"));
          e.remove();
        }
      });
      console.log(att[currentSubI].attendance);
      att[currentSubI].attendance.forEach((item) => {
        document
          .querySelector(".main__content__second")
          .insertAdjacentHTML("beforeend", itemGenerate(item, serial));
        // console.log(serial);
        serial++;
      });
      frosted(data);
    })
    .catch((err) => {
      notValid();

      console.log(err);
    });
});

function itemGenerate(data, serial) {
  let date = new Date(data.date).toDateString();
  let html = `
  <div class="main__content__second__item ">
  <div class="main__content__second__item--item">
      <span class="main__content__second__item--item--text">${serial}</span>
  </div>
  <div class="main__content__second__item--item">
      <span class="main__content__second__item--item--text    ">${date}</span>
  </div>
  <div class="main__content__second__item--item">
    ${timeGen(data.time)}
  </div>
  <div class="main__content__second__item--item">
    ${itemGen(data.status)}
  </div>
  <div class="main__content__second__item--item">
    ${itemGen(data.reason)}  
  </div>
</div>
  `;
  return html;
}

function timeGen(data) {
  let html = ``;
  data.forEach((item) => {
    item = new Date(item).toLocaleTimeString("en-US");
    html += `<span class="main__content__second__item--item--text">${item}</span>`;
  });
  return html;
}

function itemGen(data) {
  let html = ``;
  data.forEach((item) => {
    html += `<span class="main__content__second__item--item--text">${item}</span>`;
  });
  return html;
}
