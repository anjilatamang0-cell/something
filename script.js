const text = "Love you \u2764\uFE0F"; // Love you ❤️
const colors = ["", "rose", "gold"]; // "" = default ember
const MAX_WORDS = 55; // a few more before it stops
const WORDS_PER_BATCH = 6; // more per cluster

let count = 0;
let spawnTimer;

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

  // Fade-in speed stays exactly as before — just the spawn rate changes
  span.style.animationDuration = (2.5 + Math.random() * 1.5) + "s";
  span.style.animationDelay = (Math.random() * 0.6) + "s";

  layer.appendChild(span);
  count++;
}

function spawnBatch(){
  for(let i = 0; i < WORDS_PER_BATCH; i++){
    spawnWord();
  }

  if(count >= MAX_WORDS){
    clearInterval(spawnTimer);
  }
}

function startPopping(){
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if(reduced){
    spawnBatch();
    return;
  }

  spawnBatch(); // first cluster shows up right away
  spawnTimer = setInterval(spawnBatch, 900);
}
document.querySelectorAll('.pop-word').length
document.addEventListener("DOMContentLoaded", startPopping);
