common();
fetch("http://127.0.0.1:3000/api/v1/mess", {
  method: "GET",
  headers: {
    Authentication: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    dataInsertion(data.message);
    let html = ``;
    data.message.data.notices.forEach((item) => {
      html += itemGenerate(item);
    });
    document
      .querySelector(".main__content__notices")
      .insertAdjacentHTML("beforeend", html);
    frosted();
  });
const itemGenerate = (item) => {
  console.log(item);
  return `<div class="main__content__notices--noticeupdates">
  <div class="main__content__notices--noticeupdates--icon">
    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
      <path
        d="M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" />
    </svg>
  </div>
  <div>
    <div class="main__content__notices--noticeupdates--title">
     ${item.head}
    </div>
    <div class="main__content__notices--noticeupdates--text">${item.description}
    </div>
  </div>
  <div class="main__content__notices--noticeupdates--button">
    <button class="clearButton">Clear</button>
    <button>
      <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
        <path
          d="M220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Zm260-153L287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193Z" />
      </svg>
    </button>
  </div>
</div>`;
};
