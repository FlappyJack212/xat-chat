const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn()
}), { virtual: true });

jest.mock('bcryptjs', () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn()
}), { virtual: true });

jest.mock('../../models/User', () => {
    const mockUser = jest.fn().mockImplementation(function(data) {
        Object.assign(this, data);
        this._id = 'mock-user-id';
        this.save = jest.fn().mockResolvedValue(this);
    });
    mockUser.findOne = jest.fn();
    mockUser.findById = jest.fn();
    return mockUser;
}, { virtual: true });

const AuthService = require('../../services/AuthService');
const User = require('../../models/User');

describe('AuthService', () => {
    beforeAll(() => {
        // Suppress console logs during tests to keep output clean
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        console.log.mockRestore();
        console.error.mockRestore();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        let req;
        let res;

        beforeEach(() => {
            req = {
                body: {
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123'
                }
            };

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        });

        it('should register a new user successfully', async () => {
            // Arrange
            User.findOne.mockResolvedValue(null);
            jwt.sign.mockReturnValue('mocked-token');
            process.env.JWT_SECRET = 'test-secret';

            // Act
            await AuthService.register(req, res);

            // Assert
            expect(User.findOne).toHaveBeenCalledWith({
                $or: [{ username: 'testuser' }, { email: 'test@example.com' }]
            });
            expect(User).toHaveBeenCalledWith({
                username: 'testuser',
                email: 'test@example.com',
                nickname: 'testuser',
                password: 'password123'
            });
            // check that jwt.sign was called with correct payload
            expect(jwt.sign).toHaveBeenCalledWith(
                { userId: 'mock-user-id' },
                'test-secret',
                { expiresIn: '7d' }
            );
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'User registered successfully',
                token: 'mocked-token',
                user: {
                    id: 'mock-user-id',
                    username: 'testuser',
                    nickname: 'testuser',
                    email: 'test@example.com',
                    avatar: undefined, // These fields are not in our simple mock data
                    xats: undefined,
                    days: undefined
                }
            });
        });

        it('should return 400 if required fields are missing', async () => {
            // Arrange
            req.body = { username: 'testuser' }; // missing email and password

            // Act
            await AuthService.register(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Username, email, and password are required'
            });
            expect(User.findOne).not.toHaveBeenCalled();
        });

        it('should return 400 if user already exists', async () => {
            // Arrange
            User.findOne.mockResolvedValue({ _id: 'existing-id' }); // return an existing user

            // Act
            await AuthService.register(req, res);

            // Assert
            expect(User.findOne).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Username or email already exists'
            });
            expect(User).not.toHaveBeenCalled(); // The constructor should not have been called
        });

        it('should return 500 if an error occurs during registration', async () => {
            // Arrange
            const dbError = new Error('DB Connection Error');
            User.findOne.mockRejectedValue(dbError);

            // Act
            await AuthService.register(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Registration failed: DB Connection Error'
            });
            expect(console.error).toHaveBeenCalled();
        });
    });
});