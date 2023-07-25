let data;

var options = {
  series: [4, 32, 2],
  labels: ["Absence", "Presence", "Unknown"],
  chart: {
    type: "donut",
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: false,
            show: true,
            label: "Total",
          },
        },
      },
    },
  },
};

var charts = [];
var chart;

document
  .querySelectorAll(".main__content__box__details__chart")
  .forEach((e) => {
    chart = new ApexCharts(e, options);
    charts.push(chart);
    chart.render();
  });
