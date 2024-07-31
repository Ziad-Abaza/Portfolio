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

setInterval(showNextSlide, 15000);

showSlide();
updateThumbnails();

////////////////////////////////////////////
// Section 3: Skills Content
////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const skills = document.querySelectorAll('.skill');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skill = entry.target;
        const percentage = skill.getAttribute('data-percentage');
        const progress = skill.querySelector('.progress');
        
        setTimeout(() => {
          progress.style.width = `${percentage}%`;
        }, 500);

        observer.unobserve(skill);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  skills.forEach(skill => {
    observer.observe(skill);
  });
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

