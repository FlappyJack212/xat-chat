export default class BlastSystem {
  static container = null;

  static init(parent) {
    this.container = document.createElement("canvas");
    this.container.className = "blast-canvas border rounded";
    this.container.width = 400;
    this.container.height = 200;
    parent.appendChild(this.container);
    this.ctx = this.container.getContext("2d");
  }

  static render(effect = "ban", userPos = { x: 50, y: 50 }) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.container.width, this.container.height);

    ctx.fillStyle = effect === "ban" ? "red" : "blue";
    ctx.beginPath();
    ctx.arc(userPos.x, userPos.y, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "12px sans-serif";
    ctx.fillText(effect.toUpperCase(), userPos.x - 20, userPos.y - 30);
  }
}
