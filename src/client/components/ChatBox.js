import DOMPurify from 'dompurify';
import bus from '../eventBus.js';

export default function createChatBox() {
  const wrap = document.createElement('div');
  wrap.className = 'chatbox flex gap-2 items-center p-2 border-t';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Type a message…';
  input.className = 'flex-1 px-3 py-2 rounded-lg border outline-none';

  const send = document.createElement('button');
  send.textContent = 'Send';
  send.className = 'px-4 py-2 rounded-xl shadow';
  send.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    bus.emit('chat:send', { text });
    input.value = '';
  });

  wrap.append(input, send);
  return wrap;
}

export function renderMessage({ user = 'You', text }) {
  const row = document.createElement('div');
  row.className = 'message px-2 py-1';
  row.innerHTML = DOMPurify.sanitize(`<b>${user}</b>: ${text}`);
  return row;
}
