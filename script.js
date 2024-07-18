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
document.addEventListener("DOMContentLoaded", () => {
  const skillsContent1 = document.getElementById("skills-content-1");
  const skillsContent2 = document.getElementById("skills-content-2");
  const icons = [
    { class: "fab fa-html5", title: "HTML5", color: "#E44D26" },
    { class: "fab fa-css3-alt", title: "CSS3", color: "#264DE4" },
    { class: "fab fa-js", title: "JavaScript", color: "#F7DF1E" },
    { class: "fab fa-python", title: "Python", color: "#3776AB" },
    { class: "fab fa-java", title: "Java", color: "#007396" },
    { class: "fab fa-c", title: "C", color: "#A8B9CC" },
    { class: "fab fa-cuttlefish", title: "C++", color: "#00599C" },
    { class: "fab fa-php", title: "PHP", color: "#777BB4" },
    { class: "fab fa-laravel", title: "Laravel", color: "#FF2D20" },
    { class: "fab fa-bootstrap", title: "Bootstrap", color: "#563D7C" },
    { class: "fab fa-git-alt", title: "Git", color: "#F05032" },
    { class: "fab fa-github", title: "GitHub", color: "#181717" },
  ];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generateIcons = (iconArray) => {
    return iconArray
      .map(
        (icon) =>
          `<i class="${icon.class}" title="${icon.title}" style="color: ${icon.color};"></i>`
      )
      .join("");
  };

  const shuffledIcons1 = shuffleArray([...icons]);
  const shuffledIcons2 = shuffleArray([...icons]);

  skillsContent1.innerHTML = generateIcons(shuffledIcons1);
  skillsContent2.innerHTML = generateIcons(shuffledIcons2);

  for (let i = 0; i < 2; i++) {
    skillsContent1.innerHTML += generateIcons(shuffleArray([...icons]));
    skillsContent2.innerHTML += generateIcons(shuffleArray([...icons]));
  }
});

////////////////////////////////////////////
// Section 4: Gallery Popup
////////////////////////////////////////////
const galleryImages = document.querySelectorAll(".gallery-box img");

galleryImages.forEach((img) => {
  img.onclick = function () {
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
