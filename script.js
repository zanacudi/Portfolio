function renderTimeline(containerId, items) {
  const list = document.getElementById(containerId);
  list.innerHTML = items.map(item => `
    <li>
      <div class="entry-title">${item.title}</div>
      <div class="entry-meta">${item.meta}</div>
      <p>${item.description}</p>
    </li>
  `).join("");
}

function renderCards(containerId, items, { showDate = false } = {}) {
  const container = document.getElementById(containerId);
  container.innerHTML = items.map(item => item.group ? `
    <div class="card card-stack">
      ${item.group.map(g => `<div class="stack-item"><h3>${g.title}</h3><a href="${g.link}" target="_blank" rel="noopener">View →</a></div>`).join("")}
    </div>` : `
    <div class="card">
      <h3>${item.title}</h3>
      ${item.meta ? `<div class="entry-meta">${item.meta}</div>` : ""}
      ${showDate && item.date ? `<div class="entry-meta">${item.date}</div>` : ""}
      ${item.description ? `<p>${item.description}</p>` : ""}
      ${(item.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
      ${item.link ? `<div><a href="${item.link}" target="_blank" rel="noopener">View →</a></div>` : ""}
    </div>
  `).join("");
}

function renderContact() {
  const list = document.getElementById("contact-list");
  list.innerHTML = CONTACT.map(c => `<li><a href="${c.href}" target="_blank" rel="noopener">${c.label}</a></li>`).join("");
}

renderTimeline("education-list", EDUCATION);
renderTimeline("resume-list", RESUME);
renderCards("project-grid", PROJECTS);
renderCards("litreview-grid", LITREVIEW);
renderCards("tutorial-grid", TUTORIALS, { showDate: true });
renderCards("misc-grid", MISC);
renderContact();

document.getElementById("year").textContent = new Date().getFullYear();
