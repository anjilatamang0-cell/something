const text = "Love you \u2764\uFE0F"; // Love you ❤️
const colors = ["", "rose", "gold"]; // "" = default ember
const MAX_WORDS = 40; // stop spawning once the screen is nicely filled

let count = 0;

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

  // Slightly randomize the fade-in speed so they don't all feel synced
  span.style.animationDuration = (2.5 + Math.random() * 1.5) + "s";

  layer.appendChild(span);
  count++;

  if(count >= MAX_WORDS){
    clearInterval(spawnTimer);
  }
}

let spawnTimer;

function startPopping(){
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if(reduced){
    for(let i = 0; i < MAX_WORDS; i++){
      setTimeout(spawnWord, i * 150);
    }
    return;
  }

  spawnTimer = setInterval(spawnWord, 800);
}

document.addEventListener("DOMContentLoaded", startPopping);
