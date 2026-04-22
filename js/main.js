// NORDI MULTISERVICE - Main JavaScript

// Ініціалізація при завантаженні сторінки
document.addEventListener("DOMContentLoaded", function () {
  initLanguage();
  setupNavigationHamburger();
  setupLanguageSwitcher();
  setupWhatsAppLinks();
});

// Ініціалізація мови
function initLanguage() {
  const savedLang = getSavedLanguage();
  translatePage(savedLang);
  updateLanguageButtons(savedLang);
}

// Налаштування мобільного меню
function setupNavigationHamburger() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      // Анімація гамбургера
      const spans = hamburger.querySelectorAll("span");
      if (navLinks.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translateY(10px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translateY(-10px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Закриття меню при кліку на посилання
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        hamburger.querySelectorAll("span").forEach((span) => {
          span.style.transform = "none";
          span.style.opacity = "1";
        });
      });
    });
  }
}

// Налаштування перемикача мови
function setupLanguageSwitcher() {
  const langButtons = document.querySelectorAll(".lang-btn");

  langButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      translatePage(lang);
      updateLanguageButtons(lang);
    });
  });
}

// Оновлення статусу кнопок мови
function updateLanguageButtons(activeLanguage) {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const lang = btn.getAttribute("data-lang");
    if (lang === activeLanguage) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Налаштування WhatsApp посилань
function setupWhatsAppLinks() {
  const whatsappNumber = "+4799999999"; // Замініть на реальний номер
  const whatsappButtons = document.querySelectorAll(
    ".whatsapp-btn, .order-btn",
  );

  whatsappButtons.forEach((btn) => {
    if (
      btn.classList.contains("whatsapp-btn") ||
      btn.getAttribute("href")?.includes("whatsapp")
    ) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        const serviceName = this.getAttribute("data-service") || "Консультація";
        const currentLang = getSavedLanguage();
        const message = encodeURIComponent(
          currentLang === "no"
            ? `Hei! Jeg ønsker å høre mer om: ${serviceName}`
            : `Hi! I want to know more about: ${serviceName}`,
        );

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, "_blank");
      });
    }
  });
}

// Smooth scroll для анкорних посилань
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// Lazy loading для зображень
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document
    .querySelectorAll("img[data-src]")
    .forEach((img) => imageObserver.observe(img));
}

// Функція для отправки повідомлення
function sendMessage(event) {
  if (event) event.preventDefault();

  const name = document.querySelector('[name="name"]')?.value;
  const email = document.querySelector('[name="email"]')?.value;
  const message = document.querySelector('[name="message"]')?.value;

  if (name && email && message) {
    const currentLang = getSavedLanguage();
    const mailtoLink = `mailto:info@nordimultiservice.no?subject=Forespørsel fra ${name}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFra: ${name}%0D%0AE-post: ${email}`;

    window.location.href = mailtoLink;

    // Очистити форму
    document.querySelector("form")?.reset();
  } else {
    const currentLang = getSavedLanguage();
    const alertMsg =
      currentLang === "no"
        ? "Vennligst fyll ut alle feltene!"
        : "Please fill out all fields!";
    alert(alertMsg);
  }
}

// Валідація форм
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderColor = "red";
    } else {
      input.style.borderColor = "";
    }
  });

  return isValid;
}

// Аналітика - відстежування взаємодії користувача
function trackEvent(eventName, eventData) {
  console.log(`Event: ${eventName}`, eventData);
  // Тут можна додати інтеграцію з Google Analytics або іншим сервісом
}

// Інтеграція з картою
function initializeMap() {
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    // Карта вже вставлена через iframe у HTML
    // Тут можна додати додаткові функції для взаємодії з картою
  }
}

//監聽змін розміру вікна для адаптивності
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    // Переобчислення необхідних розмірів
    console.log("Window resized");
  }, 250);
});

// Перевірка користувацька активність для закриття мобільного меню
document.addEventListener("click", function (e) {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");

  if (navLinks && navLinks.classList.contains("active")) {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove("active");
      hamburger.querySelectorAll("span").forEach((span) => {
        span.style.transform = "none";
        span.style.opacity = "1";
      });
    }
  }
});
