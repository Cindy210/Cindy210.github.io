/* =========================
   Sparkle (mousemove) - 가벼운 버전
   ========================= */
const sparkleLayer = document.getElementById("sparkle-layer");
let sparkleQueued = false;
let lastMouse = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
  lastMouse.x = e.clientX;
  lastMouse.y = e.clientY;
  if (sparkleQueued) return;
  sparkleQueued = true;

  requestAnimationFrame(() => {
    sparkleQueued = false;
    const s = document.createElement("span");
    s.textContent = Math.random() > 0.5 ? "✦" : "✧";
    s.style.position = "absolute";
    s.style.left = lastMouse.x + "px";
    s.style.top = lastMouse.y + "px";
    s.style.fontSize = (Math.random() * 10 + 10) + "px";
    s.style.color = Math.random() > 0.5 ? "#4da3ff" : "#ff5fa2";
    s.style.opacity = "1";
    s.style.transform = "translate(-50%, -50%)";
    s.style.transition = "all 0.75s ease-out";

    sparkleLayer.appendChild(s);

    requestAnimationFrame(() => {
      s.style.opacity = "0";
      s.style.transform = "translate(-50%, -70px) scale(0.35)";
    });

    setTimeout(() => s.remove(), 760);
  });
});

/* =========================
   Sticker pop (click)
   ========================= */
const popLayer = document.getElementById("pop-layer");

function popSticker(x, y) {
  const stickers = ["💖","💿","⭐","✨","🎀","🫧","🍬","🩵"];
  const el = document.createElement("span");
  el.textContent = stickers[(Math.random() * stickers.length) | 0];

  const size = (Math.random() * 10 + 18);
  const driftX = (Math.random() * 120 - 60);
  const driftY = -(Math.random() * 140 + 60);
  const rotate = (Math.random() * 90 - 45);

  el.style.position = "absolute";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.fontSize = size + "px";
  el.style.opacity = "1";
  el.style.transform = `translate(-50%, -50%) rotate(0deg) scale(0.9)`;
  el.style.transition = "transform .55s cubic-bezier(.2,.8,.2,1), opacity .55s ease";

  popLayer.appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = "0";
    el.style.transform = `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) rotate(${rotate}deg) scale(1.35)`;
  });

  setTimeout(() => el.remove(), 560);
}

document.addEventListener("click", (e) => popSticker(e.clientX, e.clientY));

/* =========================
   Drawer open/close
   ========================= */
const drawer = document.getElementById("drawer");
const menuBtn = document.getElementById("menuBtn");
const drawerClose = document.getElementById("drawerClose");
const backdrop = document.getElementById("backdrop");

function openDrawer(){
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  menuBtn.setAttribute("aria-expanded", "true");
  backdrop.hidden = false;
}
function closeDrawer(){
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  menuBtn.setAttribute("aria-expanded", "false");
  backdrop.hidden = true;
}

menuBtn.addEventListener("click", openDrawer);
drawerClose.addEventListener("click", closeDrawer);
backdrop.addEventListener("click", closeDrawer);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

/* =========================
   Drawer Search / Filter + No results
   ========================= */
const drawerSearch = document.getElementById("drawerSearch");
const drawerClear = document.getElementById("drawerClear");
const drawerEmpty = document.getElementById("drawerEmpty");
const allDrawerLinks = Array.from(document.querySelectorAll(".drawer a[data-link]"));

function applyFilter(q){
  const query = (q || "").trim().toLowerCase();
  let visibleCount = 0;

  allDrawerLinks.forEach(a => {
    const text = (a.textContent || "").trim().toLowerCase();
    const hit = !query || text.includes(query);
    a.hidden = !hit;
    if (hit) visibleCount += 1;
  });

  drawerEmpty.hidden = !(query && visibleCount === 0);
}

drawerSearch.addEventListener("input", () => applyFilter(drawerSearch.value));
drawerClear.addEventListener("click", () => {
  drawerSearch.value = "";
  applyFilter("");
  drawerSearch.focus();
});

/* =========================
   Scroll reveal (sections 등장)
   ========================= */
const reveals = Array.from(document.querySelectorAll(".reveal"));
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add("is-visible");
      revealIO.unobserve(en.target);
    }
  });
}, { threshold: 0.18, rootMargin: "0px 0px -10% 0px" });

reveals.forEach(el => revealIO.observe(el));

/* =========================
   Random icons for 업무/관심사
   ========================= */
const iconPool = ["💙","💖","🩵","🎀","💿","✨","⭐","🧁","🫧","🍬","📌","🧠","🛡️","🔍","🧬","🧩"];

function assignRandomIcons(){
  document.querySelectorAll(".icon-random li").forEach(li => {
    const ico = iconPool[(Math.random() * iconPool.length) | 0];
    li.style.setProperty("--ico", `"${ico}"`);
  });
}
assignRandomIcons();

/* =========================
   “팡” + 흔들림 (네비/드로어 클릭시)
   ========================= */
function kitchFocus(el){
  if (!el) return;

  el.classList.remove("kitch-pop");
  el.classList.remove("kitch-shake");
  void el.offsetWidth;         // reflow

  el.classList.add("kitch-pop");
  setTimeout(() => el.classList.remove("kitch-pop"), 220);

  setTimeout(() => {
    el.classList.add("kitch-shake");
    setTimeout(() => el.classList.remove("kitch-shake"), 420);
  }, 70);
}

function smoothGoTo(hash){
  const id = (hash || "").replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => kitchFocus(el), 260);
}

document.querySelectorAll('a[data-link]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    e.preventDefault();

    if (a.closest(".drawer")) closeDrawer();

    history.pushState(null, "", href);
    smoothGoTo(href);
  });
});

/* =========================
   Nav active on scroll
   ========================= */
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll("[data-section]"));

function setActiveById(id){
  navLinks.forEach(a => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active", href === `#${id}`);
  });
}

const navIO = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(en => en.isIntersecting)
    .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (visible?.target?.id) setActiveById(visible.target.id);
}, {
  threshold: [0.25, 0.4, 0.55, 0.7],
  rootMargin: "-20% 0px -55% 0px"
});

sections.forEach(sec => sec.id && navIO.observe(sec));
if (sections[0]?.id) setActiveById(sections[0].id);

/* 해시로 진입 시도 */
window.addEventListener("load", () => {
  if (location.hash) smoothGoTo(location.hash);
});
