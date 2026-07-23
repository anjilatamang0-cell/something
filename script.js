const text = "Love you \u2764\uFE0F"; // Love you ❤️
const colors = ["", "rose", "gold"]; // "" = default ember

function spawnWordAt(xPercent, yPercent, delay, sizeRem, finalOpacity){
  setTimeout(() => {
    const layer = document.getElementById("heartLayer");
    const span = document.createElement("span");

    const colorClass = colors[Math.floor(Math.random() * colors.length)];
    span.className = "heart-word" + (colorClass ? " " + colorClass : "");
    span.textContent = text;

    span.style.left = xPercent + "vw";
    span.style.top = yPercent + "vh";
    span.style.fontSize = sizeRem + "rem";
    span.style.setProperty("--final-opacity", finalOpacity);

    span.style.animationDuration = (2.2 + Math.random() * 1.3) + "s";

    layer.appendChild(span);
  }, delay);
}

function buildHeart(){
  const width = window.innerWidth;
  const height = window.innerHeight;

  const boxSize = Math.min(width, height) * 0.72;
  const centerXpx = width / 2;
  const centerYpx = height / 2;
  const scale = boxSize / 34; // parametric heart curve spans about -17 to 17

  let delayCounter = 0;
  const outlineDelayStep = 45;
  const fillDelayStep = 18;

  // 1) Outline: the crisp heart edge, bigger + brighter words
  const outlinePoints = 70;
  for(let i = 0; i < outlinePoints; i++){
    const t = (i / outlinePoints) * Math.PI * 2;
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);

    const posXpx = centerXpx + hx * scale;
    const posYpx = centerYpx - hy * scale;
    const xPercent = (posXpx / width) * 100;
    const yPercent = (posYpx / height) * 100;

    spawnWordAt(xPercent, yPercent, delayCounter, 0.95 + Math.random() * 0.35, 0.95);
    delayCounter += outlineDelayStep;
  }

  // 2) Fill: concentric, shrinking copies of the same heart curve to glow the inside
  const ringScales = [0.82, 0.64, 0.46, 0.28];
  ringScales.forEach((ringScale, ringIndex) => {
    const ringPoints = Math.max(10, Math.round(outlinePoints * ringScale * 0.55));
    const rotationOffset = ringIndex * 0.35;

    for(let i = 0; i < ringPoints; i++){
      const t = (i / ringPoints) * Math.PI * 2 + rotationOffset;
      const hx = 16 * Math.pow(Math.sin(t), 3) * ringScale;
      const hy = (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * ringScale;

      const posXpx = centerXpx + hx * scale;
      const posYpx = centerYpx - hy * scale;
      const xPercent = (posXpx / width) * 100;
      const yPercent = (posYpx / height) * 100;

      const sizeRem = 0.55 + ringScale * 0.5 + Math.random() * 0.25;
      const finalOpacity = 0.35 + ringScale * 0.45;

      spawnWordAt(xPercent, yPercent, delayCounter, sizeRem, finalOpacity);
      delayCounter += fillDelayStep;
    }
  });
}

document.addEventListener("DOMContentLoaded", buildHeart);
window.addEventListener("resize", () => {
  document.getElementById("heartLayer").innerHTML = "";
  buildHeart();
});
