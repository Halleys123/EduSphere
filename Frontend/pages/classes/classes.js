// Todo - Change Array to object for storing files of a particular assignment
// so as to save name and link separately
// Todo - Add funcitonality to submit button

const box = document.querySelector(".main__content");
common();
window.addEventListener("DOMContentLoaded", () => {
  fetch("http://127.0.0.1:3000/api/v1/assignments", {
    method: "GET",
    headers: {
      Authentication: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.data.subjects);
      dataInsertion(data);
      frosted();
      box.innerHTML = "";
      data.data.subjects.forEach((subject) => {
        box.insertAdjacentHTML("beforeend", subjectBoxGenerator(subject));
      });
      document
        .querySelectorAll(
          ".right__subject__data__details__content__item--files--fileBox"
        )
        .forEach((fileBox) => {
          fileBox.addEventListener("click", () => {
            window.open(fileBox.getAttribute("href"));
          });
        });
    })
    .catch((err) => {
      console.log(err);
      notValid();
    });
});
function subjectBoxGenerator(subject) {
  const html = `
    <div class="right__subject">
                    <h1 class="subjectName">${subject.name}</h1>
                    <div class="scrollBox">
                        ${assignmentListGenerator(subject.assignments)}
                    </div>
                </div>
    `;
  return html;
}

function assignmentListGenerator(subjectAssignmentList) {
  let html = ``;

  subjectAssignmentList.forEach((assignment) => {
    let startDate = new Date(assignment.dateGiven);
    let endDate = new Date(assignment.dueDate);
    let teachersFiles = assignment.files.teachers;
    let studentsFiles = assignment.files.students;
    html += `
    <div class="right__subject__data">
    <div class="right__subject__data__iconBox">
        <svg class="right__subject__data__iconBox--icon" xmlns="http://www.w3.org/2000/svg"
            height="48" viewBox="0 -960 960 960" width="48">
            <path
                d="M222-80q-43.75 0-74.375-30.625T117-185v-125h127v-570l59.8 60 59.8-60 59.8 60 59.8-60 59.8 60 60-60 60 60 60-60 60 60 60-60v695q0 43.75-30.625 74.375T738-80H222Zm516-60q20 0 32.5-12.5T783-185v-595H304v470h389v125q0 20 12.5 32.5T738-140ZM357-622v-60h240v60H357Zm0 134v-60h240v60H357Zm333-134q-12 0-21-9t-9-21q0-12 9-21t21-9q12 0 21 9t9 21q0 12-9 21t-21 9Zm0 129q-12 0-21-9t-9-21q0-12 9-21t21-9q12 0 21 9t9 21q0 12-9 21t-21 9ZM221-140h412v-110H177v65q0 20 12.65 32.5T221-140Zm-44 0v-110 110Z" />
        </svg>
    </div>
    <div class="right__subject__data__details">
        <div class="right__subject__data__details__heading">
            <p class="right__subject__data__details__heading--head">${
              assignment.title
            }</p>
            <p class="right__subject__data__details__heading--description">${
              assignment.description
            }</p>
        </div>
        <div class="right__subject__data__details__content">
            <p class="right__subject__data__details__content--head">Attached Files</p>
            <div
                class="right__subject__data__details__content__teacher right__subject__data__details__content__item">
                <p
                    class="right__subject__data__details__content__teacher--text right__subject__data__details__content__item--text">
                    Provided
                    Material
                </p>
                <div
                    class="right__subject__data__details__content__teacher--files right__subject__data__details__content__item--files">
                    ${teacherFilesGenerator(teachersFiles)}

                </div>
            </div>
            <div
                class="right__subject__data__details__content__student right__subject__data__details__content__item">
                <p
                    class="right__subject__data__details__content__student--text right__subject__data__details__content__item--text">
                    Your Files
                </p>
                ${studentFilesGenerator(studentsFiles)}
            </div>
        </div>
        <div class="right__subject__data__dates">
            <div class="right__subject__data__dates__item">
                <p class="right__subject__data__dates__item--head">Start Date</p>
                <p class="right__subject__data__dates__item--date">${startDate.getDate()}  ${MonthNumberToName(
      startDate.getMonth()
    )}  ${startDate.getFullYear()}</p>
            </div>
            <div class="right__subject__data__dates__item">
                <p class="right__subject__data__dates__item--head">End Date</p>
                <p class="right__subject__data__dates__item--date"> ${endDate.getDate()}  ${MonthNumberToName(
      endDate.getMonth()
    )}  ${endDate.getFullYear()}</p>
            </div>
        </div>
    </div>
    <div class="right__subject__data__submit">
        <button class="right__subject__data__submit--button">Submit</button>
    </div>
</div>
        `;
  });
  return html;
}

