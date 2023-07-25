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
      myData = data;
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
      makeChart(data);
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
   <button class="clearButton">Clear</button>
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

function makeChart(data) {
  console.log(data.user.attendance);
  let subjects = [];
  data.user.attendance.forEach((item) => {
    subjects.push(item.subjectName);
  });
  let attendence = [];
  data.user.attendance.forEach((item) => {
    attendence.push(item.present);
  });
  let absent = [];
  data.user.attendance.forEach((item) => {
    absent.push(item.absent);
  });
  let unknown = [];
  data.user.attendance.forEach((item) => {
    unknown.push(item.unknown);
  });

  console.log(unknown);
  // var options = {
  //   series: [
  //     {
  //       name: "Attendance",
  //       data: attendence,
  //     },
  //   ],
  //   chart: {
  //     height: 350,
  //     type: "bar",
  //   },
  //   plotOptions: {
  //     bar: {
  //       borderRadius: 6,
  //       dataLabels: {
  //         position: "top", // top, center, bottom
  //       },
  //     },
  //   },
  //   dataLabels: {
  //     enabled: true,
  //     formatter: function (val) {
  //       return val;
  //     },
  //     offsetY: -20,
  //     style: {
  //       fontSize: "12px",
  //       colors: ["#304758"],
  //     },
  //   },

  //   xaxis: {
  //     categories: subjects,
  //     position: "top",
  //     axisBorder: {
  //       show: false,
  //     },
  //     axisTicks: {
  //       show: false,
  //     },
  //     crosshairs: {
  //       fill: {
  //         type: "gradient",
  //         gradient: {
  //           colorFrom: "#D8E3F0",
  //           colorTo: "#BED1E6",
  //           stops: [0, 100],
  //           opacityFrom: 0.4,
  //           opacityTo: 0.5,
  //         },
  //       },
  //     },
  //     tooltip: {
  //       enabled: true,
  //     },
  //   },
  //   yaxis: {
  //     axisBorder: {
  //       show: false,
  //     },
  //     axisTicks: {
  //       show: false,
  //     },
  //     labels: {
  //       show: false,
  //       formatter: function (val) {
  //         return val;
  //       },
  //     },
  //   },
  //   title: {
  //     text: "Subjectwise Attendance",
  //     floating: true,
  //     offsetY: 330,
  //     align: "center",
  //     style: {
  //       color: "#444",
  //     },
  //   },
  // };
  var options = {
    series: [
      {
        name: "Present",
        data: attendence,
      },
      {
        name: "Absent",
        data: absent,
      },
      {
        name: "Unknown",
        data: unknown,
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "Subjects",
      categories: subjects,
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  // Create the chart
  const chart = new ApexCharts(
    document.querySelector(".main__content__attendance"),
    options
  );

  // Render the chart
  chart.render();
}
