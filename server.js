const mongoose = require('mongoose');
const IxatServer = require('./src/server/ixatServer');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ixat_chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('🎭 [DATABASE] Connected to MongoDB');
    
    // Create and start the Ixat server
    const server = new IxatServer();
    server.start(8000);
    
}).catch(err => {
    console.error('🎭 [DATABASE] MongoDB connection error:', err);
    process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('🎭 [SERVER] Shutting down gracefully...');
    mongoose.connection.close();
    console.log('🎭 [DATABASE] MongoDB connection closed');
    process.exit(0);
});