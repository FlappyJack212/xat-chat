// Lightweight event bus using DOM CustomEvent (no deps)
const bus = {
  on(event, handler) { document.addEventListener(event, handler); },
  off(event, handler) { document.removeEventListener(event, handler); },
  emit(event, detail) { document.dispatchEvent(new CustomEvent(event, { detail })); }
};
export default bus;
