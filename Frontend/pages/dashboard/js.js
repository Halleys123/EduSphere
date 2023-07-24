let subjects = ["EE-101", "EE-102", "EE-103", "EE-104", "EE-105", "EE-108"];
let attendence = [10, 18, 13, 15, 20, 17];
let array = []; // Initialize array as an empty array
attendence.forEach((e, i) => {
  array.push({ x: subjects[i], y: attendence[i] });
});

var options = {
  series: [
    {
      name: "Attendance",
      data: attendence,
    },
  ],
  chart: {
    height: 350,
    type: "bar",
  },
  plotOptions: {
    bar: {
      borderRadius: 6,
      dataLabels: {
        position: "top", // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val;
    },
    offsetY: -20,
    style: {
      fontSize: "12px",
      colors: ["#304758"],
    },
  },

  xaxis: {
    categories: subjects,
    position: "top",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val) {
        return val;
      },
    },
  },
  title: {
    text: "Subjectwise Attendance",
    floating: true,
    offsetY: 330,
    align: "center",
    style: {
      color: "#444",
    },
  },
};
// Sample data for the bar chart
// const chartData = {
//   categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
//   series: [
//     {
//       name: "Series 1",
//       data: [44, 55, 41, 67],
//     },
//     {
//       name: "Series 2",
//       data: [13, 23, 20, 8],
//     },
//   ],
// };

// Chart options
// const chartOptions = {
//   chart: {
//     type: "bar",
//     height: 350,
//     stacked: false,
//   },
//   plotOptions: {
//     bar: {
//       horizontal: false,
//       columnWidth: "55%",
//     },
//   },
//   dataLabels: {
//     enabled: false,
//   },
//   stroke: {
//     show: true,
//     width: 2,
//     colors: ["transparent"],
//   },
//   xaxis: {
//     categories: chartData.categories,
//   },
//   yaxis: {
//     title: {
//       text: "Values",
//     },
//   },
//   fill: {
//     opacity: 1,
//   },
//   tooltip: {
//     y: {
//       formatter: function (val) {
//         return val;
//       },
//     },
//   },
// };

// Create the chart
const chart = new ApexCharts(
  document.querySelector(".main__content__attendance"),
  options
);

// Render the chart
chart.render();
