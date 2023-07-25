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
// Create the chart
const chart = new ApexCharts(
  document.querySelector(".main__content__attendance"),
  options
);

// Render the chart
chart.render();
