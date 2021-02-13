const ApiError = require('../error/api-error');

class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  createUser = async (req, res, next) => {
    try {
      const result = await this.userService.createUser(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };
}

module.exports = UserController;
