// Loader
const loaderWrapper = document.querySelector(".loader-wrapper");
setTimeout(() => {
  loaderWrapper.classList.add("hide");
}, 1000);
// Modal
const modal = document.querySelector(".modal"),
  modalContent = document.querySelector(".modal__content"),
  contactBtn = document.querySelectorAll(".contact-btn"),
  modalCloseBtn = document.querySelector(".modal__close");
function openModal() {
  modal.classList.add("show");
  modal.classList.add("fade");
  if (modal.classList.contains("hide")) {
    modal.classList.remove("hide");
  }
  document.querySelector("body").style.overflow = "hidden";
}
// auto-open Modal
const modalTimerId = setTimeout(openModal, 5000);
// Modal/Open Modal
contactBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal();
    clearTimeout(modalTimerId);
  });
});
// Modal/Close Modal
function closeModal() {
  modal.classList.remove("show");
  document.querySelector("body").style.overflow = "scroll";
}
modalCloseBtn.addEventListener("click", () => {
  if (modal.classList.contains("show")) {
    closeModal();
  }
});

modal.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    closeModal();
  }
  console.log(event.target);
});
// Tabs
const tabsParents = document.querySelector(".tabheader__items"),
  tabs = tabsParents.querySelectorAll(".tabheader__item"),
  tabContents = document.querySelectorAll(".tab_content");

function hideContent() {
  tabContents.forEach((content) => {
    content.classList.add("hide");
    content.classList.remove("show");
  });

  tabs.forEach((tab) => {
    tab.classList.remove("tabheader__item_active");
  });
}
function showContent(index = 0) {
  tabContents[index].classList.add("show");
  tabContents[index].classList.remove("hide");
  tabContents[index].classList.add("fade");
  tabs[index].classList.add("tabheader__item_active");
}
hideContent();
showContent();
tabsParents.addEventListener("click", (event, index) => {
  const target = event.target;
  if (target && target.classList.contains("tabheader__item")) {
    tabs.forEach((tab, index) => {
      if (target === tab) {
        hideContent();
        showContent(index);
      }
    });
  }
});

// Timer
const deadline = "2026-09-10";
const titleDate = document.querySelector("#title");

function getTimeRemaining(deadline) {
  let days, hours, minutes, seconds;
  const time = Date.parse(deadline) - Date.parse(new Date());
  if (time <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    titleDate.textContent = `4-kurs kelgan va bu ${deadline} edi`;
  } else {
    ((days = Math.floor(time / (1000 * 60 * 60 * 24))),
      (hours = Math.floor((time / (1000 * 60 * 60)) % 24)),
      (minutes = Math.floor((time / (1000 * 60)) % 60)),
      (seconds = Math.floor((time / 1000) % 60)));
  }

  return {
    totalTime: time,
    days,
    hours,
    minutes,
    seconds,
  };
}
// formatting number
function formatNumber(number) {
  if (number >= 0 && number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
}
function setClock(wrapper, deadline) {
  const timer = document.querySelector(wrapper),
    days = timer.querySelector("#days"),
    hours = timer.querySelector("#hours"),
    minutes = timer.querySelector("#minutes"),
    seconds = timer.querySelector("#seconds"),
    timeInterval = setInterval(updateClock, 1000);
  updateClock();
  function updateClock() {
    const displayedTime = getTimeRemaining(deadline);
    days.textContent = formatNumber(displayedTime.days);
    hours.textContent = formatNumber(displayedTime.hours);
    minutes.textContent = formatNumber(displayedTime.minutes);
    seconds.textContent = formatNumber(displayedTime.seconds);

    if (displayedTime.totalTime <= 0) {
      clearInterval(timeInterval);
    }
  }
}
setClock(".timer", deadline);
// METHOD POST to Telegram Bot
const form = document.querySelector(".modal-form"),
  sendBtn = document.querySelector(".send-button"),
  BOT_API_TOKEN = "8384790566:AAGrjnxqi490fgvfP47-wcxcxwopjioKsNk",
  CHAT_ID = "6401123819";
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  const json = JSON.stringify(object);
  if (!json) {
    return json;
  } else {
    fetch(`https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `Full-name: ${object.name}, Phone: ${object.phone}`,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        form.reset();
        sendBtn.textContent = "";
        sendBtn.textContent = "Yuborildi!";
        setTimeout(() => {
          sendBtn.textContent = "Contect Us";
        }, 1000);
        setTimeout(closeModal, 2000);
        console.log(data);
      })
      .catch(() => {
        console.log(
          "Telegram bilan bog'lanishda nimadir xato ketdi. status:404",
        );
      })
      .finally(() => {
        console.log("Telegram Fetching is updated just now");
      });
  }
});
