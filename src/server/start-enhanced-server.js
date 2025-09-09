const IxatServerIntegration = require('./ixat-server-integration');

// Load environment variables
require('dotenv').config();

console.log('🚀 [ENHANCED-SERVER] Starting Enhanced Ixat Server...');

// Create enhanced server instance
const enhancedServer = new IxatServerIntegration();

console.log('🎭 [ENHANCED-SERVER] Features enabled:');
console.log('   - Flash-to-JavaScript Integration');
console.log('   - Perfect Integration System');
console.log('   - Performance Monitoring');
console.log('   - Memory Management');
console.log('   - Enhanced Event System');
console.log('   - Power System');
console.log('   - Trade System');
console.log('   - Private Messaging');
console.log('   - Friend System');

// Start the server
enhancedServer.start();

console.log('🎉 [ENHANCED-SERVER] Enhanced Ixat Server started successfully!');
console.log('🌐 [ENHANCED-SERVER] Server running at http://localhost:8000');
console.log('🔌 [ENHANCED-SERVER] Socket.IO server ready for connections');
console.log('📊 [ENHANCED-SERVER] Performance monitoring active');
console.log('🧠 [ENHANCED-SERVER] Memory management active');
console.log('📡 [ENHANCED-SERVER] Event system active');

// Log server status
setTimeout(() => {
    const metrics = enhancedServer.getPerformanceMetrics();
    console.log('📋 [ENHANCED-SERVER] Server status:', {
        isRunning: true,
        uptime: Math.round(metrics.uptime),
        features: [
            'Flash-to-JavaScript Integration',
            'Perfect Integration System',
            'Performance Monitoring',
            'Memory Management',
            'Enhanced Event System',
            'Power System',
            'Trade System',
            'Private Messaging',
            'Friend System'
        ]
    });
}, 1000);
