const assignmentsBox = document.querySelector(".main__content__assignments");
const messageBox = document.querySelector(".main__content__annoucements");
window.addEventListener("DOMContentLoaded", () => {
  fetch("http://127.0.0.1:3000/api/v1/assignments")
    .then((res) => res.json())
    .then((data) => {
      document
        .querySelectorAll(".main__content__assignments--content")
        .forEach((assignment) => {
          assignment.remove();
        });
      data.data.subjects.forEach((subject) => {
        const data = assignmentGenerate(subject, subject.name);
        assignmentsBox.insertAdjacentHTML("beforeend", data);
      });
      document
        .querySelectorAll(".main__content__annoucements--content")
        .forEach((announcement) => {
          announcement.remove();
        });
      const data1 = announcementGenerate(
        data.data.announcements,
        "announcement"
      );
      messageBox.insertAdjacentHTML("beforeend", data1);
    });
});

function assignmentGenerate(data, imageName) {
  let html = ``;
  console.log(imageName);
  data.assignments.forEach((assignment) => {
    let dueDate = new Date(assignment.dueDate);
    let date = dueDate.getDate();
    date += " " + monthToName(dueDate.getMonth());
    date += " " + dueDate.getFullYear();
    html += `
    <div class="main__content__assignments--content">
    <div class="main__content__assignments--content--icon">
      <img src="../../icons/${imageName}.svg" />
    </div>
    <div class="main__content__assignments--content--text>">
      <p class="main__content__assignments--content--text--subject">
        ${imageName}
      </p>
      <p class="main__content__assignments--content--text--date">
       Due On - ${date}
      </p>
    </div>
  </div>
    `;
  });
  return html;
}

function announcementGenerate(data) {
  let html = ``;
  console.log(data);
  data.forEach((announcement) => {
    let dueDate = new Date(announcement.validTill);
    let date = dueDate.getDate();
    date += " " + monthToName(dueDate.getMonth());
    date += " " + dueDate.getFullYear();
    html += `
   <div class="main__content__annoucements--content">
   <div class="main__content__annoucements--content--icon">
     <img src="../../icons/account.svg" />
   </div>
   <div class="main__content__annoucements--content--text>">
     <p class="main__content__annoucements--content--text--subject">
       From ${announcement.announcer}
     </p>
     <p class="main__content__annoucements--content--text--date">
       ${announcement.message}
     </p>
   </div>
   <button>Clear</button>
 </div>`;
  });
  return html;
}

function monthToName(month) {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "Febuary";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
}
