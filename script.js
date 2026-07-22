const text = "Love you \u2764\uFE0F"; // Love you ❤️
const colors = ["", "rose", "gold"]; // "" = default ember
const MAX_ON_SCREEN = 26; // how many can live on screen at once before oldest fades

const activeWords = [];

function spawnWord(){
  const layer = document.getElementById("popLayer");
  const span = document.createElement("span");

  const colorClass = colors[Math.floor(Math.random() * colors.length)];
  span.className = "pop-word" + (colorClass ? " " + colorClass : "");
  span.textContent = text;

  const x = 6 + Math.random() * 88; // % from left
  const y = 6 + Math.random() * 88; // % from top
  span.style.left = x + "vw";
  span.style.top = y + "vh";

  const size = 1 + Math.random() * 1.5; // rem
  span.style.fontSize = size + "rem";

  layer.appendChild(span);
  activeWords.push(span);

  // Once the screen is comfortably full, retire the oldest word gently
  // before adding a new one, so it never feels cluttered or abrupt
  if(activeWords.length > MAX_ON_SCREEN){
    const oldest = activeWords.shift();
    oldest.classList.add("leaving");
    setTimeout(() => oldest.remove(), 2600);
  }
}

function startPopping(){
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if(reduced){
    for(let i = 0; i < 14; i++){
      setTimeout(spawnWord, i * 400);
    }
    return;
  }

  // Slow, unhurried pace — a new word settles in roughly every second
  setInterval(spawnWord, 950);
}

document.addEventListener("DOMContentLoaded", startPopping);
