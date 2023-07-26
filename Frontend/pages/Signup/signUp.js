const button = document.querySelector(".content__body__main__btn");
const fields = document.querySelectorAll(
  ".content__body__main__item--box__input"
);

button.addEventListener("click", async (e) => {
  common();
  document.querySelector(".waitingBox__text").innerHTML =
    "Please Wait while we are creating your account";
  e.preventDefault();
  const crediantials = {};
  fields.forEach(async (elem) => {
    crediantials[elem.name] = elem.value;
  });
  console.log(crediantials);
  try {
    const response = await fetch(
      "http://127.0.0.1:3000/api/v1/signupintitated",
      {
        method: "POST",
        body: JSON.stringify(crediantials),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    // dataInsertion(data);
    console.log(data.success);
    if (data.success) {
      // frosted();
      document.querySelector(".waitingBox__text").innerHTML =
        "Please Check your email for verification link";
      document.querySelector(".waitingBox__loadingCircle").remove();
      document.querySelector(".waitingBox").insertAdjacentHTML(
        "afterbegin",
        `
        <div class="waitingBox__loginBtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"></path></svg>
        </div>
      `
      );
    } else {
      document.querySelector(".waitingBox__text").innerHTML =
        "Sorry there was an error while creating your account";
      // document.querySelector(".waitingBox__loginBtn").value = "Retry";
      // document.querySelector(".waitingBox__retryBtn").remove();
      document.querySelector(".waitingBox__loadingCircle").remove();
      document.querySelector(".waitingBox").insertAdjacentHTML(
        "afterbegin",
        `<div class  = "test">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="96px" height="96px"><linearGradient id="hbE9Evnj3wAjjA2RX0We2a" x1="7.534" x2="27.557" y1="7.534" y2="27.557" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a"/><stop offset=".443" stop-color="#ee3d4a"/><stop offset="1" stop-color="#e52030"/></linearGradient><path fill="url(#hbE9Evnj3wAjjA2RX0We2a)" d="M42.42,12.401c0.774-0.774,0.774-2.028,0-2.802L38.401,5.58c-0.774-0.774-2.028-0.774-2.802,0	L24,17.179L12.401,5.58c-0.774-0.774-2.028-0.774-2.802,0L5.58,9.599c-0.774,0.774-0.774,2.028,0,2.802L17.179,24L5.58,35.599	c-0.774,0.774-0.774,2.028,0,2.802l4.019,4.019c0.774,0.774,2.028,0.774,2.802,0L42.42,12.401z"/><linearGradient id="hbE9Evnj3wAjjA2RX0We2b" x1="27.373" x2="40.507" y1="27.373" y2="40.507" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#a8142e"/><stop offset=".179" stop-color="#ba1632"/><stop offset=".243" stop-color="#c21734"/></linearGradient><path fill="url(#hbE9Evnj3wAjjA2RX0We2b)" d="M24,30.821L35.599,42.42c0.774,0.774,2.028,0.774,2.802,0l4.019-4.019	c0.774-0.774,0.774-2.028,0-2.802L30.821,24L24,30.821z"/></svg>
        </div>`
      );
      const retry = document.createElement("input");

      retry.innerHTML = "Retry";
      retry.setAttribute("type", "button");
      retry.addEventListener("click", () => {
        location.reload();
      });
      retry.classList.add("waitingBox__retryBtn");
      retry.classList.add("waitingBox__Btn");
      retry.value = "Retry";
      document
        .querySelector(".waitingBox")
        .insertAdjacentElement("beforeend", retry);
    }
    // alert("yup");
  } catch (err) {
    console.log(err.message);
    document.querySelector(".waitingBox__text").innerHTML =
      "Sorry there was an error while creating your account";
    // document.querySelector(".waitingBox__loginBtn").value = "Retry";
    document.querySelector(".waitingBox__retryBtn").remove();
    document
      .querySelector(".waitingBox__cross")
      .setAttribute(
        "src",
        "../../icons/icons8-cross-windows-11-color/icons8-cross-96.svg"
      );
    notValid();
    // console.log(err.err.body);
  }
});
// "name":"heman",
// "password":"123456"
// ,"phone":1234507708,
// "email":"fck@nith.ac.in",
// "section":"d",
// "session":"2333"
document
  .querySelector(".content__body__main__btn--signUp")
  .addEventListener("click", () => {
    console.log("clicked");
    location.href = "/Frontend/pages/login/login.html";
  });
