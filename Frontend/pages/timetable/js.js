common();
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
window.addEventListener("DOMContentLoaded", () => {
  fetch(`http://127.0.0.1:3000/api/v1/assignments/`, {
    method: "GET",
    headers: {
      authentication: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      pushTimeTable(timetableArrayGenerate(data.data.timetable));
      dataInsertion(data);
      frosted();
    })
    .catch(() => {
      notValid();
    });
});
item.forEach((items, index) => {
  items.addEventListener("click", () => {
    console.log(items);
    item[0].classList.toggle("hidden");
    item[1].classList.toggle("hidden");
    selectedVariables.timeTableType = GlobalVariables.timeTableType[index];
    console.log(selectedVariables.timeTableType);
  });
});
