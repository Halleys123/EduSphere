const button = document.querySelector(".content__body__main__btn");
const fields = document.querySelectorAll(
  ".content__body__main__item--box__input"
);
button.addEventListener("click", async (e) => {
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
    alert("yup");
  } catch (err) {
    alert("no");

    // console.log(err.err.body);
  }
});
// "name":"heman",
// "password":"123456"
// ,"phone":1234507708,
// "email":"fck@nith.ac.in",
// "section":"d",
// "session":"2333"
