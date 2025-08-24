/**
 * 💎 POWER TRADING SYSTEM - Flash to JavaScript Migration
 * Replaces Flash trading interface with pure JavaScript
 * Based on Adobe's AS3 to JavaScript Migration Guidelines
 */

class PowerTradingSystem {
  constructor(container) {
    this.container = container;
    this.trades = [];
    this.myTrades = [];
    this.selectedTrade = null;
    this.isOpen = false;
    
    // Trade status (from Ixat Files)
    this.tradeStatus = {
      PENDING: 0,
      ACCEPTED: 1,
      DECLINED: 2,
      CANCELLED: 3,
      COMPLETED: 4
    };
    
    this.init();
  }
  
  init() {
    this.createInterface();
    this.setupEventListeners();
    this.loadTrades();
  }
  
  createInterface() {
    // Create main trading interface
    this.element = document.createElement('div');
    this.element.className = 'power-trading-system';
    this.element.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 600px;
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      border: 2px solid #533483;
      border-radius: 10px;
      z-index: 10000;
      display: none;
      font-family: Tahoma, Arial, sans-serif;
      color: white;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    `;
    
    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      background: linear-gradient(90deg, #533483, #8B5CF6);
      padding: 15px;
      border-radius: 8px 8px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    
    header.innerHTML = `
      <h2 style="margin: 0; font-size: 18px;">💎 Power Trading Market</h2>
      <button id="close-trading" style="background: #FF4444; border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer;">✕</button>
    `;
    
    // Content area
    const content = document.createElement('div');
    content.style.cssText = `
      padding: 20px;
      height: calc(100% - 60px);
      overflow-y: auto;
    `;
    
    // Tabs
    const tabs = document.createElement('div');
    tabs.style.cssText = `
      display: flex;
      margin-bottom: 20px;
      border-bottom: 2px solid #533483;
    `;
    
    tabs.innerHTML = `
      <button class="tab-btn active" data-tab="market" style="flex: 1; background: #533483; border: none; color: white; padding: 10px; cursor: pointer;">Market</button>
      <button class="tab-btn" data-tab="my-trades" style="flex: 1; background: #2a2a2a; border: none; color: white; padding: 10px; cursor: pointer;">My Trades</button>
      <button class="tab-btn" data-tab="create" style="flex: 1; background: #2a2a2a; border: none; color: white; padding: 10px; cursor: pointer;">Create Trade</button>
    `;
    
    // Tab content
    this.tabContent = document.createElement('div');
    this.tabContent.id = 'tab-content';
    
    content.appendChild(tabs);
    content.appendChild(this.tabContent);
    
    this.element.appendChild(header);
    this.element.appendChild(content);
    this.container.appendChild(this.element);
    
    // Show market tab by default
    this.showTab('market');
  }
  
  setupEventListeners() {
    // Close button
    this.element.querySelector('#close-trading').addEventListener('click', () => {
      this.close();
    });
    
    // Tab buttons
    this.element.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.element.querySelectorAll('.tab-btn').forEach(b => b.style.background = '#2a2a2a');
        e.target.style.background = '#533483';
        this.showTab(e.target.dataset.tab);
      });
    });
  }
  
  showTab(tabName) {
    this.tabContent.innerHTML = '';
    
    switch(tabName) {
      case 'market':
        this.showMarketTab();
        break;
      case 'my-trades':
        this.showMyTradesTab();
        break;
      case 'create':
        this.showCreateTab();
        break;
    }
  }
  
  showMarketTab() {
    const marketContent = document.createElement('div');
    marketContent.innerHTML = `
      <div style="margin-bottom: 20px;">
        <input type="text" id="search-trades" placeholder="Search trades..." style="width: 100%; padding: 10px; border: 1px solid #533483; border-radius: 5px; background: #2a2a2a; color: white;">
      </div>
      <div id="trades-list" style="max-height: 400px; overflow-y: auto;">
        <div style="text-align: center; padding: 20px; color: #888;">Loading trades...</div>
      </div>
    `;
    
    this.tabContent.appendChild(marketContent);
    this.loadMarketTrades();
  }
  
  showMyTradesTab() {
    const myTradesContent = document.createElement('div');
    myTradesContent.innerHTML = `
      <div id="my-trades-list" style="max-height: 400px; overflow-y: auto;">
        <div style="text-align: center; padding: 20px; color: #888;">Loading your trades...</div>
      </div>
    `;
    
    this.tabContent.appendChild(myTradesContent);
    this.loadMyTrades();
  }
  
  showCreateTab() {
    const createContent = document.createElement('div');
    createContent.innerHTML = `
      <div style="margin-bottom: 20px;">
        <h3 style="margin-bottom: 10px;">Create New Trade</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <label style="display: block; margin-bottom: 5px;">Power to Trade:</label>
            <select id="trade-power" style="width: 100%; padding: 10px; border: 1px solid #533483; border-radius: 5px; background: #2a2a2a; color: white;">
              <option value="">Select a power...</option>
            </select>
          </div>
          <div>
            <label style="display: block; margin-bottom: 5px;">Price (Xats):</label>
            <input type="number" id="trade-price" min="1" style="width: 100%; padding: 10px; border: 1px solid #533483; border-radius: 5px; background: #2a2a2a; color: white;">
          </div>
        </div>
        <div style="margin-top: 20px;">
          <button id="create-trade-btn" style="background: #00AA00; border: none; color: white; padding: 10px 20px; border-radius: 5px; cursor: pointer; width: 100%;">Create Trade</button>
        </div>
      </div>
    `;
    
    this.tabContent.appendChild(createContent);
    this.loadUserPowers();
    
    // Create trade button
    createContent.querySelector('#create-trade-btn').addEventListener('click', () => {
      this.createTrade();
    });
  }
  
  loadMarketTrades() {
    // Simulate loading trades from server
    const tradesList = this.tabContent.querySelector('#trades-list');
    
    // Mock trades data
    const mockTrades = [
      { id: 1, seller: 'User123', power: 'kiss', price: 100, status: 'PENDING' },
      { id: 2, seller: 'PowerTrader', power: 'smile', price: 50, status: 'PENDING' },
      { id: 3, seller: 'XatMaster', power: 'wink', price: 75, status: 'PENDING' }
    ];
    
    tradesList.innerHTML = '';
    
    mockTrades.forEach(trade => {
      const tradeElement = this.createTradeElement(trade);
      tradesList.appendChild(tradeElement);
    });
  }
  
  loadMyTrades() {
    const myTradesList = this.tabContent.querySelector('#my-trades-list');
    
    // Mock my trades data
    const mockMyTrades = [
      { id: 4, seller: 'Me', power: 'cool', price: 200, status: 'PENDING' },
      { id: 5, seller: 'Me', power: 'laugh', price: 150, status: 'ACCEPTED' }
    ];
    
    myTradesList.innerHTML = '';
    
    mockMyTrades.forEach(trade => {
      const tradeElement = this.createTradeElement(trade, true);
      myTradesList.appendChild(tradeElement);
    });
  }
  
  createTradeElement(trade, isMyTrade = false) {
    const tradeDiv = document.createElement('div');
    tradeDiv.style.cssText = `
      background: #2a2a2a;
      border: 1px solid #533483;
      border-radius: 5px;
      padding: 15px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    
    const statusColor = {
      'PENDING': '#FFAA00',
      'ACCEPTED': '#00AA00',
      'DECLINED': '#FF4444',
      'CANCELLED': '#888888',
      'COMPLETED': '#00AA00'
    };
    
    tradeDiv.innerHTML = `
      <div>
        <div style="font-weight: bold; margin-bottom: 5px;">${trade.power.toUpperCase()}</div>
        <div style="font-size: 12px; color: #888;">Seller: ${trade.seller}</div>
        <div style="font-size: 12px; color: #888;">Price: ${trade.price} Xats</div>
        <div style="font-size: 12px; color: ${statusColor[trade.status] || '#888'};">Status: ${trade.status}</div>
      </div>
      <div>
        ${isMyTrade ? 
          `<button class="cancel-trade" data-trade-id="${trade.id}" style="background: #FF4444; border: none; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-left: 5px;">Cancel</button>` :
          `<button class="buy-trade" data-trade-id="${trade.id}" style="background: #00AA00; border: none; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Buy</button>`
        }
      </div>
    `;
    
    // Add event listeners
    if (isMyTrade) {
      tradeDiv.querySelector('.cancel-trade').addEventListener('click', (e) => {
        this.cancelTrade(parseInt(e.target.dataset.tradeId));
      });
    } else {
      tradeDiv.querySelector('.buy-trade').addEventListener('click', (e) => {
        this.buyTrade(parseInt(e.target.dataset.tradeId));
      });
    }
    
    return tradeDiv;
  }
  
  loadUserPowers() {
    // Simulate loading user's powers
    const powerSelect = this.tabContent.querySelector('#trade-power');
    
    // Mock user powers
    const mockPowers = [
      { id: 1, name: 'kiss', cost: 100 },
      { id: 2, name: 'smile', cost: 50 },
      { id: 3, name: 'wink', cost: 75 },
      { id: 4, name: 'cool', cost: 200 },
      { id: 5, name: 'laugh', cost: 150 }
    ];
    
    powerSelect.innerHTML = '<option value="">Select a power...</option>';
    
    mockPowers.forEach(power => {
      const option = document.createElement('option');
      option.value = power.id;
      option.textContent = `${power.name.toUpperCase()} (${power.cost} Xats)`;
      powerSelect.appendChild(option);
    });
  }
  
  createTrade() {
    const powerSelect = this.tabContent.querySelector('#trade-power');
    const priceInput = this.tabContent.querySelector('#trade-price');
    
    const powerId = powerSelect.value;
    const price = parseInt(priceInput.value);
    
    if (!powerId || !price) {
      alert('Please select a power and enter a price.');
      return;
    }
    
    // Simulate creating trade
    const newTrade = {
      id: Date.now(),
      seller: 'Me',
      power: powerSelect.options[powerSelect.selectedIndex].text.split(' ')[0].toLowerCase(),
      price: price,
      status: 'PENDING'
    };
    
    this.myTrades.push(newTrade);
    
    // Show success message
    alert('Trade created successfully!');
    
    // Switch to my trades tab
    this.element.querySelector('[data-tab="my-trades"]').click();
  }
  
  buyTrade(tradeId) {
    // Simulate buying a trade
    if (confirm('Are you sure you want to buy this power?')) {
      // Update trade status
      const trade = this.trades.find(t => t.id === tradeId);
      if (trade) {
        trade.status = 'COMPLETED';
      }
      
      alert('Trade completed successfully!');
      this.loadMarketTrades();
    }
  }
  
  cancelTrade(tradeId) {
    // Simulate canceling a trade
    if (confirm('Are you sure you want to cancel this trade?')) {
      this.myTrades = this.myTrades.filter(t => t.id !== tradeId);
      alert('Trade cancelled successfully!');
      this.loadMyTrades();
    }
  }
  
  // Public API methods
  open() {
    this.element.style.display = 'block';
    this.isOpen = true;
    console.log('💎 Power Trading System opened');
  }
  
  close() {
    this.element.style.display = 'none';
    this.isOpen = false;
    console.log('💎 Power Trading System closed');
  }
  
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  refreshTrades() {
    this.loadMarketTrades();
    this.loadMyTrades();
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PowerTradingSystem;
} else {
  window.PowerTradingSystem = PowerTradingSystem;
}
