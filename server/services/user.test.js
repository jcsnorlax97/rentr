const UserService = require('./user');

describe('userService', () => {
  describe('createUser', () => {
    const userDao = {
      createUser: () => 10,
    };
    const userService = new UserService({ userDao });
    const reqBody = {
      email: 'testemail123@gmail.com',
      password: 'testing123',
    };
    it('succeeds', () => {
      const newUserId = userService.createUser(reqBody);
      expect(newUserId).toEqual(10);
    });
  });
});
