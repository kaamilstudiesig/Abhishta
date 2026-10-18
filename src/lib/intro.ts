/**
 * The page-load intro veil marks <html data-intro="done"> and fires this event
 * when it lifts; hero animations wait on it so they play as the veil clears.
 */
export const INTRO_DONE = "abhishta:intro-done";

export function whenIntroDone(cb: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  if (document.documentElement.dataset.intro === "done") {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(INTRO_DONE, handler, { once: true });
  return () => window.removeEventListener(INTRO_DONE, handler);
}

export function markIntroDone() {
  if (document.documentElement.dataset.intro === "done") return;
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event(INTRO_DONE));
}
