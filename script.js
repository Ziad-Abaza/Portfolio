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
        document.addEventListener('DOMContentLoaded', function () {
            const skills = document.querySelectorAll('.skill');

            skills.forEach(skill => {
                const percentage = skill.getAttribute('data-percentage');
                const progress = skill.querySelector('.progress');
                progress.style.width = `${percentage}%`;
            });
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

