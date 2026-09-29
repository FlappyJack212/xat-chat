const mockTransporter = {
    verify: jest.fn().mockResolvedValue(true),
    sendMail: jest.fn()
};

jest.mock('nodemailer', () => ({
    createTestAccount: jest.fn().mockResolvedValue({
        user: 'test@example.com',
        pass: 'testpass'
    }),
    createTransport: jest.fn().mockReturnValue(mockTransporter)
}), { virtual: true });

const nodemailer = require('nodemailer');
const EmailService = require('../../services/emailService');

describe('EmailService', () => {
    let emailService;

    beforeEach(() => {
        jest.clearAllMocks();

        // Reset specific mocks if needed
        mockTransporter.verify.mockResolvedValue(true);
        nodemailer.createTestAccount.mockResolvedValue({
            user: 'test@example.com',
            pass: 'testpass'
        });
        nodemailer.createTransport.mockReturnValue(mockTransporter);

        // Suppress console logs for cleaner test output
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});

        emailService = new EmailService();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('constructor', () => {
        it('should initialize with correct default values', () => {
            expect(emailService.transporter).toBeNull();
            expect(emailService.isInitialized).toBe(false);
        });
    });

    describe('initialize', () => {
        it('should initialize the email service successfully', async () => {
            await emailService.initialize();

            expect(nodemailer.createTestAccount).toHaveBeenCalledTimes(1);
            expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
            expect(nodemailer.createTransport).toHaveBeenCalledWith({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: 'test@example.com',
                    pass: 'testpass'
                }
            });
            expect(mockTransporter.verify).toHaveBeenCalledTimes(1);

            expect(emailService.isInitialized).toBe(true);
            expect(emailService.transporter).toBe(mockTransporter);
            expect(console.log).toHaveBeenCalledWith('🎭 [EMAIL] Email service initialized successfully');
        });

        it('should not re-initialize if already initialized', async () => {
            emailService.isInitialized = true;

            await emailService.initialize();

            expect(nodemailer.createTestAccount).not.toHaveBeenCalled();
            expect(nodemailer.createTransport).not.toHaveBeenCalled();
            expect(mockTransporter.verify).not.toHaveBeenCalled();
        });

        it('should handle errors during initialization', async () => {
            const error = new Error('Failed to create account');
            nodemailer.createTestAccount.mockRejectedValueOnce(error);

            await expect(emailService.initialize()).rejects.toThrow('Failed to create account');

            expect(emailService.isInitialized).toBe(false);
            expect(emailService.transporter).toBeNull();
            expect(console.error).toHaveBeenCalledWith('🎭 [EMAIL] Failed to initialize email service:', error);
        });

        it('should handle verification errors', async () => {
            const error = new Error('Failed to verify connection');
            mockTransporter.verify.mockRejectedValueOnce(error);

            await expect(emailService.initialize()).rejects.toThrow('Failed to verify connection');

            expect(emailService.isInitialized).toBe(false);
            // transporter was set before verify failed
            expect(emailService.transporter).toBe(mockTransporter);
            expect(console.error).toHaveBeenCalledWith('🎭 [EMAIL] Failed to initialize email service:', error);
        });
    });
});
