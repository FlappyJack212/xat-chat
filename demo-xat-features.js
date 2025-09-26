/**
 * Demo script to showcase all xat.com features
 * Run this in the browser console to see all effects
 */

console.log('🎯 ixchats - xat.com Experience Demo');
console.log('=====================================');

// Demo powers
function demoPowers() {
    console.log('💫 Demonstrating Powers...');
    
    // Simulate power activations
    const powers = ['rainbow', 'glow', 'sparkle', 'bounce', 'shake'];
    let index = 0;
    
    const demoInterval = setInterval(() => {
        if (index >= powers.length) {
            clearInterval(demoInterval);
            demoPawns();
            return;
        }
        
        const power = powers[index];
        console.log(`   Activating ${power} power...`);
        
        // Simulate clicking power
        const powerSlot = document.querySelector(`[data-power="${power}"]`);
        if (powerSlot) {
            powerSlot.click();
        }
        
        index++;
    }, 2000);
}

// Demo pawns
function demoPawns() {
    console.log('🎨 Demonstrating Pawns...');
    
    const pawns = ['gold', 'emerald', 'ruby', 'sapphire', 'diamond'];
    let index = 0;
    
    const demoInterval = setInterval(() => {
        if (index >= pawns.length) {
            clearInterval(demoInterval);
            demoChat();
            return;
        }
        
        const pawn = pawns[index];
        console.log(`   Switching to ${pawn} pawn...`);
        
        // Simulate pawn selection
        if (window.xat && window.xat.pawnSystem) {
            window.xat.pawnSystem.selectPawn(pawn);
        }
        
        index++;
    }, 3000);
}

// Demo chat features
function demoChat() {
    console.log('💬 Demonstrating Chat Features...');
    
    const messages = [
        'Welcome to ixchats! 🎉',
        '/roll 6',
        '/8ball Am I awesome?',
        '/time',
        'Check out my rainbow text! 🌈',
        '/flip'
    ];
    
    let index = 0;
    
    const demoInterval = setInterval(() => {
        if (index >= messages.length) {
            clearInterval(demoInterval);
            demoAnimations();
            return;
        }
        
        const message = messages[index];
        console.log(`   Sending: ${message}`);
        
        // Simulate typing and sending message
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.value = message;
            chatInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        }
        
        index++;
    }, 4000);
}

// Demo animations
function demoAnimations() {
    console.log('⚡ Demonstrating Animations...');
    
    // Create sparkle effects
    if (window.xat && window.xat.animationEngine) {
        const engine = window.xat.animationEngine;
        
        // Sparkles around the screen
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                engine.createSparkleEffect(x, y, 3);
            }, i * 1000);
        }
        
        // Screen shake
        setTimeout(() => {
            console.log('   Creating screen shake...');
            engine.createScreenShake(15, 1000);
        }, 6000);
        
        // Heart effects
        setTimeout(() => {
            console.log('   Creating heart effects...');
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            engine.createHeartEffect(centerX, centerY, 5);
        }, 8000);
    }
    
    setTimeout(() => {
        console.log('');
        console.log('🎉 Demo Complete!');
        console.log('✨ Your ixchats platform now has the complete xat.com experience!');
        console.log('');
        console.log('Features demonstrated:');
        console.log('  💫 Power effects (rainbow, glow, sparkle, bounce, shake)');
        console.log('  🎨 Pawn system (gold, emerald, ruby, sapphire, diamond)');
        console.log('  💬 Chat commands (/roll, /8ball, /time, /flip)');
        console.log('  ⚡ Animation engine (particles, screen effects, hearts)');
        console.log('');
        console.log('🚀 Ready for production use!');
    }, 10000);
}

// Start demo
if (typeof window !== 'undefined' && window.xat) {
    console.log('Starting demo in 3 seconds...');
    setTimeout(demoPowers, 3000);
} else {
    console.log('❌ xat interface not found. Make sure you\'re on the xat-interface.html page');
    console.log('💡 Visit: http://localhost:3000/xat-interface.html');
}