export default class FriendList {
  static container = null;

  static init(parent) {
    this.container = document.createElement("div");
    this.container.className = "friend-list p-2 rounded-xl shadow bg-gray-100";
    parent.appendChild(this.container);
  }

  static render(friends = []) {
    if (!this.container) return;
    this.container.innerHTML = "";

    const title = document.createElement("h2");
    title.className = "font-bold text-lg mb-2";
    title.innerText = "Friends";
    this.container.appendChild(title);

    friends.forEach(friend => {
      const item = document.createElement("div");
      item.className = "flex items-center gap-2 p-1 hover:bg-gray-200 rounded";
      item.innerHTML = `
        <span class="w-2 h-2 rounded-full ${friend.online ? "bg-green-500" : "bg-gray-400"}"></span>
        <span>${friend.username}</span>
      `;
      this.container.appendChild(item);
    });
  }
}
