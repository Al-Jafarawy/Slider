// Inspirational quotes with emotional depth
const quotes = [
  { text: "The quieter you become, the more you can hear.", author: "Rumi" },
  { text: "Do what is right, not what is easy.", author: "Unknown" },
  { text: "Your only limit is your mind.", author: "Unknown" },
  {
    text: "Patience is power. Patience is not an absence of action; rather it is timing. It waits on the right time to act, for the right principles and in the right way.",
    author: "Fulton J. Sheen",
  },
  {
    text: "Every day is a new beginning. Take a deep breath and start again.",
    author: "Unknown",
  },
  { text: "Dreams don't work unless you do.", author: "John C. Maxwell" },
  {
    text: "Be kind, for everyone you meet is fighting a hard battle.",
    author: "Ian Maclaren",
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
  },
  {
    text: "What you think, you become. What you feel, you attract. What you imagine, you create.",
    author: "Buddha",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
];

// Duplicate quotes to match 30 images
const totalImages = 30;
const extendedQuotes = [];
for (let i = 0; i < totalImages; i++) {
  extendedQuotes.push(quotes[i % quotes.length]);
}

// DOM elements
const backgroundImages = document.querySelectorAll(".background-images img");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressDots = document.getElementById("progress-dots");

// State
let currentQuote = 0;
const totalQuotes = extendedQuotes.length;

// Initialize progress dots
function initializeProgressDots() {
  progressDots.innerHTML = "";
  for (let i = 0; i < totalQuotes; i++) {
    const dot = document.createElement("div");
    dot.className = "progress-dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToQuote(i));
    progressDots.appendChild(dot);
  }
}

// Clear active states
function clearActive() {
  backgroundImages.forEach((img) => img.classList.remove("active"));
  document
    .querySelectorAll(".progress-dot")
    .forEach((dot) => dot.classList.remove("active"));
}

// Update display with smooth transitions
function updateDisplay() {
  clearActive();

  // Update background image
  backgroundImages[currentQuote].classList.add("active");

  // Animate quote content
  quoteText.style.transform = "translateY(20px)";
  quoteText.style.opacity = "0";
  quoteAuthor.style.transform = "translateY(10px)";
  quoteAuthor.style.opacity = "0";

  setTimeout(() => {
    quoteText.textContent = extendedQuotes[currentQuote].text;
    quoteAuthor.textContent = extendedQuotes[currentQuote].author;

    quoteText.style.transform = "translateY(0)";
    quoteText.style.opacity = "1";
    quoteAuthor.style.transform = "translateY(0)";
    quoteAuthor.style.opacity = "1";
  }, 200);

  // Update progress dots
  document
    .querySelectorAll(".progress-dot")
    [currentQuote].classList.add("active");
}

// Navigation functions
function goToQuote(index) {
  currentQuote = index;
  updateDisplay();
}

function nextQuote() {
  currentQuote = (currentQuote + 1) % totalQuotes;
  updateDisplay();
}

function prevQuote() {
  currentQuote = (currentQuote - 1 + totalQuotes) % totalQuotes;
  updateDisplay();
}

// Event listeners
prevButton.addEventListener("click", prevQuote);
nextButton.addEventListener("click", nextQuote);

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevQuote();
  if (e.key === "ArrowRight") nextQuote();
  if (e.key === " ") {
    e.preventDefault();
    nextQuote();
  }
});

// Touch gesture support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) nextQuote();
    else prevQuote();
  }
}

// Auto-advance
let autoAdvanceInterval;
function startAutoAdvance() {
  autoAdvanceInterval = setInterval(nextQuote, 6000);
}
function stopAutoAdvance() {
  clearInterval(autoAdvanceInterval);
}

// Pause auto-advance on hover
document
  .querySelector(".quotes-container")
  .addEventListener("mouseenter", stopAutoAdvance);
document
  .querySelector(".quotes-container")
  .addEventListener("mouseleave", startAutoAdvance);

// Initialize
initializeProgressDots();
updateDisplay();
startAutoAdvance();
