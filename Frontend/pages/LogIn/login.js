const crediantials = {};
document
  .querySelector(".content__body__main__btn")
  .addEventListener("click", async () => {
    common();
    document.querySelector(".waitingBox__text").innerHTML =
      "Please wait until we authenticate you";

    document
      .querySelectorAll(".content__body__main__item--box__input")
      .forEach((item) => {
        crediantials[item.name] = item.value;
      });
    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/login", {
        method: "POST",
        body: JSON.stringify(crediantials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.message.token);
        location.href = "/Frontend/pages/dashboard/index.html";
      } else {
        notValid();

        document.querySelector(".waitingBox__text").innerHTML =
          "Invalid email or password";

        document.querySelector(".waitingBox__loginBtn").value = "Retry";

        document.querySelector(".waitingBox__retryBtn").remove();
      }
    } catch (err) {
      console.log(err);
      notValid();

      document.querySelector(".waitingBox__text").innerHTML =
        "Invalid email or password";

      document.querySelector(".waitingBox__loginBtn").value = "Retry";

      document.querySelector(".waitingBox__retryBtn").remove();
    }
  });
document.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    document.querySelector(".content__body__main__btn").click();
  }
});
document
  .querySelector(".content__body__main__btn--signUp")
  .addEventListener("click", () => {
    console.log("clicked");
    location.href = "/Frontend/pages/signup/signup.html";
  });
