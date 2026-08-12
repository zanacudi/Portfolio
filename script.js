function renderResume() {
  const list = document.getElementById("resume-list");
  list.innerHTML = RESUME.map(item => `
    <li>
      <div class="entry-title">${item.title}</div>
      <div class="entry-meta">${item.meta}</div>
      <p>${item.description}</p>
    </li>
  `).join("");
}

function renderCards(containerId, items, { showDate = false } = {}) {
  const container = document.getElementById(containerId);
  container.innerHTML = items.map(item => `
    <div class="card">
      <h3>${item.title}</h3>
      ${showDate && item.date ? `<div class="entry-meta">${item.date}</div>` : ""}
      <p>${item.description}</p>
      ${(item.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
      ${item.link ? `<div><a href="${item.link}" target="_blank" rel="noopener">View →</a></div>` : ""}
    </div>
  `).join("");
}

function renderContact() {
  const list = document.getElementById("contact-list");
  list.innerHTML = CONTACT.map(c => `<li><a href="${c.href}" target="_blank" rel="noopener">${c.label}</a></li>`).join("");
}

renderResume();
renderCards("project-grid", PROJECTS);
renderCards("tutorial-grid", TUTORIALS, { showDate: true });
renderContact();

document.getElementById("year").textContent = new Date().getFullYear();
