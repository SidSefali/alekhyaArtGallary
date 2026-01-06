const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");
let currentIndex = 0;
let interval;
let isHovered = false;

/* Create dots */
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.onclick = () => showSlide(i);
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
  currentIndex = index;
}

function startSlider() {
  interval = setInterval(() => {
    if (!isHovered) {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }
  }, 3000);
}

const slider = document.getElementById("slider");
slider.addEventListener("mouseenter", () => isHovered = true);
slider.addEventListener("mouseleave", () => isHovered = false);

startSlider();

function initAuctionCountdowns() {
    const countdowns = document.querySelectorAll(".countdown");
  
    setInterval(() => {
      countdowns.forEach(cd => {
        const endTime = new Date(cd.dataset.endtime).getTime();
        const now = new Date().getTime();
        const diff = endTime - now;
  
        if (diff <= 0) {
          cd.innerHTML = "<b>Auction Started</b>";
          return;
        }
  
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
  
        cd.querySelector(".days").innerText = days;
        cd.querySelector(".hours").innerText = hours;
        cd.querySelector(".minutes").innerText = minutes;
        cd.querySelector(".seconds").innerText = seconds;
      });
    }, 1000);
  }
  
  initAuctionCountdowns();
  