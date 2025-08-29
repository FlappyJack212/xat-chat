import DOMPurify from 'dompurify';
import bus from '../eventBus.js';

export default function createFriendList(initial = []) {
  const wrap = document.createElement('div');
  wrap.className = 'friendlist p-2 space-y-1';

  const title = document.createElement('div');
  title.textContent = 'Friends';
  title.className = 'font-semibold mb-1';

  const list = document.createElement('ul');
  list.className = 'space-y-1';

  function render(friends) {
    list.innerHTML = '';
    friends.forEach(f => {
      const li = document.createElement('li');
      li.className = 'flex items-center justify-between gap-2';
      const name = document.createElement('span');
      name.textContent = f.name;
      const msg = document.createElement('button');
      msg.textContent = 'Message';
      msg.className = 'px-2 py-1 rounded-lg border';
      msg.addEventListener('click', () => bus.emit('friends:message', { id: f.id }));
      li.append(name, msg);
      list.appendChild(li);
    });
  }

  render(initial);
  wrap.append(title, list);
  return { el: wrap, render };
}
