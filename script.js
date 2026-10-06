/**
 * திருக்குறள் 514 – தேர்வு மட்டும் போதுமா? (Thirukkural 514)
 * ஊடாடும் காட்சி வழிக் கதைப் புத்தகம் - Pure Visual & Interactive Storybook Script
 * 
 * குழு: Team Spirit
 * தலைவர்: M D GOKULA HARINI
 * உறுப்பினர்கள்: SANKARI R, ETHIKHASAN S
 */

// ============================================================================
// 1. STATE & LABELS CONFIGURATION (NO AUDIO / NO WEB SPEECH)
// ============================================================================
let currentSceneIndex = 1;
const totalScenes = 7;

// Friendly Scene Labels for Bottom Navigation
const SCENE_TITLES = {
  1: "காட்சி 1 / 7: திருக்குறள் 514",
  2: "காட்சி 2 / 7: பள்ளி விழா ஏற்பாடு",
  3: "காட்சி 3 / 7: யாரைத் தேர்ந்தெடுப்பது?",
  4: "காட்சி 4 / 7: பொறுப்புகள் வழங்குதல்",
  5: "காட்சி 5 / 7: உண்மையான வேலை",
  6: "காட்சி 6 / 7: கவனிப்பு",
  7: "காட்சி 7 / 7: கேள்வி & முடிவு"
};

// ============================================================================
// 2. SCENE NAVIGATION & VISUAL TRANSITIONS
// ============================================================================

/**
 * Transitions to and renders the specified scene
 * @param {number} sceneNumber - Target scene (1 to 7)
 */
function showScene(sceneNumber) {
  if (sceneNumber < 1 || sceneNumber > totalScenes) return;

  currentSceneIndex = sceneNumber;

  // Update DOM scenes visibility
  for (let i = 1; i <= totalScenes; i++) {
    const sceneEl = document.getElementById(`scene-${i}`);
    if (sceneEl) {
      if (i === sceneNumber) {
        sceneEl.style.display = "flex";
        sceneEl.classList.add("active");
      } else {
        sceneEl.style.display = "none";
        sceneEl.classList.remove("active");
      }
    }
  }

  // Update Bottom Navigation UI
  updateNavigationUI(sceneNumber);

  // Smooth scroll to top of viewport
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Updates step indicator and Prev / Next buttons in bottom bar
 * @param {number} currentStep - Currently active step
 */
function updateNavigationUI(currentStep) {
  const stepLabel = document.getElementById("nav-step-label");
  const prevBtn = document.getElementById("btn-nav-prev");
  const nextBtn = document.getElementById("btn-nav-next");

  if (stepLabel) {
    stepLabel.textContent = SCENE_TITLES[currentStep] || `காட்சி ${currentStep} / ${totalScenes}`;
  }

  if (prevBtn) {
    prevBtn.style.display = currentStep > 1 ? "inline-flex" : "none";
  }

  if (nextBtn) {
    if (currentStep === totalScenes) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "inline-flex";
      nextBtn.innerHTML = "<span>அடுத்து →</span>";
    }
  }
}

/**
 * Advances to the next scene
 */
function nextScene() {
  if (currentSceneIndex < totalScenes) {
    showScene(currentSceneIndex + 1);
  }
}

/**
 * Returns to the previous scene
 */
function prevScene() {
  if (currentSceneIndex > 1) {
    showScene(currentSceneIndex - 1);
  }
}

/**
 * Restarts the story from Scene 1
 */
function restartStory() {
  // Reset all 3D flipped cards
  document.querySelectorAll(".flip-card.flipped").forEach(card => {
    card.classList.remove("flipped");
  });

  // Reset interactive question in Scene 7
  resetInteractiveQuestion();

  // Return to Scene 1 (Kural first)
  showScene(1);
}

// ============================================================================
// 3. INTERACTIVE QUESTION: “ஒருவரை தேர்ந்தெடுத்தால் மட்டும் போதுமா?”
// ============================================================================

/**
 * Resets the question state for Scene 7
 */
function resetInteractiveQuestion() {
  const hintEl = document.getElementById("hint-try-again");
  const answerBox = document.getElementById("aha-answer-box");

  if (hintEl) hintEl.style.display = "none";
  if (answerBox) answerBox.style.display = "none";
}

/**
 * Initializes the "ஆம் / இல்லை" interactive question
 */
function initInteractiveQuestion() {
  const btnYes = document.getElementById("btn-choice-yes");
  const btnNo = document.getElementById("btn-choice-no");
  const hintEl = document.getElementById("hint-try-again");
  const answerBox = document.getElementById("aha-answer-box");

  btnYes?.addEventListener("click", () => {
    // Show friendly guidance message to think again
    if (hintEl) {
      hintEl.style.display = "flex";
      hintEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    if (answerBox) {
      answerBox.style.display = "none";
    }
  });

  btnNo?.addEventListener("click", () => {
    // Hide guidance hint and reveal the decisive answer
    if (hintEl) hintEl.style.display = "none";
    if (answerBox) {
      answerBox.style.display = "flex";
      answerBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}

// ============================================================================
// 4. INTERACTIVE 3D CARD FLIP (“முதலில் பார்த்தபோது vs வேலை செய்யும்போது”)
// ============================================================================

/**
 * Initializes 3D card flips for children to compare expectation vs reality
 */
function initCardFlipInteractions() {
  const flipCards = document.querySelectorAll(".flip-card");

  flipCards.forEach(card => {
    // Click or touch to flip
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });

    // Keyboard accessibility: Enter or Space
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("flipped");
      }
    });
  });
}

// ============================================================================
// 5. INITIALIZATION & EVENT LISTENERS
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Scene Progression Buttons
  document.getElementById("btn-start-story")?.addEventListener("click", () => {
    showScene(2);
  });

  document.getElementById("btn-to-selection")?.addEventListener("click", () => {
    showScene(3);
  });

  document.getElementById("btn-to-responsibilities")?.addEventListener("click", () => {
    showScene(4);
  });

  document.getElementById("btn-start-work")?.addEventListener("click", () => {
    showScene(5);
  });

  document.getElementById("btn-to-observation")?.addEventListener("click", () => {
    showScene(6);
  });

  document.getElementById("btn-to-interactive-q")?.addEventListener("click", () => {
    showScene(7);
  });

  document.getElementById("btn-restart-story")?.addEventListener("click", restartStory);

  // Bottom Navigation Bar Prev / Next
  document.getElementById("btn-nav-prev")?.addEventListener("click", prevScene);
  document.getElementById("btn-nav-next")?.addEventListener("click", nextScene);

  // Initialize Interactive Question and Card Flips
  initInteractiveQuestion();
  initCardFlipInteractions();

  // Keyboard navigation (Left / Right Arrow keys)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextScene();
    } else if (e.key === "ArrowLeft") {
      prevScene();
    }
  });

  // Start with Scene 1: Thirukkural 514 FIRST!
  showScene(1);
});
