// ============================================================================
// Comment system — free, no visitor account, no server maintained by you.
// Backend: Google Sheets + Apps Script (see google-apps-script-comments-backend.txt).
// Drop-in usage: add <div id="commentsSection"></div> then
// <script src="comments.js"></script> near the end of any module page.
// ============================================================================

(function () {
  // ====================== CONFIG — paste your two values here ======================
  var WEB_APP_URL = "https://script.google.com/macros/s/AKfycby38uL5lpcQpH5UqXq8DzUc_NXy48r3V_e94eMx20LgoEE5D1af3GsYBlKeYAXqQOvZ/exec";
  var APPROVED_SHEET_ID = "1H_stbO-l5k_dKvjjY0j6xfVPxkmAnvE6Oo0e3wcUHaA";
  var APPROVED_SHEET_NAME = "Approved"; // must match the tab name in your Approved Google Sheet
  // ====================================================================================

  var mount = document.getElementById("commentsSection");
  if (!mount) return;

  var isConfigured = WEB_APP_URL.indexOf("PASTE_YOUR") !== 0 && APPROVED_SHEET_ID.indexOf("PASTE_YOUR") !== 0;
  var pageId = (location.pathname.split("/").pop() || "index.html");

  var TYPES = ["Question", "Comment", "Correction", "Suggestion", "Other"];
  var TYPE_COLORS = {
    Question: "#1479b8",
    Comment: "#61737b",
    Correction: "#c64852",
    Suggestion: "#2d8b65",
    Other: "#7653a6"
  };

  injectStyles();

  if (!isConfigured) {
    mount.innerHTML =
      '<div class="cmt-card"><h2 class="cmt-h2">Questions &amp; comments</h2>' +
      '<p class="cmt-note">Comments aren’t set up on this page yet.</p></div>';
    return;
  }

  mount.innerHTML = renderShell();
  wireForm();
  loadApproved();

  // ---------------------------------------------------------------------
  function renderShell() {
    return (
      '<div class="cmt-card">' +
      '<h2 class="cmt-h2">Questions &amp; comments</h2>' +
      '<p class="cmt-intro">Spotted something confusing, incorrect, or worth adding? Leave a note below. Everything is reviewed before it appears publicly, so don’t expect it to show up immediately — your email is never shown to anyone.</p>' +
      '<form id="cmtForm" class="cmt-form">' +
      '  <div class="cmt-row2">' +
      '    <div class="cmt-field"><label for="cmtName">Name</label><input id="cmtName" type="text" maxlength="120" required></div>' +
      '    <div class="cmt-field"><label for="cmtEmail">Email <span class="cmt-hint">(private, never shown)</span></label><input id="cmtEmail" type="email" maxlength="200" required></div>' +
      "  </div>" +
      '  <div class="cmt-field"><label for="cmtType">This is a…</label><select id="cmtType">' +
      TYPES.map(function (t) { return '<option value="' + t + '">' + t + "</option>"; }).join("") +
      "  </select></div>" +
      '  <div class="cmt-field"><label for="cmtMessage">Message</label><textarea id="cmtMessage" rows="4" maxlength="3000" required></textarea></div>' +
      '  <input type="text" id="cmtHp" name="cmtHp" class="cmt-hp" tabindex="-1" autocomplete="off">' +
      '  <div class="cmt-form-foot"><button type="submit" id="cmtSubmit" class="cmt-btn">Submit for review</button><span id="cmtStatus" class="cmt-status" aria-live="polite"></span></div>' +
      "</form>" +
      '<div id="cmtList" class="cmt-list"><p class="cmt-note">Loading comments…</p></div>' +
      "</div>"
    );
  }

  function wireForm() {
    var form = document.getElementById("cmtForm");
    var submitting = false;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (submitting) return;
      var btn = document.getElementById("cmtSubmit");
      var status = document.getElementById("cmtStatus");
      var name = document.getElementById("cmtName").value.trim();
      var email = document.getElementById("cmtEmail").value.trim();
      var type = document.getElementById("cmtType").value;
      var message = document.getElementById("cmtMessage").value.trim();
      var hp = document.getElementById("cmtHp").value;

      if (!name || !email || !message) return;

      submitting = true;
      btn.disabled = true;
      status.textContent = "Sending…";
      status.className = "cmt-status";

      fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids a CORS preflight to Apps Script
        body: JSON.stringify({ page: pageId, name: name, email: email, type: type, message: message, hp: hp })
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.ok) {
            form.reset();
            status.textContent = "Thanks — your " + type.toLowerCase() + " has been submitted and will appear here once reviewed.";
            status.className = "cmt-status cmt-status-ok";
          } else {
            status.textContent = "Something went wrong — please try again in a moment.";
            status.className = "cmt-status cmt-status-err";
          }
        })
        .catch(function () {
          status.textContent = "Couldn’t reach the server — please try again in a moment.";
          status.className = "cmt-status cmt-status-err";
        })
        .finally(function () {
          submitting = false;
          btn.disabled = false;
        });
    });
  }

  function loadApproved() {
    var url =
      "https://docs.google.com/spreadsheets/d/" +
      APPROVED_SHEET_ID +
      "/gviz/tq?tqx=out:json&sheet=" +
      encodeURIComponent(APPROVED_SHEET_NAME);

    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("Request failed: " + r.status);
        return r.text();
      })
      .then(function (text) {
        var json = parseGviz(text);
        if (!json) throw new Error("Unexpected response format");
        var rows = (json && json.table && json.table.rows) || [];
        var comments = rows
          .map(function (row) {
            var c = row.c || [];
            return {
              timestamp: cellVal(c[0]),
              page: cellVal(c[1]),
              name: cellVal(c[2]),
              type: cellVal(c[3]) || "Comment",
              message: cellVal(c[4]),
              reply: cellVal(c[5])
            };
          })
          .filter(function (item) { return item.page === pageId && item.message; })
          .sort(function (a, b) { return new Date(b.timestamp) - new Date(a.timestamp); });

        renderList(comments);
      })
      .catch(function () {
        document.getElementById("cmtList").innerHTML = '<p class="cmt-note">Comments couldn’t be loaded right now.</p>';
      });
  }

  function cellVal(cell) {
    return cell && cell.v !== null && cell.v !== undefined ? String(cell.v) : "";
  }

  // Google's gviz endpoint wraps its JSON in google.visualization.Query.setResponse(...);
  function parseGviz(text) {
    var start = text.indexOf("{");
    var end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch (e) {
      return null;
    }
  }

  function renderList(comments) {
    var list = document.getElementById("cmtList");
    if (!comments.length) {
      list.innerHTML = '<p class="cmt-note">No comments yet — be the first to ask a question or leave feedback.</p>';
      return;
    }
    list.innerHTML =
      '<div class="cmt-count">' + comments.length + (comments.length === 1 ? " comment" : " comments") + "</div>" +
      comments
        .map(function (item) {
          var color = TYPE_COLORS[item.type] || TYPE_COLORS.Comment;
          var dateStr = formatDate(item.timestamp);
          var reply = item.reply
            ? '<div class="cmt-reply"><b>Reply:</b> ' + escapeHtml(item.reply) + "</div>"
            : "";
          return (
            '<div class="cmt-item">' +
            '<div class="cmt-item-head"><span class="cmt-badge" style="background:' + color + '22;color:' + color + '">' + escapeHtml(item.type) + "</span>" +
            '<span class="cmt-name">' + escapeHtml(item.name) + "</span>" +
            '<span class="cmt-date">' + dateStr + "</span></div>" +
            '<div class="cmt-msg">' + escapeHtml(item.message) + "</div>" +
            reply +
            "</div>"
          );
        })
        .join("");
  }

  function formatDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function injectStyles() {
    if (document.getElementById("cmt-styles")) return;
    var style = document.createElement("style");
    style.id = "cmt-styles";
    style.textContent =
      ".cmt-card{background:#fff;border:1px solid #d7e1e5;border-radius:10px;box-shadow:0 2px 9px rgba(12,44,58,.06);padding:16px;margin-bottom:16px;font-family:Arial,Helvetica,sans-serif;color:#20343d}" +
      ".cmt-h2{font-size:17px;color:#123b4a;margin:0 0 8px;border-bottom:2px solid #e5edf1;padding-bottom:7px}" +
      ".cmt-intro{font-size:12.5px;line-height:1.6;color:#61737b;margin:0 0 12px}" +
      ".cmt-form{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}" +
      ".cmt-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}" +
      "@media(max-width:600px){.cmt-row2{grid-template-columns:1fr}}" +
      ".cmt-field{display:flex;flex-direction:column;gap:4px}" +
      ".cmt-field label{font-size:12px;font-weight:700;color:#123b4a}" +
      ".cmt-hint{font-weight:400;color:#61737b}" +
      ".cmt-field input,.cmt-field select,.cmt-field textarea{font:inherit;font-size:13px;border:1px solid #d7e1e5;border-radius:6px;padding:8px 10px;font-family:Arial,Helvetica,sans-serif}" +
      ".cmt-field textarea{resize:vertical}" +
      ".cmt-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}" +
      ".cmt-form-foot{display:flex;align-items:center;gap:12px;flex-wrap:wrap}" +
      ".cmt-btn{background:#1479b8;color:#fff;border:0;border-radius:6px;padding:9px 16px;font-weight:700;font-size:13px;cursor:pointer}" +
      ".cmt-btn:disabled{opacity:.6;cursor:default}" +
      ".cmt-status{font-size:12px;color:#61737b}" +
      ".cmt-status-ok{color:#2d8b65;font-weight:700}" +
      ".cmt-status-err{color:#c64852;font-weight:700}" +
      ".cmt-note{font-size:12.5px;color:#61737b}" +
      ".cmt-count{font-size:11px;color:#61737b;text-transform:uppercase;letter-spacing:.03em;font-weight:700;margin-bottom:8px}" +
      ".cmt-list{border-top:1px solid #e5edf1;padding-top:12px}" +
      ".cmt-item{padding:10px 0;border-bottom:1px solid #eef2f4}" +
      ".cmt-item:last-child{border-bottom:0}" +
      ".cmt-item-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px}" +
      ".cmt-badge{font-size:10px;font-weight:700;border-radius:999px;padding:2px 9px;text-transform:uppercase;letter-spacing:.02em}" +
      ".cmt-name{font-size:12.5px;font-weight:700;color:#20343d}" +
      ".cmt-date{font-size:11px;color:#9aa9ae;margin-left:auto}" +
      ".cmt-msg{font-size:13px;line-height:1.55;color:#20343d;white-space:pre-wrap}" +
      ".cmt-reply{margin-top:6px;background:#f2f7f9;border-left:3px solid #1479b8;border-radius:0 6px 6px 0;padding:7px 10px;font-size:12.5px;line-height:1.5;color:#20343d;white-space:pre-wrap}";
    document.head.appendChild(style);
  }
})();
