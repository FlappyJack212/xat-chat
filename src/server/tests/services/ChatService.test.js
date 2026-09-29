jest.mock('mongoose', () => {
    const Schema = function() {
        return {
            index: jest.fn(),
            methods: {},
            statics: {},
            virtual: jest.fn().mockReturnValue({ get: jest.fn() }),
            pre: jest.fn(),
            post: jest.fn()
        };
    };
    Schema.Types = { ObjectId: jest.fn() };

    return {
        Schema,
        model: jest.fn(),
        Types: {
            ObjectId: jest.fn()
        }
    };
}, { virtual: true });

jest.mock('bcryptjs', () => ({
    hash: jest.fn(),
    compare: jest.fn()
}), { virtual: true });

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn()
}), { virtual: true });

const ChatService = require('../../services/ChatService');
const Room = require('../../models/Room');

jest.mock('../../models/Room', () => {
    return jest.fn().mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(true)
    }));
});

describe('ChatService', () => {
    describe('createRoom', () => {
        let saveMock;

        beforeEach(() => {
            saveMock = jest.fn().mockResolvedValue(true);
            Room.mockImplementation(() => {
                return {
                    save: saveMock
                };
            });
            Room.mockClear();
            jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should successfully create a room with default values', async () => {
            const ownerId = 'user-123';
            const roomData = {
                name: 'Test Room',
                description: 'A room for testing'
            };

            const result = await ChatService.createRoom(ownerId, roomData);

            expect(Room).toHaveBeenCalledTimes(1);
            expect(Room).toHaveBeenCalledWith(expect.objectContaining({
                name: 'Test Room',
                description: 'A room for testing',
                bg: 'http://oi60.tinypic.com/1r6io9.jpg',
                createdBy: 'user-123',
                settings: {
                    isPrivate: false,
                    allowGuests: true,
                    maxUsers: 100
                }
            }));

            // save is called twice: once for initial save, once after adding admin
            expect(saveMock).toHaveBeenCalledTimes(2);
            expect(result.admins).toEqual(['user-123']);
        });

        it('should successfully create a room with custom values', async () => {
            const ownerId = 'user-456';
            const roomData = {
                name: 'Custom Room',
                description: 'Custom description',
                background: 'http://example.com/bg.jpg',
                isPrivate: true,
                allowGuests: false,
                maxUsers: 50
            };

            const result = await ChatService.createRoom(ownerId, roomData);

            expect(Room).toHaveBeenCalledWith(expect.objectContaining({
                name: 'Custom Room',
                description: 'Custom description',
                bg: 'http://example.com/bg.jpg',
                createdBy: 'user-456',
                settings: {
                    isPrivate: true,
                    allowGuests: false,
                    maxUsers: 50
                }
            }));
        });

        it('should throw an error and log to console if room save fails', async () => {
            saveMock.mockRejectedValueOnce(new Error('Database error'));

            await expect(ChatService.createRoom('user-123', { name: 'Failing Room' }))
                .rejects
                .toThrow('Database error');

            expect(console.error).toHaveBeenCalledWith('Create room error:', expect.any(Error));
        });
    });
});
