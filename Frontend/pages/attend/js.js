let data;
common();
let optionsForChart = [];
fetch("http://127.0.0.1:3000/api/v1/fetchUser", {
  method: "GET",
  headers: {
    Authentication: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    data = data;
    console.log(data);
    document.querySelector(".main__content").innerHTML = "";
    data.data.user.attendance.forEach((item, index) => {
      document
        .querySelector(".main__content")
        .insertAdjacentHTML("beforeend", createBox(item, index));
    });
    document
      .querySelectorAll(".main__content__box__details__chart")
      .forEach((e, index) => {
        chart = new ApexCharts(e, optionsForChart[index]);
        chart.render();
      });
    dataInsertion(data.data);
    frosted();
  })
  .catch((err) => {
    notValid();
  });
console.log(data);

const createBox = (attendenceItem, index) => {
  var options = {
    series: [
      attendenceItem.absent,
      attendenceItem.present,
      attendenceItem.unknown,
    ],
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
  optionsForChart.push(options);
  let html = `<div class="main__content__box"name=${attendenceItem.subjectName}>
  <span class="main__content__box__head">${attendenceItem.subjectName}</span>
  <div class="main__content__box__details">
      <div class="main__content__box__details__chart"></div>
      <div class="main__content__box__details__textItems">
          <div
              class="main__content__box__details__textItems__item main__content__box__details__textItems__item--green">
              <span class="main__content__box__details__textItems__item--text">Presence</span>
              <span class="main__content__box__details__textItems__item--number">${
                attendenceItem.present
              }</span>
          </div>
          <div
              class="main__content__box__details__textItems__item main__content__box__details__textItems__item--red">
              <span class="main__content__box__details__textItems__item--text">Absence</span>
              <span class="main__content__box__details__textItems__item--number">${
                attendenceItem.absent
              }</span>
          </div>
          <div
              class="main__content__box__details__textItems__item main__content__box__details__textItems__item--yellow">
              <span class="main__content__box__details__textItems__item--text">Unknown</span>
              <span class="main__content__box__details__textItems__item--number">${
                attendenceItem.unknown
              }</span>
          </div>
          <div
              class="main__content__box__details__textItems__item main__content__box__details__textItems__item--skin">
              <span class="main__content__box__details__textItems__item--text">Percentage</span>
              <span class="main__content__box__details__textItems__item--number">${(
                (100 * attendenceItem.present) /
                attendenceItem.totalClasses
              ).toFixed(2)}</span>
          </div>

      </div>
  </div>
</div>
`;
  return html;
};
