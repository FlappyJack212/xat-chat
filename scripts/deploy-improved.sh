#!/bin/bash

# ixchats Deployment Script
# Deploys the improved server with all optimizations

echo "🚀 Starting ixchats improved deployment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  Creating .env from example..."
    cp .env.example .env
    echo "📝 Please edit .env with your configuration before running the server"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run database migrations/setup if needed
echo "🗄️  Setting up database..."
npm run init-db 2>/dev/null || echo "Database already initialized"

# Check if MongoDB is running
echo "🔍 Checking MongoDB connection..."
if ! mongo --eval "db.stats()" > /dev/null 2>&1; then
    echo "❌ MongoDB is not running. Please start MongoDB first."
    echo "   Ubuntu/Debian: sudo systemctl start mongodb"
    echo "   macOS: brew services start mongodb-community"
    echo "   Windows: net start MongoDB"
    exit 1
fi

# Build client assets if needed
echo "🏗️  Building client assets..."
npm run build 2>/dev/null || echo "No build script found, using existing assets"

# Start the improved server
echo "🎉 Starting improved ixchats server..."
echo "   - Security: Enhanced with rate limiting and input validation"
echo "   - Performance: Optimized with compression and caching"
echo "   - Monitoring: Health checks and proper logging"
echo "   - Architecture: Clean, modular, and maintainable"
echo ""

if [ "$NODE_ENV" = "production" ]; then
    echo "🏭 Starting in PRODUCTION mode..."
    node src/server/server-improved.js
else
    echo "🔧 Starting in DEVELOPMENT mode..."
    echo "   Enable debug logging: ?debug=true in URL"
    nodemon src/server/server-improved.js
fi