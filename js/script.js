window.addEventListener("DOMContentLoaded", () => {
  let tab_content = document.querySelectorAll(".tab_content"),
    tabheader = document.querySelectorAll(".tabheader__item"),
    tabParent = document.querySelector(".tabheader__items");
    offers_items = document.querySelector(".offers-items");
    menu_items = document.querySelector(".daytime-items");
    loader = document.querySelector(".load-container"),
    html = document.querySelector('html');

  function hideTabcontent() {
    tab_content.forEach((tabs) => {
      tabs.classList.add("hide");
      tabs.classList.remove("show");
    });
    tabheader.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(index = 0) {
    tab_content[index].classList.add("show", "fade");
    tab_content[index].classList.remove("hide");
    tabheader[index].classList.add("tabheader__item_active");
  }
  hideTabcontent();
  showTabContent(0);

  tabParent.addEventListener("click", (nishon) => {
    const target = nishon.target;
    console.log(target);

    if (target && target.classList.contains("tabheader__item")) {
      tabheader.forEach((item, index) => {
        if (item === target) {
          hideTabcontent();
          showTabContent(index);
        }
      });
    }
  });
  const deadline = "2025-09-13";

  function getTimeRemaining(tugashvaqti) {
    const time = Date.parse(tugashvaqti) - Date.parse(new Date());
    days = Math.floor(time / (1000 * 60 * 60 * 24));
    hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((time / (1000 * 60)) % 60);
    seconds = Math.floor((time / 1000) % 60);

    return {
      total: time,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function formatNumber(raqam) {
    if (raqam < 10) {
      return `0${raqam}`;
    } else {
      return raqam;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");
    interval = setInterval(updateClock, 1000);

    function updateClock() {
      const time = getTimeRemaining(endtime);
      days.textContent = formatNumber(time.days);
      hours.textContent = formatNumber(time.hours);
      minutes.textContent = formatNumber(time.minutes);
      seconds.textContent = formatNumber(time.seconds);
    }
  }
  setClock(".timer", deadline);

  let modalOpenBtns = document.querySelectorAll(".data-modal"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector(".modal__close");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalOpenBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modalCloseBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal && modal.classList.contains("show")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  });
  // form
  const form = document.querySelector("form"),
    telegram_token = "7778891769:AAEsIWBIMH0NXyi8RdR7mHqf22n3KbcCjJ8";
  chat_id = 7249232315;

  const message = {
    loading: "Loading...",
    success: "Thanks for contacting with us",
    failure: "Something went wrong...",
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const statusMessage = document.createElement("div");
    statusMessage.textContent = message.loading;

    form.append(statusMessage);

    const formData = new FormData(form);
    const objects = {};
    formData.forEach((value, key) => {
      objects[key] = value;
    });
    fetch(`https://api.telegram.org/bot${telegram_token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        text: `Ismi: ${objects.name}. Tel raqami: ${objects.phone}`,
      }),
    })
      .then(() => (statusMessage.textContent = message.loading))
      .then(() => (statusMessage.textContent = message.success))
      .catch(() => (statusMessage.textContent = message.failure))
      .finally(() =>
        setTimeout(() => {
          statusMessage.remove();
        }, 2000)
      );
  });
  //Slider
  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total");

  let slideIndex = 1;

  function showSlides(index) {
    if (index > slides.length) {
      slideIndex = 1;
    } else if (index < 1) {
      slideIndex = slides.length;
    } else {
      slideIndex = index;
    }

    slides.forEach((slide) => {
      slide.style.display = "none";
    });

    slides[slideIndex - 1].style.display = "block";

    current.textContent = `${String(slideIndex).padStart(2, "0")}`;
  }

  total.textContent = `${String(slides.length).padStart(2, "0")}`;

  showSlides(slideIndex);

  next.addEventListener("click", () => {
    showSlides(slideIndex + 1);
  });

  prev.addEventListener("click", () => {
    showSlides(slideIndex - 1);
  });

  setTimeout(() => {
   loader.style.display = "none"
   html.style.overflow = "auto"
  }, 3000)
});
