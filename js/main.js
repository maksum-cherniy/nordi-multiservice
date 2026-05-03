// NORDI MULTISERVICE AS - Main JavaScript

// Ініціалізація при завантаженні сторінки
document.addEventListener("DOMContentLoaded", function () {
  initLanguage();
  setupNavigationHamburger();
  setupLanguageSwitcher();
  setupWhatsAppLinks();
  setActiveNav();
  handleHeaderOnScroll();
  window.addEventListener("hashchange", setActiveNav);
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
  if (hamburger && navLinks) {
    // ensure initial accessibility state
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.addEventListener("click", function (e) {
      e.preventDefault();
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");

      // update aria state for screen readers
      hamburger.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("active") ? "true" : "false",
      );
    });

    // Закриття меню при кліку на посилання
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        if (hamburger) hamburger.setAttribute("aria-expanded", "false");
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
  const whatsappButtons = document.querySelectorAll(
    ".whatsapp-btn, .service-contact-btn, a[href*='wa.me']",
  );

  whatsappButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const serviceName = this.getAttribute("data-service");
      const isPlainSocialLink =
        this.tagName === "A" &&
        !serviceName &&
        !this.classList.contains("whatsapp-btn") &&
        !this.classList.contains("service-contact-btn");
      if (isPlainSocialLink) return;

      e.preventDefault();
      contactWhatsApp(serviceName || "Konsultasjon");
    });
  });
}

function contactWhatsApp(serviceName = "Konsultasjon") {
  const whatsappNumber = "4797640405";
  const currentLang = getSavedLanguage();
  const message = encodeURIComponent(
    currentLang === "nb"
      ? `Hei! Jeg ønsker å høre mer om: ${serviceName}`
      : `Hi! I want to know more about: ${serviceName}`,
  );

  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
}

window.contactWhatsApp = contactWhatsApp;

// Smooth scroll для анкорних посилань
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", href);
        setActiveNav();
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
    // Валідація email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const currentLang = getSavedLanguage();
      const alertMsg =
        currentLang === "nb"
          ? "Vennligst skriv inn en gyldig e-postadresse!"
          : "Please enter a valid email address!";
      alert(alertMsg);
      return;
    }

    const currentLang = getSavedLanguage();
    const subject =
      currentLang === "nb" ? `Forespørsel fra ${name}` : `Inquiry from ${name}`;
    const body = `${message}\n\nFra: ${name}\nE-post: ${email}`;
    const mailtoLink = `mailto:nordimultiservise@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    // Очистити форму
    document.querySelector("form")?.reset();
  } else {
    const currentLang = getSavedLanguage();
    const alertMsg =
      currentLang === "nb"
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

// Встановити активний пункт навігації згідно шляху
function setActiveNav() {
  const links = document.querySelectorAll(".nav-links a");
  const path = window.location.pathname.split("/").pop() || "index.html";
  const isHome = path === "index.html" || path === "";
  const hash = window.location.hash;

  links.forEach((link) => {
    const href = link.getAttribute("href");
    const hrefWithoutHash = href.split("#")[0];
    const hrefPage = hrefWithoutHash.split("/").pop() || "index.html";
    let isActive = false;

    if (href === "#contact") {
      isActive = isHome && hash === "#contact";
    } else if (href.includes("#contact")) {
      isActive = false;
    } else if (isHome && hrefPage === "index.html") {
      isActive = hash !== "#contact";
    } else {
      isActive = hrefPage === path;
    }

    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

// Додає клас до header при скролі (покращує видимість)
function handleHeaderOnScroll() {
  const header = document.querySelector("header");
  if (!header) return;
  const toggle = () => {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", toggle);
  toggle();
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

  if (navLinks && hamburger && navLinks.classList.contains("active")) {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      if (hamburger) hamburger.setAttribute("aria-expanded", "false");
    }
  }
});