function MonthNumberToName(monthNumber) {
  switch (monthNumber) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "Aug";
    case 8:
      return "Sept";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";

    default:
      return "Invalid Month";
  }
}
function teacherFilesGenerator(teacherFiles) {
  let totalTeacherFiles = teacherFiles.length;
  let html = ``;
  for (let i = 0; i < totalTeacherFiles; i++) {
    html += `
        <div href = "${teacherFiles[i]}" 
    class="right__subject__data__details__content__teacher--files--fileBox right__subject__data__details__content__item--files--fileBox">
    <svg class="right__subject__data__details__content__teacher--files--fileBox--icon right__subject__data__details__content__item--files--fileBox--icon"
        xmlns="http://www.w3.org/2000/svg" height="48"
        viewBox="0 -960 960 960" width="48">
        <path
            d="M222-80q-43.75 0-74.375-30.625T117-185v-125h127v-570l59.8 60 59.8-60 59.8 60 59.8-60 59.8 60 60-60 60 60 60-60 60 60 60-60v695q0 43.75-30.625 74.375T738-80H222Zm516-60q20 0 32.5-12.5T783-185v-595H304v470h389v125q0 20 12.5 32.5T738-140ZM357-622v-60h240v60H357Zm0 134v-60h240v60H357Zm333-134q-12 0-21-9t-9-21q0-12 9-21t21-9q12 0 21 9t9 21q0 12-9 21t-21 9Zm0 129q-12 0-21-9t-9-21q0-12 9-21t21-9q12 0 21 9t9 21q0 12-9 21t-21 9ZM221-140h412v-110H177v65q0 20 12.65 32.5T221-140Zm-44 0v-110 110Z" />
    </svg>
    <p
        class="right__subject__data__details__content__teacher--files--fileBox--text right__subject__data__details__content__item--files--fileBox--text">
        File Name</p>
</div>`;
  }
  return html;
}

function studentFilesGenerator(studentFiles) {
  let totalStudentFiles = studentFiles.length;

  let html = ``;
  for (let i = 0; i < totalStudentFiles; i++) {
    html += `
        <div href = "${studentFiles[i]}"
        class="right__subject__data__details__content__student--files--fileBox right__subject__data__details__content__item--files--fileBox">
        <svg class="right__subject__data__details__content__student--files--fileBox--icon right__subject__data__details__content__item--files--fileBox--icon"
            xmlns="http://www.w3.org/2000/svg" height="48"
            viewBox="0 -960 960 960" width="48">
            <path
                d="M222-80q-43.75 0-74.375-30.625T117-185v-125h127v-570l59.8 60 59.8-60 59.8 60 59.8-60 59.8 60 60-60 60 60 60-60 60 60 60-60v695q0 43.75-30.625 74.375T738-80H222Zm516-60q20 0 32.5-12.5T783-185v-595H304v470h389v125q0 20 12.5 32.5T738-140ZM357-622v-60h240v60H357Zm0 134v-60h240v60H357Zm333-134q-12 0-21-9t-9-21q0-12 9-21t21-9q12 0 21 9t9 21q0 12-9 21t-21 9Zm0 129q-12 0-21-9t-9-21q0-12 9-21t21-9q12 0 21 9t9 21q0 12-9 21t-21 9ZM221-140h412v-110H177v65q0 20 12.65 32.5T221-140Zm-44 0v-110 110Z" />
        </svg>
        <p
            class="right__subject__data__details__content__student--files--fileBox--text right__subject__data__details__content__item--files--fileBox--text">
            File Name</p>
    </div>`;
  }
  return html;
}
