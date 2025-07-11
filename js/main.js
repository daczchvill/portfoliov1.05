// FUNCTIONALITY FOR MODAL IMAGE SLIDER AND BIG IMAGE ON SCREEN
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-imagen");
  const modalImg = document.getElementById("imagen-modal");
  const cerrar = document.querySelector(".cerrar-modal");
  const nextBtn = document.querySelector(".nav-btn.derecha");
  const prevBtn = document.querySelector(".nav-btn.izquierda");

  const allImgs = Array.from(document.querySelectorAll(".gallery-container img"));
  let current = 0;

function openModal(index) {
    if (!allImgs[index]) return;
    console.log("Opening modal for image:", allImgs[index].src); // Agrega esta línea
    modal.style.display = "flex";
    modalImg.src = allImgs[index].src;
    current = index;
    document.body.style.overflow = "hidden";
}


  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function navigate(offset) {
    current = (current + offset + allImgs.length) % allImgs.length;
    modalImg.src = allImgs[current].src;
  }

  allImgs.forEach((img, idx) => {
    img.addEventListener("click", () => openModal(idx));
  });

  cerrar.addEventListener("click", closeModal);
  nextBtn.addEventListener("click", () => navigate(1));
  prevBtn.addEventListener("click", () => navigate(-1));

  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    }
  });
});
// END FUNCTIONALITY FOR MODAL IMAGE SLIDER AND BIG IMAGE ON SCREEN


//TRANSLATIONS FUNCTIONALITY
let translations = {};

fetch('translations.json')
  .then(response => {
    if (!response.ok) throw new Error("No se pudo cargar translations.json");
    return response.json();
  })
  .then(data => {
    console.log("✅ Traducciones cargadas correctamente");
    translations = data;
// language by default in en, you can also change the last word to en eller sv
    const storedLang = localStorage.getItem('language') || 'en';
    setLanguage(storedLang);
  })
  .catch(error => {
    console.error("❌ Error al cargar JSON:", error);
  });

let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
  console.log("🔤 Cambiando idioma a:", lang);
  if (!translations[lang]) return;

  currentLanguage = lang; // ✅ guardamos el idioma actual aquí
  const elements = document.querySelectorAll('[data-i18n-key]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n-key');
    const translation = translations[lang][key];
    if (translation) el.innerHTML = translation;
  });

  localStorage.setItem('language', lang);
}




// NEW NAV-MENU FUNCTIONALITY
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#nav-menu ul li a");
const nav = document.getElementById("nav-menu"); // Suponiendo que la barra nav tiene este id

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
    // nnerHeight / 3 divide la pantalla en tres de arriba a abajo para detectar 
    // el icono activo,  en momento especifico cuando el borde top de la seccion 
    // toca esta division especificada tambien puedes cambiar por /2 /4 ..
    if (pageYOffset >= sectionTop - window.innerHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  // Cambiar opacidad y fondo de la barra según scroll
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Scroll hacia abajo: la barra se hace transparente
    nav.classList.add("nav-transparent");
  } else {
    // Scroll hacia arriba: la barra vuelve a fondo sólido
    nav.classList.remove("nav-transparent");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});


// overlay cerrar y abrir 
const navMenu = document.getElementById('nav-menu');
const overlay = document.getElementById('overlay');

// Solo ejecutar apertura/cierre por clic en móviles
function isMobile() {
    return window.innerWidth <= 900; // ajusta si usas otro breakpoint
}

navMenu.addEventListener('click', () => {
    if (isMobile()) {
        navMenu.classList.toggle('nav-open');
    }
});

overlay.addEventListener('click', () => {
    if (isMobile()) {
        navMenu.classList.remove('nav-open');
    }
});

//END NAV-MENU FUNCTIONALITY


// HEADER IMAGE SCROLL
// Seleccionamos cualquier elemento dentro de .header-image-scroll (img, video, etc.)
const headerMedia = document.querySelector('.header-image-scroll').children[0];

// Escuchamos el evento de scroll en la ventana
window.addEventListener('scroll', () => {
  // Obtenemos la cantidad de desplazamiento vertical
  const scrollPosition = window.scrollY;

  // Ajustamos la velocidad del efecto parallax
  headerMedia.style.transform = `translateY(${-scrollPosition * 3}px)`;
});
// END HEADER IMAGE SCROLL




//SLIDER FUNCTIONALITY
let nextButtons = document.querySelectorAll('.next');
let prevButtons = document.querySelectorAll('.prev');
let slider = document.querySelector('.slider');

nextButtons.forEach(next => {
  next.addEventListener('click', function () {
    let slides = document.querySelectorAll('.slides');
    slider.appendChild(slides[0]);
  });
});

prevButtons.forEach(prev => {
  prev.addEventListener('click', function () {
    let slides = document.querySelectorAll('.slides');
    slider.prepend(slides[slides.length - 1]);
  });
});
//END SLIDER FUNCTIONALITY


