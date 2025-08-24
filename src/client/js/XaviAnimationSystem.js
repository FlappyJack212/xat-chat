/**
 * 🎭 XAVI ANIMATION SYSTEM - Flash to JavaScript Migration
 * Replaces Flash avatar animations with pure JavaScript
 * Based on Adobe's AS3 to JavaScript Migration Guidelines
 */

class XaviAnimationSystem {
  constructor(container) {
    this.container = container;
    this.canvas = null;
    this.ctx = null;
    this.animations = {};
    this.currentAnimation = null;
    this.frameRate = 25; // FPS
    this.frameCount = 0;
    
    // Avatar parts (equivalent to Flash MovieClips)
    this.parts = {
      head: { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, visible: true },
      hair: { x: 0, y: -25, rotation: 0, scaleX: 1, scaleY: 1, visible: true },
      xeyel: { x: 2, y: 0, rotation: 0, scaleX: 1, scaleY: 1, visible: true },
      xeyer: { x: -2, y: 0, rotation: 0, scaleX: 1, scaleY: 1, visible: true },
      xeyers: { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, visible: true },
      xeyel: { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, visible: true },
      mouth: { x: 0, y: 15, rotation: 0, scaleX: 1, scaleY: 1, visible: true },
      browsl: { x: 2, y: -11, rotation: 0, scaleX: 1, scaleY: 1, visible: true },
      browsr: { x: -2, y: -11, rotation: 0, scaleX: 1, scaleY: 1, visible: true },
      acc: { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, visible: true }
    };
    
    // Animation data (from Ixat Files)
    this.animationData = {
      smile: {
        mouth: [
          { y: 0, a: "smile", x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 },
          { y: 0, a: "unsmile", x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }
        ],
        xface: [
          { y: 0, x: 0 }, { y: -15, x: 0 }, { y: -27, x: 3 }, { y: -27, x: 3 },
          { y: -27, x: 3 }, { y: -27, x: 3 }, { y: -27, x: 3 }, { y: -27, x: 3 },
          { y: -27, x: 3 }, { y: -27, x: 3 }, { y: -27, x: 3 }, { y: -27, x: 3 },
          { y: -27, x: 3 }, { y: -27, x: 3 }, { y: -27, x: 3 }, { y: -27, x: 3 },
          { y: -27, x: 3 }, { y: -27, x: 3 }, { y: -27, x: 3 }, { y: -27, x: 3 },
          { y: -27, x: 3 }, { y: -27, x: 3 }, { y: -27, x: 3 }, { y: -27, x: 3 },
          { y: -15, x: 0 }
        ]
      },
      wink: {
        mouth: [
          { y: 0, a: "wink", x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 },
          { y: 0, x: 0 }, { y: 0, a: "unwink", x: 0 }, { y: 0, x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 },
          { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }, { y: 0, x: 0 }
        ],
        xeyer: [
          { y: 0, x: 0 }, { y: 3, x: 18 }, { y: -2, x: 55 }, { y: -2, x: 55 },
          { y: -2, x: 55 }, { y: -2, x: 55 }, { y: -2, x: 55 }, { y: -2, x: 55 },
          { y: -2, x: 55 }, { y: -2, x: 55 }, { y: -2, x: 55 }, { y: -2, x: 55 },
          { y: -2, x: 55 }, { y: -2, x: 55 }, { y: -2, x: 55 }, { y: -2, x: 55 },
          { y: -2, x: 55 }, { y: -2, x: 55 }, { y: -2, x: 55 }, { y: -2, x: 55 },
          { y: -2, x: 55 }, { y: -2, x: 55 }, { y: -2, x: 55 }, { y: -2, x: 55 },
          { y: -2, x: 55 }, { y: -2, x: 55 }, { y: -2, x: 55 }, { y: -2, x: 55 },
          { y: 3, x: 18 }, { y: 3, x: 18 }, { y: 3, x: 18 }, { y: 3, x: 18 },
          { y: 3, x: 18 }, { y: 3, x: 18 }, { y: 3, x: 18 }, { y: 3, x: 18 }
        ]
      }
    };
    
    this.init();
  }
  
