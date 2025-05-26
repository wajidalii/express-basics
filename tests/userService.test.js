const userService = require('../services/userService');
const userRepo = require('../repositories/userRepository');

jest.mock('../repositories/userRepository.js');

describe('userService', () => {
    afterEach(() => jest.resetAllMocks());

    test('getUserById – returns user from repo', async () => {
        const fakeUser = { id: 1, name: 'wajid' };
        userRepo.findById.mockResolvedValue(fakeUser);

        const user = await userService.getUserById(1);
        expect(user).toEqual(fakeUser);
        expect(userRepo.findById).toHaveBeenCalledWith(1);
    });
});  