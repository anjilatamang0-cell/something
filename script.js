const text = "Love you";
const colors = ["", "gold", "blush"]; // "" = default rose

function spawnWord(){
  const layer = document.getElementById("popLayer");
  const span = document.createElement("span");

  const colorClass = colors[Math.floor(Math.random() * colors.length)];
  span.className = "pop-word" + (colorClass ? " " + colorClass : "");
  span.textContent = text;

  // Random position across the whole screen
  const x = 5 + Math.random() * 90; // % from left
  const y = 5 + Math.random() * 90; // % from top
  span.style.left = x + "vw";
  span.style.top = y + "vh";

  // Random size for depth/variety
  const size = 1 + Math.random() * 1.8; // rem
  span.style.fontSize = size + "rem";

  // Slow pop: 3.5–6s duration, so it eases in and clears out gently
  const duration = 3.5 + Math.random() * 2.5;
  span.style.animationDuration = duration + "s";

  layer.appendChild(span);

  // Remove after a couple of pop cycles so the DOM doesn't grow forever
  setTimeout(() => span.remove(), duration * 2 * 1000);
}

function startPopping(){
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Seed the screen with some words right away
  const seedCount = reduced ? 8 : 18;
  for(let i = 0; i < seedCount; i++){
    setTimeout(spawnWord, i * 150);
  }

  if(reduced) return;

  // Keep spawning new ones continuously
  setInterval(spawnWord, 350);
}

document.addEventListener("DOMContentLoaded", startPopping);