  init() {
    // Create canvas (equivalent to Flash Stage)
    this.canvas = document.createElement('canvas');
    this.canvas.width = 200;
    this.canvas.height = 200;
    this.canvas.style.cssText = `
      border: 1px solid #333;
      background: transparent;
      display: block;
      margin: 0 auto;
    `;
    
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    // Start animation loop (equivalent to Flash enterFrame)
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
    if (this.currentAnimation) {
      this.frameCount++;
      
      // Update animation frames
      Object.keys(this.currentAnimation).forEach(partName => {
        const frames = this.currentAnimation[partName];
        const frameIndex = Math.floor(this.frameCount / this.frameRate) % frames.length;
        const frame = frames[frameIndex];
        
        if (frame) {
          this.parts[partName].x = frame.x || 0;
          this.parts[partName].y = frame.y || 0;
          this.parts[partName].rotation = frame.r || 0;
          this.parts[partName].scaleX = frame.sx || 1;
          this.parts[partName].scaleY = frame.sy || 1;
          
          // Handle special actions
          if (frame.a) {
            this.handleAction(frame.a, partName);
          }
        }
      });
    }
  }
  
  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Render avatar parts (equivalent to Flash DisplayObjects)
    Object.keys(this.parts).forEach(partName => {
      const part = this.parts[partName];
      if (part.visible) {
        this.renderPart(partName, part);
      }
    });
  }
  
  renderPart(partName, part) {
    // Save context
    this.ctx.save();
    
    // Apply transformations (equivalent to Flash Matrix)
    this.ctx.translate(part.x + 100, part.y + 100);
    this.ctx.rotate(part.rotation * Math.PI / 180);
    this.ctx.scale(part.scaleX, part.scaleY);
    
    // Draw part (placeholder - would load actual avatar images)
    this.ctx.fillStyle = this.getPartColor(partName);
    this.ctx.fillRect(-10, -10, 20, 20);
    
    // Add part label
    this.ctx.fillStyle = 'white';
    this.ctx.font = '10px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(partName, 0, 0);
    
    // Restore context
    this.ctx.restore();
  }
  
  getPartColor(partName) {
    const colors = {
      head: '#FFB6C1',
      hair: '#8B4513',
      xeyel: '#000000',
      xeyer: '#000000',
      mouth: '#FF0000',
      browsl: '#8B4513',
      browsr: '#8B4513',
      acc: '#FFD700'
    };
    return colors[partName] || '#CCCCCC';
  }
  
  handleAction(action, partName) {
    switch(action) {
      case 'smile':
        this.parts.mouth.scaleX = 1.2;
        this.parts.mouth.scaleY = 0.8;
        break;
      case 'unsmile':
        this.parts.mouth.scaleX = 1;
        this.parts.mouth.scaleY = 1;
        break;
      case 'wink':
        this.parts.xeyer.scaleX = 0.1;
        this.parts.xeyer.scaleY = 0.1;
        break;
      case 'unwink':
        this.parts.xeyer.scaleX = 1;
        this.parts.xeyer.scaleY = 1;
        break;
    }
  }
  
  // Public API methods
  playAnimation(animationName) {
    if (this.animationData[animationName]) {
      this.currentAnimation = this.animationData[animationName];
      this.frameCount = 0;
      console.log(`🎭 Playing animation: ${animationName}`);
    }
  }
  
  stopAnimation() {
    this.currentAnimation = null;
    this.frameCount = 0;
  }
  
  setXaviData(xaviJson) {
    try {
      const xavi = JSON.parse(xaviJson);
      Object.keys(xavi).forEach(partName => {
        if (this.parts[partName]) {
          const part = xavi[partName];
          this.parts[partName].x = part.x || 0;
          this.parts[partName].y = part.y || 0;
          this.parts[partName].rotation = part.r || 0;
          this.parts[partName].scaleX = part.sx || 1;
          this.parts[partName].scaleY = part.sy || 1;
        }
      });
    } catch (e) {
      console.error('Invalid Xavi data:', e);
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = XaviAnimationSystem;
} else {
  window.XaviAnimationSystem = XaviAnimationSystem;
}
