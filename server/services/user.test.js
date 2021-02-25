const UserService = require('./user');

describe('userService', () => {
  describe('getUser successfully (200)', () => {
    // GIVEN
    const user = {
      email: 'testemail123@gmail.com',
      password: 'testing123',
    };
    const userDao = {
      getUser: (_) => user,
    };
    const userService = new UserService({ userDao });
    const id = 111;

    it('200', () => {
      // WHEN
      const result = userService.getUser(id);

      // THEN
      expect(result.email).toEqual('testemail123@gmail.com');
      expect(result.password).toEqual('testing123');
    });
  });

  describe('getUser failed due to user not found (404)', () => {
    // GIVEN
    const user = null;
    const userDao = {
      getUser: (_) => user,
    };
    const userService = new UserService({ userDao });
    const id = 111;

    it('404', () => {
      // WHEN
      const result = userService.getUser(id);

      // THEN
      expect(result).toEqual(null);
    });
  });

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
