const lastSeenDate = new Date("2026-05-01T00:00:00");

const reasons = [
  "Your terrible puns that somehow still make me laugh",
  "Good morning texts that beat my own alarm",
  "Someone to complain about my day to who actually listens",
  "Your hugs. I really, really miss your hugs.",
  "Doing absolutely nothing together and it still being my favorite thing",
  "You. Just you. All of you."
];

const flirtyLines = [
  "Fair warning: when I finally see you, I'm not letting go for at least a week.",
  "I've been rehearsing what I'll say when I see you. Spoiler: it's mostly just going to be kissing.",
  "You're lucky you're cute, because missing you this much should be illegal.",
  "Dare you to video call me looking that good. Go on, I'll wait.",
  "Every day apart is a day closer to me stealing your hoodies in person instead of just missing them.",
  "If missing you burned calories, I'd have a six-pack by now.",
  "Consider this your warning: incoming attack of affection upon arrival."
];

function makeStars(count = 60){
  const layer = document.getElementById("stars");
  for(let i = 0; i < count; i++){
    const star = document.createElement("div");
    star.className = "star";
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    star.style.animationDelay = (Math.random() * 3).toFixed(2) + "s";
    layer.appendChild(star);
  }
}

function spawnHeart(){
  const layer = document.getElementById("heartsLayer");
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.innerHTML = "&#10084;";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
  heart.style.fontSize = (12 + Math.random() * 16) + "px";
  const duration = 8 + Math.random() * 6;
  heart.style.animationDuration = duration + "s";
  layer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

function startHearts(){
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced) return;
  setInterval(spawnHeart, 1400);
}

const equivalencyTemplates = [
  n => `That's roughly ${n.coffees} cups of coffee I've wished you were across the table for.`,
  n => `About ${n.songs} songs I've heard and thought "he'd love this."`,
  n => `Somewhere around ${n.hugs} hugs I'm owed the second I see you.`
];

function updateCounter(){
  const now = new Date();
  let diff = Math.max(0, now - lastSeenDate);

  const days = Math.floor(diff / (1000*60*60*24));
  diff -= days * (1000*60*60*24);
  const hours = Math.floor(diff / (1000*60*60));
  diff -= hours * (1000*60*60);
  const minutes = Math.floor(diff / (1000*60));
  diff -= minutes * (1000*60);
  const seconds = Math.floor(diff / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  const n = { coffees: days, songs: days * 3, hugs: days * 2 };
  const templateIndex = Math.floor(days / 1) % equivalencyTemplates.length;
  document.getElementById("equivalency").textContent = equivalencyTemplates[templateIndex](n);
}

function initEnvelope(){
  const envelope = document.getElementById("envelope");
  const toggle = () => {
    const isOpen = envelope.classList.toggle("open");
    envelope.setAttribute("aria-expanded", isOpen);
  };
  envelope.addEventListener("click", toggle);
  envelope.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      toggle();
    }
  });
}

function buildReasonCards(){
  const grid = document.getElementById("reasonsGrid");
  reasons.forEach((text, i) => {
    const card = document.createElement("div");
    card.className = "reason-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Reason ${i+1}, tap to reveal`);

    card.innerHTML = `
      <div class="reason-card-inner">
        <div class="reason-face reason-front">
          <span class="num">${String(i+1).padStart(2,"0")}</span>
          <span>&#9825;</span>
        </div>
        <div class="reason-face reason-back">${text}</div>
      </div>
    `;

    const flip = () => card.classList.toggle("flipped");
    card.addEventListener("click", flip);
    card.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        flip();
      }
    });

    grid.appendChild(card);
  });
}

function initFlirtyButton(){
  const btn = document.getElementById("flirtyBtn");
  const display = document.getElementById("flirtyLine");
  let lastIndex = -1;

  btn.addEventListener("click", () => {
    let index;
    do{
      index = Math.floor(Math.random() * flirtyLines.length);
    } while(index === lastIndex && flirtyLines.length > 1);
    lastIndex = index;
    display.textContent = flirtyLines[index];
  });
}

document.addEventListener("DOMContentLoaded", () => {
  makeStars();
  startHearts();
  updateCounter();
  setInterval(updateCounter, 1000);
  initEnvelope();
  buildReasonCards();
  initFlirtyButton();
});
