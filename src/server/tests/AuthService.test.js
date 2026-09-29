const mockJwt = {
    sign: jest.fn(),
    verify: jest.fn()
};

const mockBcrypt = {
    compare: jest.fn(),
    hash: jest.fn()
};

const mockMongoose = {
    Schema: jest.fn(),
    model: jest.fn()
};

jest.mock('jsonwebtoken', () => mockJwt, { virtual: true });
jest.mock('bcryptjs', () => mockBcrypt, { virtual: true });
jest.mock('mongoose', () => mockMongoose, { virtual: true });

const mockUser = {
    findOne: jest.fn(),
    findById: jest.fn(),
};

jest.mock('../models/User', () => mockUser, { virtual: true });

const AuthService = require('../services/AuthService');

describe('AuthService.login', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();

        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return 400 if username or password is missing', async () => {
        req.body = { username: 'testuser' };
        await AuthService.login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Username and password are required'
        });

        req.body = { password: 'password123' };
        await AuthService.login(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 401 if user is not found', async () => {
        req.body = { username: 'testuser', password: 'password123' };
        mockUser.findOne.mockResolvedValue(null);

        await AuthService.login(req, res);

        expect(mockUser.findOne).toHaveBeenCalledWith({
            $or: [
                { username: 'testuser' },
                { email: 'testuser' }
            ]
        });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Invalid username or password'
        });
    });

    it('should return 401 if password is invalid', async () => {
        req.body = { username: 'testuser', password: 'wrongpassword' };
        const userMock = {
            comparePassword: jest.fn().mockResolvedValue(false)
        };
        mockUser.findOne.mockResolvedValue(userMock);

        await AuthService.login(req, res);

        expect(userMock.comparePassword).toHaveBeenCalledWith('wrongpassword');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Invalid username or password'
        });
    });

    it('should return 200 with token and user data on successful login', async () => {
        req.body = { username: 'testuser', password: 'correctpassword' };

        const saveMock = jest.fn().mockResolvedValue(true);
        const userInstance = {
            _id: 'user_id_123',
            username: 'testuser',
            nickname: 'Test User',
            email: 'test@example.com',
            avatar: 'avatar.png',
            xats: 100,
            days: 10,
            rank: 1,
            comparePassword: jest.fn().mockResolvedValue(true),
            save: saveMock
        };

        mockUser.findOne.mockResolvedValue(userInstance);
        mockJwt.sign.mockReturnValue('mocked_token');

        await AuthService.login(req, res);

        expect(userInstance.comparePassword).toHaveBeenCalledWith('correctpassword');
        expect(userInstance.isOnline).toBe(true);
        expect(userInstance.lastSeen).toBeDefined();
        expect(saveMock).toHaveBeenCalled();

        expect(mockJwt.sign).toHaveBeenCalledWith(
            { userId: 'user_id_123' },
            expect.any(String),
            { expiresIn: '7d' }
        );

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Login successful',
            token: 'mocked_token',
            user: {
                id: 'user_id_123',
                username: 'testuser',
                nickname: 'Test User',
                email: 'test@example.com',
                avatar: 'avatar.png',
                xats: 100,
                days: 10,
                rank: 1
            }
        });
    });

    it('should return 500 if an error occurs', async () => {
        req.body = { username: 'testuser', password: 'password123' };
        mockUser.findOne.mockRejectedValue(new Error('Database error'));

        await AuthService.login(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Login failed: Database error'
        });
    });
});
