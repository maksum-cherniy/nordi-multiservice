// Мовні переклади
const translations = {
  no: {
    // Header
    services: "Tjenester",
    reviews: "Anmeldelser",
    contact: "Kontakt",
    language: "Språk",

    // Home
    welcome: "Velkommen til NORDI MULTISERVICE",
    hero_subtitle: "Profesjonell lasernrengjøring av skipsskrog",
    about_title: "Om oss",
    about_desc:
      "NORDI MULTISERVICE spesialiserer seg på avansert lasernrengjøring av metallskip og maritim utstyr i Norge. Med over 15 års erfaring leverer vi høyeste kvalitet på rengjøring av skrog, som reduserer vedlikehold og forlenget skipslevetiden.",
    why_us: "Hvorfor velge oss?",
    efficiency: "Effektivitet",
    efficiency_desc: "Rask og presis lasernrengjøring uten kjemikalier",
    eco_friendly: "Miljøvennlig",
    eco_friendly_desc: "100% sikker og null kjemisk avfall",
    professional: "Profesjonelt",
    professional_desc: "Sertifisert og erfaren team",

    // Services
    services_title: "Våre tjenester",
    service_1_title: "Skipsskrog Rengjøring",
    service_1_desc:
      "Dypt rengjøring av marineskrog ved hjelp av laserteknologi. Fjerner rust, alger og biologisk begroeing effektivt.",
    service_1_price: "Fra 50 000 NOK",

    service_2_title: "Metalloverflate Rengjøring",
    service_2_desc:
      "Rengjøring av metallkonstruksjoner, stål og andre maritime strukturer.",
    service_2_price: "Fra 25 000 NOK",

    service_3_title: "Vedlikehold og Inspeksjon",
    service_3_desc:
      "Regelmessig inspeksjon og vedlikehold av marineutstyr for optimal ytelse.",
    service_3_price: "Fra 15 000 NOK",

    service_4_title: "Spesialisert Rengjøring",
    service_4_desc: "Tilpassede løsninger for unike maritime utfordringer.",
    service_4_price: "Etter anbudsbetingelser",

    order_button: "Bestill på WhatsApp",

    // Reviews
    reviews_title: "Kundetilfredsstillelse",
    before: "Før",
    after: "Etter",

    review_1_title: "Skipsskrog Rengjøring - Cargo Vessel",
    review_1_desc:
      "Vellykket rengjøring av skipsskrog som hadde omfattende rustdannelse og biologisk begroeing. Resultatet overgikk kundens forventninger.",

    review_2_title: "Metallstruktur Renovering - Oljeplattform",
    review_2_desc:
      "Profesjonell lasernrengjøring av metalldeler på oljeplattform. Arbeidet fullført uten nedetid.",

    // Footer
    company_name: "NORDI MULTISERVICE",
    address: "Adresse",
    phone: "Telefon",
    email: "E-post",
    follow_us: "Følg oss",
    location: "Vår lokasjon",
    hours: "Åpningstider",
    hours_text: "24/7 Tilgjengelig for akutte oppdrag",

    // Contact
    contact_title: "Kontakt oss",
    contact_desc:
      "Trenger du laser rengjøring? Kontakt oss i dag for en gratis konsultasjon.",
    your_name: "Ditt navn",
    your_email: "Din e-post",
    your_message: "Ditt budskap",
    send_button: "Send",

    // Navigation
    home: "Hjem",
    back_to_home: "Tilbake til Hjem",
  },
  en: {
    // Header
    services: "Services",
    reviews: "Reviews",
    contact: "Contact",
    language: "Language",

    // Home
    welcome: "Welcome to NORDI MULTISERVICE",
    hero_subtitle: "Professional Laser Cleaning of Ship Hulls",
    about_title: "About Us",
    about_desc:
      "NORDI MULTISERVICE specializes in advanced laser cleaning of metal ships and maritime equipment in Norway. With over 15 years of experience, we deliver the highest quality hull cleaning that reduces maintenance and extends ship lifespan.",
    why_us: "Why Choose Us?",
    efficiency: "Efficiency",
    efficiency_desc: "Fast and precise laser cleaning without chemicals",
    eco_friendly: "Eco-Friendly",
    eco_friendly_desc: "100% safe and zero chemical waste",
    professional: "Professional",
    professional_desc: "Certified and experienced team",

    // Services
    services_title: "Our Services",
    service_1_title: "Ship Hull Cleaning",
    service_1_desc:
      "Deep cleaning of marine hulls using laser technology. Effectively removes rust, algae, and biological fouling.",
    service_1_price: "From 50,000 NOK",

    service_2_title: "Metal Surface Cleaning",
    service_2_desc:
      "Cleaning of metal structures, steel, and other maritime structures.",
    service_2_price: "From 25,000 NOK",

    service_3_title: "Maintenance and Inspection",
    service_3_desc:
      "Regular inspection and maintenance of marine equipment for optimal performance.",
    service_3_price: "From 15,000 NOK",

    service_4_title: "Specialized Cleaning",
    service_4_desc: "Custom solutions for unique maritime challenges.",
    service_4_price: "Upon quotation",

    order_button: "Order on WhatsApp",

    // Reviews
    reviews_title: "Customer Satisfaction",
    before: "Before",
    after: "After",

    review_1_title: "Ship Hull Cleaning - Cargo Vessel",
    review_1_desc:
      "Successful hull cleaning of a ship with extensive rust formation and biological fouling. The result exceeded customer expectations.",

    review_2_title: "Metal Structure Renovation - Oil Platform",
    review_2_desc:
      "Professional laser cleaning of metal parts on oil platform. Work completed without downtime.",

    // Footer
    company_name: "NORDI MULTISERVICE",
    address: "Address",
    phone: "Phone",
    email: "Email",
    follow_us: "Follow Us",
    location: "Our Location",
    hours: "Opening Hours",
    hours_text: "24/7 Available for emergency jobs",

    // Contact
    contact_title: "Contact Us",
    contact_desc:
      "Need laser cleaning services? Contact us today for a free consultation.",
    your_name: "Your Name",
    your_email: "Your Email",
    your_message: "Your Message",
    send_button: "Send",

    // Navigation
    home: "Home",
    back_to_home: "Back to Home",
  },
};

// Функція для отримання перекладу
function getTranslation(key, lang = "no") {
  return translations[lang]?.[key] || key;
}

// Функція для локалізації сторінки
function translatePage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("selectedLanguage", lang);

  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    element.textContent = getTranslation(key, lang);
  });
}

// Отримати збережену мову
function getSavedLanguage() {
  return localStorage.getItem("selectedLanguage") || "no";
}
