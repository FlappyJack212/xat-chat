const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/server/config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/avatars', express.static(path.join(__dirname, 'src/server/public/avatars')));
app.use('/smilies', express.static(path.join(__dirname, 'src/server/public/smilies')));
app.use('/sounds', express.static(path.join(__dirname, 'src/server/public/sounds')));
app.use('/audio', express.static(path.join(__dirname, 'src/server/public/audio')));
app.use('/backgrounds', express.static(path.join(__dirname, 'src/server/public/backgrounds')));

// API routes
app.use('/api/auth', require('./src/server/routes/auth'));
app.use('/api/users', require('./src/server/routes/user'));
app.use('/api/user', require('./src/server/routes/user')); // Legacy support
app.use('/api/rooms', require('./src/server/routes/room'));
app.use('/api/room', require('./src/server/routes/room')); // Legacy support
app.use('/api/powers', require('./src/server/routes/powers'));
app.use('/api/avatars', require('./src/server/routes/avatars'));
app.use('/api/smilies', require('./src/server/routes/smilies'));
app.use('/api/messages', require('./src/server/routes/messages'));

// Serve main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('🎭 Xat user connected:', socket.id);
  
  // Handle user joining a room (compatible with xat-engine)
  socket.on('join-room', (data) => {
    socket.join(data.roomId);
    socket.roomId = data.roomId;
    socket.userId = data.userId;
    
    console.log(`User ${data.userId} joined room ${data.roomId}`);
    
    // Notify room of new user
    socket.to(data.roomId).emit('user-joined', {
      id: data.userId,
      username: `User${data.userId}`,
      avatar: '😊',
      status: 'online'
    });
  });
  
  // Handle chat messages (compatible with xat-engine)
  socket.on('send-message', (data) => {
    const message = {
      id: Date.now(),
      userId: data.userId,
      username: `User${data.userId}`,
      text: data.text,
      powerEffect: data.powerEffect,
      timestamp: Date.now()
    };
    
    console.log('📨 Message:', message.text);
    
    // Broadcast to room (including sender for confirmation)
    io.to(data.roomId).emit('message', message);
  });
  
  // Handle power activation (compatible with xat-engine)
  socket.on('power-activated', (data) => {
    console.log('⚡ Power activated:', data.powerName);
    socket.to(socket.roomId).emit('power-activated', data);
  });
  
  // Handle typing indicators (compatible with xat-engine)
  socket.on('user-typing', (data) => {
    socket.to(socket.roomId).emit('user-typing', data);
  });
  
  // Handle nickname changes
  socket.on('nickname-change', (data) => {
    console.log(`👤 Nickname change: ${data.oldNickname} → ${data.newNickname}`);
    
    // Broadcast to room
    socket.to(socket.roomId).emit('nickname-changed', {
      oldNickname: data.oldNickname,
      newNickname: data.newNickname,
      userId: data.userId
    });
  });
  
  // Legacy support for existing events
  socket.on('room:join', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user:join', {
      userId: socket.id,
      timestamp: new Date()
    });
  });
  
  socket.on('message:send', (data) => {
    io.to(data.roomId).emit('message:received', {
      ...data,
      userId: socket.id,
      timestamp: new Date()
    });
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('🚪 User disconnected:', socket.id);
    if (socket.roomId && socket.userId) {
      socket.to(socket.roomId).emit('user-left', socket.userId);
    }
  });
});

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🎭 Xat.com Server running on port ${PORT}`);
  console.log(`📱 Access your fully functional xat chat at:`);
  console.log(`   💎 Full Engine: http://localhost:${PORT}/xat-authentic.html`);
  console.log(`   🎯 Iframe Chat: http://localhost:${PORT}/chat-iframe.html`);
  console.log(`   🏠 Homepage: http://localhost:${PORT}/`);
});