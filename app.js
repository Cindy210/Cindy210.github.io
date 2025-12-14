const toastEl = document.getElementById("toast");
let toastTimer = null;

function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1400);
}

document.querySelectorAll("[data-toast]").forEach(btn => {
  btn.addEventListener("click", () => toast(btn.dataset.toast));
});

const form = document.getElementById("form");
const list = document.getElementById("list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const msg = document.getElementById("msg").value.trim();
  if(!name || !msg) return;

  const li = document.createElement("li");
  li.innerHTML = `<b>${escapeHtml(name)}</b><span>${escapeHtml(msg)}</span>`;
  list.prepend(li);

  form.reset();
  toast("저장 완료 ✨");
});

function escapeHtml(str){
  return str.replaceAll("&","&amp;")
            .replaceAll("<","&lt;")
            .replaceAll(">","&gt;")
            .replaceAll('"',"&quot;")
            .replaceAll("'","&#039;");
}