//EFFECT HOVER ON THUMBAILS
// EFFECT HOVER ON THUMBNAILS
const containers = document.querySelectorAll('.art-concepts > div');
containers.forEach((container, index) => {
  const img = container.querySelector('img');
  img.addEventListener('mouseover', (event) => {
    // Limpiar clases
    containers.forEach(c => {
      const cImg = c.querySelector('img');
      cImg.classList.remove('hovered', 'prev1', 'prev2', 'next1', 'next2');
    });

    // Añadir hovered
    img.classList.add('hovered');

    // Prev y next 1 y 2
    if (index > 0) {
      const prev1 = containers[index - 1].querySelector('img');
      prev1.classList.add('prev1');
    }
    if (index > 1) {
      const prev2 = containers[index - 2].querySelector('img');
      prev2.classList.add('prev2');
    }
    if (index < containers.length - 1) {
      const next1 = containers[index + 1].querySelector('img');
      next1.classList.add('next1');
    }
    if (index < containers.length - 2) {
      const next2 = containers[index + 2].querySelector('img');
      next2.classList.add('next2');
    }
  });

  img.addEventListener('mouseout', (event) => {
    containers.forEach(c => {
      const cImg = c.querySelector('img');
      cImg.classList.remove('hovered', 'prev1', 'prev2', 'next1', 'next2');
    });
  });
});

//END EFFETS HOVER ON THUMBAILS

//centrar el primer slide del slider en film al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.film-sliders');
  if (slider) {
    const firstSlide = slider.querySelector('.film-slide');
    if (firstSlide) {
      slider.scrollTo({
        left: firstSlide.offsetLeft - (slider.offsetWidth - firstSlide.offsetWidth) / 2,
        behavior: 'instant' // o 'smooth'
      });
    }
  }
});
//terminar de centrar el primer slide del slider en film al cargar la página




AOS.init();

function nodisponible() {
  alert("The document is not yet available");
}

function ShopNoAvailable() {
  alert(translations[currentLanguage]['shop_alert_closed']);
}





// Toggle menú de temas
function ActivateTheme() {
  const selector = document.getElementById("cont-colors");
  const button = document.getElementById("ThemeButton");

  // Alterna la visibilidad del panel
  selector.classList.toggle("active");
  button.classList.toggle("active");

  // Si se abrió, agrega evento para cerrar al hacer clic fuera
  if (selector.classList.contains("active")) {
    setTimeout(() => { // Delay para evitar conflicto con el mismo clic que lo abre
      document.addEventListener("click", outsideClickListener);
    }, 0);
  } else {
    document.removeEventListener("click", outsideClickListener);
  }

  function outsideClickListener(e) {
    const isClickInside = selector.contains(e.target) || button.contains(e.target);

    if (!isClickInside) {
      selector.classList.remove("active");
      button.classList.remove("active");
      document.removeEventListener("click", outsideClickListener);
    }
  }
}


// Aplicar un tema base + color
function aplicarTemaCombinado(base, color = "") {
  const body = document.getElementById("body");

  // Limpiar clases anteriores
  body.className = '';
  body.classList.add(base);
  if (color) body.classList.add(color);

  // Guardar en localStorage
  localStorage.setItem("tema-base", base);
  localStorage.setItem("tema-color", color);

  // Marcar el botón activo
  const botones = document.querySelectorAll('#cont-colors button');
  botones.forEach(b => {
    if (color && b.id === color) {
      b.classList.add('activo');
    } else {
      b.classList.remove('activo');
    }
  });
}
window.addEventListener("DOMContentLoaded", () => {
  const base = localStorage.getItem("tema-base") || "dia";
  const color = localStorage.getItem("tema-color") || "";
  console.log("Aplicando tema base:", base, "color:", color); // para debug
  aplicarTemaCombinado(base, color);
});

// Al cargar la página, aplicar el tema guardado
window.addEventListener("DOMContentLoaded", () => {
  const base = localStorage.getItem("tema-base") || "dia";
  const color = localStorage.getItem("tema-color") || "";
  aplicarTemaCombinado(base, color);
});

// Funciones de cada tema
function LightTheme() {
  aplicarTemaCombinado("dia", "");
  document.getElementById("sol").classList.add('activo');
  document.getElementById("luna").classList.remove('activo');
}

function DarkTheme() {
  aplicarTemaCombinado("noche", "");
  document.getElementById("luna").classList.add('activo');
  document.getElementById("sol").classList.remove('activo');
}

function PurpleTheme() {
  const currentColor = localStorage.getItem("tema-color") || "";
  const base = localStorage.getItem("tema-base") || "dia";
  if (currentColor === "morado") {
    aplicarTemaCombinado(base, "");
  } else {
    aplicarTemaCombinado(base, "morado");
  }
}

function GreenTheme() {
  const currentColor = localStorage.getItem("tema-color") || "";
  const base = localStorage.getItem("tema-base") || "dia";
  if (currentColor === "verde") {
    aplicarTemaCombinado(base, "");
  } else {
    aplicarTemaCombinado(base, "verde");
  }
}

function PinkTheme() {
  const currentColor = localStorage.getItem("tema-color") || "";
  const base = localStorage.getItem("tema-base") || "dia";
  if (currentColor === "rosa") {
    aplicarTemaCombinado(base, "");
  } else {
    aplicarTemaCombinado(base, "rosa");
  }
}

function BlueTheme() {
  const currentColor = localStorage.getItem("tema-color") || "";
  const base = localStorage.getItem("tema-base") || "dia";
  if (currentColor === "azul") {
    aplicarTemaCombinado(base, "");
  } else {
    aplicarTemaCombinado(base, "azul");
  }
}





