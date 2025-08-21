// Set up environment variables for testing
process.env.JWT_SECRET = 'test_jwt_secret';
process.env.MONGODB_URI = 'mongodb://localhost:27017/xat-recreation-test';
process.env.NODE_ENV = 'test';

// Global test setup
jest.setTimeout(10000); // 10 seconds