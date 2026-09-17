const MUTE_KEY = "dodge-bgm-muted";
const VOLUME = 0.3;

let audio: HTMLAudioElement | null = null;
let toggle: HTMLButtonElement | null = null;

function isMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

function setMuted(next: boolean): void {
  try {
    if (next) localStorage.setItem(MUTE_KEY, "1");
    else localStorage.removeItem(MUTE_KEY);
  } catch {
    // ignore quota / private mode
  }
  syncUi();
}

function syncUi(): void {
  if (!audio) return;
  const muted = isMuted();
  audio.muted = muted;
  audio.volume = muted ? 0 : VOLUME;
  if (!toggle) return;
  toggle.classList.toggle("is-muted", muted);
  toggle.setAttribute("aria-pressed", muted ? "true" : "false");
  toggle.setAttribute("aria-label", muted ? "Unmute music" : "Mute music");
  toggle.title = muted ? "Unmute" : "Mute";
}

/** Johann Strauss II — The Blue Danube. Starts after the first user gesture. */
export function initBgm(): void {
  audio = document.querySelector("#bgm");
  toggle = document.querySelector("#bgm-toggle");
  if (!audio) return;
  audio.loop = true;
  audio.preload = "auto";
  syncUi();
  toggle?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const next = !isMuted();
    setMuted(next);
    if (!next) void audio?.play().catch(() => undefined);
  });
  document.addEventListener("visibilitychange", () => {
    if (!audio || isMuted()) return;
    if (document.hidden) audio.pause();
    else void audio.play().catch(() => undefined);
  });
  window.addEventListener(
    "pointerdown",
    () => {
      unlockBgm();
    },
    { capture: true },
  );
}

export function unlockBgm(): void {
  if (!audio || isMuted()) return;
  void audio.play().catch(() => undefined);
}
