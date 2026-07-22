const text = "Love you \u2764\uFE0F"; // Love you ❤️
const colors = ["", "rose", "gold"]; // "" = default ember

function spawnWord(){
  const layer = document.getElementById("popLayer");
  const span = document.createElement("span");

  const colorClass = colors[Math.floor(Math.random() * colors.length)];
  span.className = "pop-word" + (colorClass ? " " + colorClass : "");
  span.textContent = text;

  // Random position across the whole screen, each time a fresh spot
  const x = 5 + Math.random() * 90; // % from left
  const y = 5 + Math.random() * 90; // % from top
  span.style.left = x + "vw";
  span.style.top = y + "vh";

  // Random size for depth/variety
  const size = 1 + Math.random() * 1.6; // rem
  span.style.fontSize = size + "rem";

  // One pop cycle only — appears, holds, then disappears (no slow fade loop)
  const duration = 2.2 + Math.random() * 1.3;
  span.style.animationDuration = duration + "s";

  layer.appendChild(span);

  // Remove from DOM once its single pop cycle finishes
  setTimeout(() => span.remove(), duration * 1000);
}

function startPopping(){
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if(reduced){
    for(let i = 0; i < 10; i++){
      setTimeout(spawnWord, i * 300);
    }
    return;
  }

  // Continuously spawn new ones in new places, staggered
  setInterval(spawnWord, 260);
}

document.addEventListener("DOMContentLoaded", startPopping);
