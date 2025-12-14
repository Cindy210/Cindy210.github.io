/* sparkle animation */
const layer = document.getElementById("sparkle-layer");

document.addEventListener("mousemove", (e) => {
  const s = document.createElement("span");
  s.textContent = Math.random() > 0.5 ? "✦" : "✧";
  s.style.position = "absolute";
  s.style.left = e.clientX + "px";
  s.style.top = e.clientY + "px";
  s.style.fontSize = Math.random() * 10 + 10 + "px";
  s.style.color = Math.random() > 0.5 ? "#ff5fa2" : "#b983ff";
  s.style.opacity = 1;
  s.style.transform = "translate(-50%, -50%)";
  s.style.transition = "all 0.8s ease-out";

  layer.appendChild(s);

  requestAnimationFrame(() => {
    s.style.opacity = 0;
    s.style.transform = "translate(-50%, -80px) scale(0.3)";
  });

  setTimeout(() => s.remove(), 800);
});
