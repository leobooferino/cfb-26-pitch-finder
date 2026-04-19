const motivationListEl = document.getElementById("motivation-list");
const pitchResultsEl = document.getElementById("pitch-results");
const resultCountEl = document.getElementById("result-count");
const resetBtn = document.getElementById("reset-btn");
const mobileResetBtn = document.getElementById("mobile-reset-btn");

const appLayoutEl = document.querySelector(".app-layout");
const tabMotivationsBtn = document.getElementById("tab-motivations-btn");
const tabResultsBtn = document.getElementById("tab-results-btn");

let motivationStates = {};

function initializeMotivationStates() {
  motivationStates = MOTIVATIONS.reduce((acc, motivation) => {
    acc[motivation] = "unknown";
    return acc;
  }, {});
}

function setMobileView(view) {
  if (!appLayoutEl) return;

  appLayoutEl.classList.remove("mobile-view-motivations", "mobile-view-results");
  appLayoutEl.classList.add(`mobile-view-${view}`);

  if (tabMotivationsBtn) {
    tabMotivationsBtn.classList.toggle("active", view === "motivations");
    tabMotivationsBtn.setAttribute("aria-pressed", view === "motivations" ? "true" : "false");
  }

  if (tabResultsBtn) {
    tabResultsBtn.classList.toggle("active", view === "results");
    tabResultsBtn.setAttribute("aria-pressed", view === "results" ? "true" : "false");
  }
}

function renderMotivations() {
  motivationListEl.innerHTML = "";

  MOTIVATIONS.forEach((motivation) => {
    const row = document.createElement("div");
    row.className = "motivation-row";

    const name = document.createElement("div");
    name.className = "motivation-name";
    name.textContent = motivation;

    const buttons = document.createElement("div");
    buttons.className = "state-buttons";

    ["yes", "no"].forEach((state) => {
      const button = document.createElement("button");
      button.className = `state-btn ${state}`;
      button.textContent = formatStateLabel(state);

      if (motivationStates[motivation] === state) {
        button.classList.add("active");
      }

      button.setAttribute(
        "aria-pressed",
        motivationStates[motivation] === state ? "true" : "false"
      );

      button.addEventListener("click", () => {
        motivationStates[motivation] =
          motivationStates[motivation] === state ? "unknown" : state;

        renderApp();
      });

      buttons.appendChild(button);
    });

    row.appendChild(name);
    row.appendChild(buttons);

    motivationListEl.appendChild(row);
  });
}

function renderPitches() {
  const possiblePitches = getPossiblePitches(motivationStates);

  pitchResultsEl.innerHTML = "";
  resultCountEl.textContent = `${possiblePitches.length} remaining`;

  if (possiblePitches.length === 0) {
    pitchResultsEl.innerHTML = `
      <div class="empty-state">
        No possible pitches match the current known motivations.
      </div>
    `;
    return;
  }

  possiblePitches.forEach((pitch) => {
    const card = document.createElement("div");
    card.className = "pitch-card";

    if (pitch.confirmedMatchCount === 3) {
      card.classList.add("best-match");
    }

    const titleRow = document.createElement("div");
    titleRow.className = "pitch-title-row";

    const title = document.createElement("div");
    title.className = "pitch-name";
    title.textContent = pitch.name;

    const score = document.createElement("div");
    score.className = "pitch-score";
    score.textContent = getPitchScoreLabel(pitch.confirmedMatchCount);

    titleRow.appendChild(title);
    titleRow.appendChild(score);

    const motivationContainer = document.createElement("div");
    motivationContainer.className = "pitch-motivations";

    pitch.motivations.forEach((motivation) => {
      const pill = document.createElement("span");
      pill.className = "motivation-pill";

      if (motivationStates[motivation] === "yes") {
        pill.classList.add("confirmed");
      }

      pill.textContent = motivation;
      motivationContainer.appendChild(pill);
    });

    card.appendChild(titleRow);
    card.appendChild(motivationContainer);

    pitchResultsEl.appendChild(card);
  });
}

function formatStateLabel(state) {
  if (state === "yes") return "Yes";
  if (state === "no") return "No";
  return "";
}

function getPitchScoreLabel(count) {
  if (count === 0) return "Still possible";
  if (count === 1) return "1 known match";
  return `${count} known matches`;
}

function renderApp() {
  renderMotivations();
  renderPitches();
}

function handleReset() {
  initializeMotivationStates();
  renderApp();
  setMobileView("motivations");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

resetBtn.addEventListener("click", handleReset);

if (mobileResetBtn) {
  mobileResetBtn.addEventListener("click", handleReset);
}

if (tabMotivationsBtn) {
  tabMotivationsBtn.addEventListener("click", () => {
    setMobileView("motivations");
  });
}

if (tabResultsBtn) {
  tabResultsBtn.addEventListener("click", () => {
    setMobileView("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

initializeMotivationStates();
renderApp();
setMobileView("motivations");
