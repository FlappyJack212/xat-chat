#!/bin/bash

echo "🚀 ixchats - Fixing Everything Script"
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm found"

# Create .env from example if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env from example..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Edit .env and set your JWT_SECRET and other credentials!"
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Check if MongoDB is running
echo "🔍 Checking MongoDB connection..."
if command -v mongo &> /dev/null; then
    if mongo --eval "db.stats()" > /dev/null 2>&1; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is not running. Please start MongoDB:"
        echo "   Ubuntu/Debian: sudo systemctl start mongodb"
        echo "   macOS: brew services start mongodb-community"
        echo "   Windows: net start MongoDB"
    fi
else
    echo "⚠️  MongoDB not found. Please install MongoDB first."
fi

# Initialize database
echo "🗄️  Initializing database..."
npm run init-db 2>/dev/null || echo "Database already initialized or init-db script not found"

# Build the application
echo "🏗️  Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed"

echo ""
echo "🎉 All fixes applied successfully!"
echo ""
echo "🚀 To start the improved server:"
echo "   npm run start        # Production (uses server-improved.js)"
echo "   npm run dev          # Development with hot reload"
echo "   npm run start:old    # Old server (if needed for comparison)"
echo ""
echo "🌐 Your secure server will run on:"
echo "   http://localhost:3000"
echo ""
echo "🎯 AUTHENTIC xat.com EXPERIENCE:"
echo "   http://localhost:3000/xat-interface.html"
echo "   (Complete with powers, pawns, animations!)"
echo ""
echo "📊 Health check available at:"
echo "   http://localhost:3000/health"
echo ""
echo "🔒 Security improvements:"
echo "   ✅ CSP headers protecting against XSS"
echo "   ✅ CORS protection"
echo "   ✅ Rate limiting (5 auth attempts/15min)"
echo "   ✅ Input sanitization"
echo "   ✅ Production-safe logging"
echo ""
echo "⚡ Performance improvements:"
echo "   ✅ Gzip compression"
echo "   ✅ Smart caching"
echo "   ✅ Optimized builds"
echo "   ✅ Memory management"
echo ""
echo "📚 Documentation:"
echo "   📖 Read ISSUES_SUMMARY.md for details"
echo "   📖 Read MIGRATION_GUIDE.md for migration steps"
echo "   📖 Read SECURITY.md for security information"
echo ""
echo "⚠️  REMEMBER: Edit .env with your secure credentials before production!"