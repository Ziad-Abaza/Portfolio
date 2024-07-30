////////////////////////////////////////////
// Section 1: Menu Toggle
////////////////////////////////////////////
function toggleMenu() {
  var menuList = document.querySelector(".quick-access-links ul");
  menuList.classList.toggle("active");

  var burgerBtn = document.querySelector(".burger-menu-btn");
  burgerBtn.classList.toggle("active");
}

////////////////////////////////////////////
// Section 2: Slide Show
////////////////////////////////////////////
var slideIndex = 0;
var slides = document.getElementsByClassName("slide-show");
var thumbnails = document.getElementsByClassName("thumbnail");

function showSlide() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}

function updateThumbnails() {
  for (var i = 0; i < thumbnails.length; i++) {
    if (i === slideIndex) {
      thumbnails[i].style.opacity = "1";
      thumbnails[i].style.border = "var(--border)";
      thumbnails[i].style.width = "60px";
    } else {
      thumbnails[i].style.opacity = "0.5";
      thumbnails[i].style.border = "none";
      thumbnails[i].style.width = "auto";
    }
  }
}

function showNextSlide() {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showSlide();
  updateThumbnails();
}

function showPreviousSlide() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  showSlide();
  updateThumbnails();
}

function currentSlide(index) {
  slideIndex = index - 1;
  showSlide();
  updateThumbnails();
}

setInterval(showNextSlide, 7000);

showSlide();
updateThumbnails();

////////////////////////////////////////////
// Section 3: Skills Content
////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const skillProgressBars = document.querySelectorAll(".progress-bar");

  function animateProgressBar() {
    skillProgressBars.forEach((progressBar) => {
      const progress = progressBar.getAttribute("data-progress");
      progressBar.style.width = progress;
    });
  }

  function checkScroll() {
    const skillsSection = document.querySelector(".skills");
    const skillsSectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (skillsSectionTop < windowHeight / 1.5) {
      animateProgressBar();
      window.removeEventListener("scroll", checkScroll);
    }
  }

  window.addEventListener("scroll", checkScroll);
});


////////////////////////////////////////////
// Section 4: Gallery Popup
////////////////////////////////////////////
const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item) => {
  item.onclick = function () {
    const img = this.querySelector("img");
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    const popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");

    const popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);

    document.body.appendChild(overlay);
    document.body.appendChild(popupBox);

    if (img.alt !== null) {
      const imgHeading = document.createElement("h3");
      const imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }

    const closeButton = document.createElement("span");
    closeButton.className = "popup-close";
    closeButton.innerHTML = "&times;";
    popupBox.appendChild(closeButton);

    closeButton.onclick = function () {
      document.body.removeChild(overlay);
      document.body.removeChild(popupBox);
    };
  };
});

////////////////////////////////////////////
// Section 5: Product Filter
////////////////////////////////////////////
const allBtn = document.getElementById("all");
const iotBtn = document.getElementById("iot");
const webBtn = document.getElementById("web");
// const appBtn = document.getElementById("app");

const products = document.querySelectorAll(".products-box img");

if (allBtn !== null) {
  allBtn.addEventListener("click", () => filterProducts("all"));
  iotBtn.addEventListener("click", () => filterProducts("iot"));
  webBtn.addEventListener("click", () => filterProducts("web"));
  // appBtn.addEventListener("click", () => filterProducts("app"));
}

function filterProducts(category) {
  products.forEach((product) => {
    const dataCategory = product.getAttribute("data-category");
    if (category === "all" || dataCategory === category) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

////////////////////////////////////////////
// Animations
////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = element.getAttribute("data-animation-delay");
          element.style.setProperty("--animation-delay", delay);
          element.style.animationPlayState = "running"; 
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.1, 
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
});

