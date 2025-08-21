# Xat Chat Recreation - Setup Guide

This is a recreation of the classic xat.com chat platform from 2007-2016, built with modern web technologies while maintaining the nostalgic feel and features.

## Features

- **Real-time Chat**: Instant messaging with Socket.IO
- **Classic Avatars (Pawns)**: Customizable user avatars
- **Powers System**: Special effects and abilities
- **Smilies**: Classic emoticons and expressions
- **Room Management**: Create, join, and moderate chat rooms
- **User Authentication**: Secure login and registration
- **Classic Theme**: Retro styling reminiscent of the original xat.com
- **Modern Interface**: Responsive design with modern UI elements

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/xat-chat
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

5. **Build the application**
   ```bash
   npm run build
   ```

6. **Start the server**
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

7. **Access the application**
   Open your browser and navigate to `http://localhost:8000`

## Project Structure

```
chat/
├── src/
│   ├── client/           # Frontend code
│   │   ├── css/         # Stylesheets
│   │   ├── index.js     # Main entry point
│   │   ├── chat.js      # Chat functionality
│   │   ├── classic.js   # Classic mode
│   │   └── *.html       # HTML templates
│   └── server/          # Backend code
│       ├── config/      # Database configuration
│       ├── middleware/  # Express middleware
│       ├── models/      # MongoDB models
│       └── routes/      # API routes
├── sounds/              # Audio files
├── avatars/             # Avatar images
├── smilies/             # Smiley images
├── backgrounds/         # Background images
├── server.js           # Main server file
├── webpack.config.js   # Webpack configuration
└── package.json        # Dependencies and scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/friends` - Get user's friends
- `POST /api/user/friends/:friendId` - Add friend
- `DELETE /api/user/friends/:friendId` - Remove friend

### Rooms
- `GET /api/room` - Get all rooms
- `POST /api/room` - Create new room
- `GET /api/room/:roomId` - Get room details
- `PUT /api/room/:roomId` - Update room
- `DELETE /api/room/:roomId` - Delete room
- `POST /api/room/:roomId/join` - Join room
- `POST /api/room/:roomId/leave` - Leave room

### Powers
- `GET /api/powers` - Get all powers
- `GET /api/powers/:powerId` - Get power details
- `POST /api/powers/:powerId/activate` - Activate power

### Avatars
- `GET /api/avatars` - Get all avatars
- `GET /api/avatars/:avatarId` - Get avatar details

### Smilies
- `GET /api/smilies` - Get all smilies
- `GET /api/smilies/:code` - Get smiley details

## Socket.IO Events

### Client to Server
- `room:join` - Join a chat room
- `room:leave` - Leave a chat room
- `message:send` - Send a message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator
- `power:activate` - Activate a power
- `avatar:change` - Change user avatar

### Server to Client
- `message:received` - Receive a message
- `user:join` - User joined room
- `user:leave` - User left room
- `typing:start` - User started typing
- `typing:stop` - User stopped typing
- `power:effect` - Power effect triggered
- `avatar:update` - User avatar updated

## Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build the frontend with webpack
- `npm run watch` - Watch for changes and rebuild
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Adding New Features

1. **New Power**: Add to `src/server/routes/powers.js` and update the Power model
2. **New Avatar**: Add to `src/server/routes/avatars.js` and place image in `avatars/` directory
3. **New Smiley**: Add to `src/server/routes/smilies.js` and place image in `smilies/` directory
4. **New Room Feature**: Extend the Room model and add corresponding routes

### Styling

The application uses a modular CSS approach:
- `normalize.css` - CSS reset
- `main.css` - Base styles
- `xat.css` - Xat-specific styles
- `platform.css` - Platform-specific styles
- `quickbar.css` - Quickbar component styles
- `chat.css` - Chat interface styles

## Deployment

### Production Build

1. Set `NODE_ENV=production` in your environment
2. Run `npm run build` to create optimized assets
3. Start the server with `npm start`

### Environment Variables for Production

```env
NODE_ENV=production
PORT=8000
MONGO_URI=mongodb://your-production-mongo-uri
JWT_SECRET=your-production-jwt-secret
REDIS_URL=redis://your-redis-url
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the `MONGO_URI` in your `.env` file
   - Verify network connectivity

2. **Socket.IO Connection Issues**
   - Check if the server is running on the correct port
   - Ensure CORS is properly configured
   - Check browser console for errors

3. **Build Errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check webpack configuration
   - Verify all dependencies are installed

4. **CSS Not Loading**
   - Ensure webpack build completed successfully
   - Check file paths in CSS imports
   - Verify static file serving is configured

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=*
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes and is not affiliated with xat.com.

## Acknowledgments

- Original xat.com platform for inspiration
- Socket.IO for real-time communication
- MongoDB for data persistence
- Express.js for the web framework
