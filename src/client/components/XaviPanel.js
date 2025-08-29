export default class XaviPanel {
  static container = null;

  static init(parent) {
    this.container = document.createElement("canvas");
    this.container.className = "xavi-canvas border rounded";
    this.container.width = 120;
    this.container.height = 120;
    parent.appendChild(this.container);
    this.ctx = this.container.getContext("2d");
  }

  static update(emotion = "neutral") {
    if (!this.ctx) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.container.width, this.container.height);

    // Basic stub render
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, this.container.width, this.container.height);

    ctx.fillStyle = "#111";
    ctx.font = "16px sans-serif";
    ctx.fillText(`Emotion: ${emotion}`, 10, 60);
  }
}
