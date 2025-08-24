/**
 * ⚡ BLAST EFFECTS SYSTEM - Flash to JavaScript Migration
 * Replaces Flash visual effects with pure JavaScript
 * Based on Adobe's AS3 to JavaScript Migration Guidelines
 */

class BlastEffectsSystem {
  constructor(container) {
    this.container = container;
    this.effects = [];
    this.canvas = null;
    this.ctx = null;
    
    // Blast effect types (from Ixat Files)
    this.effectTypes = {
      blastban: { duration: 2000, color: '#FF0000', text: 'BANNED' },
      blastkick: { duration: 1500, color: '#FF6600', text: 'KICKED' },
      blastpro: { duration: 2000, color: '#00FF00', text: 'PROMOTED' },
      blastde: { duration: 2000, color: '#FF0000', text: 'DEMOTED' }
    };
    
    // Rank colors (from Ixat Files)
    this.rankColors = {
      1: '#FF0000', // Main Owner - Red
      2: '#FFFFFF', // Mod - White
      3: '#3366FF', // Member - Blue
      4: '#FF9900', // Owner - Orange
      5: '#009900'  // Guest - Green
    };
    
    this.init();
  }
  
  init() {
    // Create canvas for effects
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 1000;
    `;
    
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    // Start animation loop
    this.startAnimationLoop();
  }
  
  startAnimationLoop() {
    const animate = () => {
      this.update();
      this.render();
      requestAnimationFrame(animate);
    };
    animate();
  }
  
  update() {
    const now = Date.now();
    
    // Update effects
    this.effects = this.effects.filter(effect => {
      effect.age = now - effect.startTime;
      return effect.age < effect.duration;
    });
  }
  
  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Render all active effects
    this.effects.forEach(effect => {
      this.renderEffect(effect);
    });
  }
  
  renderEffect(effect) {
    const progress = effect.age / effect.duration;
    
    switch(effect.type) {
      case 'blastban':
        this.renderBlastBan(effect, progress);
        break;
      case 'blastkick':
        this.renderBlastKick(effect, progress);
        break;
      case 'blastpro':
        this.renderBlastPro(effect, progress);
        break;
      case 'blastde':
        this.renderBlastDe(effect, progress);
        break;
      case 'textblast':
        this.renderTextBlast(effect, progress);
        break;
    }
  }
  
  renderBlastBan(effect, progress) {
    // Create expanding circle effect
    const radius = 50 + (progress * 200);
    const alpha = 1 - progress;
    
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    
    // Outer glow
    const gradient = this.ctx.createRadialGradient(
      effect.x, effect.y, 0,
      effect.x, effect.y, radius
    );
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Inner circle
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
    this.ctx.beginPath();
    this.ctx.arc(effect.x, effect.y, radius * 0.3, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }
  
  renderBlastKick(effect, progress) {
    // Create directional blast effect
    const distance = progress * 300;
    const alpha = 1 - progress;
    
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    
    // Create blast trail
    const gradient = this.ctx.createLinearGradient(
      effect.x, effect.y,
      effect.x + distance, effect.y
    );
    gradient.addColorStop(0, 'rgba(255, 102, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 102, 0, 0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(effect.x, effect.y - 20, distance, 40);
    
    // Blast center
    this.ctx.fillStyle = 'rgba(255, 102, 0, 0.9)';
    this.ctx.beginPath();
    this.ctx.arc(effect.x, effect.y, 30, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }
  
  renderBlastPro(effect, progress) {
    // Create promotion sparkle effect
    const alpha = 1 - progress;
    
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    
    // Sparkles
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const distance = 50 + (progress * 100);
      const x = effect.x + Math.cos(angle) * distance;
      const y = effect.y + Math.sin(angle) * distance;
      
      this.ctx.fillStyle = '#00FF00';
      this.ctx.beginPath();
      this.ctx.arc(x, y, 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // Center glow
    const gradient = this.ctx.createRadialGradient(
      effect.x, effect.y, 0,
      effect.x, effect.y, 60
    );
    gradient.addColorStop(0, 'rgba(0, 255, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(effect.x, effect.y, 60, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }
  
  renderBlastDe(effect, progress) {
    // Create demotion effect (similar to ban but different color)
    const radius = 50 + (progress * 200);
    const alpha = 1 - progress;
    
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    
    // Outer glow
    const gradient = this.ctx.createRadialGradient(
      effect.x, effect.y, 0,
      effect.x, effect.y, radius
    );
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Down arrow
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
    this.ctx.beginPath();
    this.ctx.moveTo(effect.x, effect.y - 20);
    this.ctx.lineTo(effect.x - 15, effect.y + 10);
    this.ctx.lineTo(effect.x + 15, effect.y + 10);
    this.ctx.closePath();
    this.ctx.fill();
    
    this.ctx.restore();
  }
  
  renderTextBlast(effect, progress) {
    // Create text blast effect
    const alpha = 1 - progress;
    const scale = 1 + (progress * 0.5);
    const yOffset = progress * -50;
    
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.translate(effect.x, effect.y + yOffset);
    this.ctx.scale(scale, scale);
    
    // Text shadow
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(effect.text, 2, 2);
    
    // Main text
    this.ctx.fillStyle = effect.color;
    this.ctx.fillText(effect.text, 0, 0);
    
    this.ctx.restore();
  }
  
  // Public API methods
  createBlast(type, x, y, options = {}) {
    const effectType = this.effectTypes[type];
    if (!effectType) return;
    
    const effect = {
      type: type,
      x: x,
      y: y,
      startTime: Date.now(),
      duration: options.duration || effectType.duration,
      color: options.color || effectType.color,
      text: options.text || effectType.text
    };
    
    this.effects.push(effect);
    console.log(`⚡ Created blast effect: ${type} at (${x}, ${y})`);
  }
  
  createTextBlast(text, x, y, color, duration = 2000) {
    const effect = {
      type: 'textblast',
      x: x,
      y: y,
      text: text,
      color: color,
      startTime: Date.now(),
      duration: duration
    };
    
    this.effects.push(effect);
    console.log(`⚡ Created text blast: "${text}" at (${x}, ${y})`);
  }
  
  createRankBlast(rank, x, y) {
    const color = this.rankColors[rank];
    const rankNames = {
      1: 'MAIN OWNER',
      2: 'MODERATOR',
      3: 'MEMBER',
      4: 'OWNER',
      5: 'GUEST'
    };
    
    this.createTextBlast(rankNames[rank], x, y, color);
  }
  
  clearEffects() {
    this.effects = [];
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BlastEffectsSystem;
} else {
  window.BlastEffectsSystem = BlastEffectsSystem;
}
