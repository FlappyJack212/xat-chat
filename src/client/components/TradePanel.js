import bus from '../eventBus.js';

export default function createTradePanel() {
  const wrap = document.createElement('div');
  wrap.className = 'tradepanel p-2';

  const title = document.createElement('div');
  title.textContent = 'Trade';
  title.className = 'font-semibold mb-1';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  function render(items = []) {
    tbody.innerHTML = '';
    items.forEach(item => {
      const tr = document.createElement('tr');
      const tdN = document.createElement('td');
      tdN.textContent = item.name;
      const tdQ = document.createElement('td');
      tdQ.textContent = item.quantity;
      const tdA = document.createElement('td');
      const rm = document.createElement('button');
      rm.textContent = 'Remove';
      rm.addEventListener('click', () => bus.emit('trade:remove', { id: item.id }));
      tdA.appendChild(rm);
      tr.append(tdN, tdQ, tdA);
      tbody.appendChild(tr);
    });
  }

  wrap.append(title, table);
  return { el: wrap, render };
}
