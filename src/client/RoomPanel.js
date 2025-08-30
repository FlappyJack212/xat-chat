export default class RoomPanel {
  static container = null;

  static init(parent) {
    this.container = document.createElement("div");
    this.container.className = "room-panel p-2 rounded-xl shadow bg-gray-50";
    parent.appendChild(this.container);
  }

  static render(roomData = { name: "Lobby", users: [] }) {
    if (!this.container) return;
    this.container.innerHTML = `<h2 class='font-bold text-lg mb-2'>${roomData.name}</h2>`;

    const list = document.createElement("div");
    roomData.users.forEach(user => {
      const entry = document.createElement("div");
      entry.className = "p-1 text-sm border-b";
      entry.innerText = user.username;
      list.appendChild(entry);
    });

    this.container.appendChild(list);
  }
}
