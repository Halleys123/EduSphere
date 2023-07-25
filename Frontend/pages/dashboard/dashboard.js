const urlParams = new URLSearchParams(window.location.search);
common();
token = urlParams.get("token");
if (token) {
  localStorage.setItem("token", token);
  location.href = "/Frontend/pages/dashboard/index.html";
} else {
  console.log("login first");
}

const assignmentsBox = document.querySelector(
  ".main__content__assignments__items"
);
const messageBox = document.querySelector(".main__content__annoucements");
const bodyitems = document.querySelectorAll(".bodyitem");
const periods = document.querySelectorAll(".period");
const teacher = document.querySelectorAll(".teacher");
const item = document.querySelectorAll(
  ".main__content__timetable--head--side--item"
);

const GlobalVariables = {
  timeTableType: {
    0: "Today",
    1: "This Week",
    2: "Next Week",
  },
  section: {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  },
  years: {
    0: "2021",
    1: "2022",
    2: "2023",
    3: "2024",
  },
  subSection: {
    1: 0,
    2: 1,
    3: 2,
  },
};
const selectedVariables = {
  timeTableType: GlobalVariables.timeTableType[0],
  section: GlobalVariables.years[1] + GlobalVariables.section[2],
  subSection: GlobalVariables.subSection[1],
};
window.addEventListener("DOMContentLoaded", () => {
  fetch(`http://127.0.0.1:3000/api/v1/assignments/`, {
    method: "GET",
    headers: {
      Authentication: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      dataInsertion(data);
      console.log("data:", data.data.section);
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
      pushTimeTable(timetableArrayGenerate(data.data.timetable));
      frosted(data);
    })
    .catch((err) => {
      notValid();
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

function timetableArrayGenerate(data) {
  let dayArray = [];
  let timetableArray = [];
  console.log(selectedVariables.subSection);
  data[selectedVariables.subSection].timetable.forEach((day) => {
    day.periods.forEach((period) => {
      dayArray.push(period);
    });
    timetableArray.push(dayArray);
    dayArray = [];
  });
  // console.log(timetableArray);
  return timetableArray;
}
function pushTimeTable(data) {
  data = flip(data);
  for (let i = 0; i < data.length * data[0].length; i++) {
    periods[i].innerHTML =
      data[Math.floor(i / data[0].length)][i % data[0].length].period;
    teacher[i].innerHTML =
      data[Math.floor(i / data[0].length)][i % data[0].length].teacher;
  }
}
function flip(data) {
  let newArray = [[], [], [], [], [], [], [], [], []];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      newArray[j].push(data[i][j]);
    }
  }
  return newArray;
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

item.forEach((items, index) => {
  items.addEventListener("click", () => {
    console.log(items);
    item[0].classList.toggle("hidden");
    item[1].classList.toggle("hidden");
    selectedVariables.timeTableType = GlobalVariables.timeTableType[index];
    console.log(selectedVariables.timeTableType);
  });
});
