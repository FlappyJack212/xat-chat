import DOMPurify from 'dompurify';
import bus from '../eventBus.js';

export default class TradePanel {
  static container = null;

  static init(parent) {
    this.container = document.createElement("div");
    this.container.className = "trade-panel p-3 rounded-xl shadow bg-white";
    parent.appendChild(this.container);
  }

  static render(items = []) {
    if (!this.container) return;
    this.container.innerHTML = "<h2 class='font-bold text-lg mb-2'>Trade</h2>";

    const list = document.createElement("div");
    list.className = "grid grid-cols-2 gap-2";

    items.forEach(item => {
      const entry = document.createElement("div");
      entry.className = "border rounded p-2 text-sm hover:bg-gray-50 cursor-pointer";
      entry.innerText = `${item.name} (x${item.count})`;
      list.appendChild(entry);
    });

    this.container.appendChild(list);
  }
}
