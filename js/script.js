// main.js

// 1. Splash Screen Functionality
function startSplashScreen() {
  const typingText = document.querySelector(".typing-text");
  const typingText2 = document.querySelector(".typing-text-2");

  if (!typingText || !typingText2) {
    console.error("Typing text elements not found!");
    return;
  }

  const text = "Welcome to my Portfolio";
  const text2 = "I am a software developer";

  let index = 0;
  let index2 = 0;

  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    } else if (index2 < text2.length) {
      typingText2.textContent += text2.charAt(index2);
      index2++;
      setTimeout(type, 100);
    }
  }

  type();

  setTimeout(() => {
    const splashScreen = document.querySelector(".splash-screen");
    if (splashScreen) {
      splashScreen.style.opacity = "0";
      splashScreen.style.visibility = "hidden";
    }
  }, 6000);
}

// 2. Navigation Functionality
function setupNavigation() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length === 0 || navLinks.length === 0) {
    console.error("Sections or navigation links not found!");
    return;
  }

  function changeActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove("active"));
    if (navLinks[index]) {
      navLinks[index].classList.add("active");
    }
  }

  window.addEventListener("scroll", changeActiveLink);

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });

        navLinks.forEach((link) => link.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  changeActiveLink();
}

// 3. Portfolio Tabs Functionality
function setupPortfolioTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });
}

// 4. Full Screen Image Functionality
function openFullScreen(imageSrc) {
  const fullScreenImage = document.createElement("div");
  fullScreenImage.style.position = "fixed";
  fullScreenImage.style.top = "0";
  fullScreenImage.style.left = "0";
  fullScreenImage.style.width = "100%";
  fullScreenImage.style.height = "100%";
  fullScreenImage.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  fullScreenImage.style.display = "flex";
  fullScreenImage.style.justifyContent = "center";
  fullScreenImage.style.alignItems = "center";
  fullScreenImage.style.zIndex = "1000";

  const img = document.createElement("img");
  img.src = imageSrc;
  img.style.maxWidth = "90%";
  img.style.maxHeight = "90%";
  img.style.borderRadius = "10px";

  fullScreenImage.appendChild(img);

  fullScreenImage.addEventListener("click", () => {
    document.body.removeChild(fullScreenImage);
  });

  document.body.appendChild(fullScreenImage);
}

// 5. Show Details Functionality
function showDetails(details) {
  const modal = document.getElementById("detailsModal");
  const modalText = document.getElementById("modalText");

  modalText.innerHTML = details;
  modal.style.display = "flex";

  const closeModal = document.querySelector(".close-modal");
  closeModal.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

// 6. Back to Top Button Functionality
function setupBackToTopButton() {
  const backToTopButton = document.getElementById("back-to-top");

  if (!backToTopButton) {
    console.error("Back to top button not found!");
    return;
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  // Scroll to Top Function
  backToTopButton.addEventListener("click", () => {
    scrollToTop(1000);
  });

  function scrollToTop(duration) {
    const start = window.scrollY; 
    const startTime = performance.now();

    function scrollStep(timestamp) {
      const currentTime = timestamp - startTime; 
      const progress = Math.min(currentTime / duration, 1); 

      window.scrollTo(0, start * (1 - progress));

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  }
}

// 7. Filter Projects Functionality
function setupProjectFilter() {
    const filterButtons = document.querySelectorAll(".filter-button");
    const projectCards = document.querySelectorAll(".card[data-category]");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            // Remove active class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filter === "all" || category === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");

  hamburger.addEventListener("click", function () {
    navList.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".nav") && !event.target.closest(".hamburger")) {
      navList.classList.remove("active");
    }
  });
});

// Initialize All Functions
document.addEventListener("DOMContentLoaded", function () {
  startSplashScreen();
  setupNavigation();
  setupPortfolioTabs();
  setupBackToTopButton();
  setupProjectFilter();
});
