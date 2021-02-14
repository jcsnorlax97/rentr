const ApiError = require('../error/api-error');

class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  createUser = async (req, res, next) => {
    try {
      const userId = await this.userService.createUser(req.body);
      res.status(201).json({
        message: `User has been created successfully!`,
        userId: `${userId}`,
      });
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };
}

module.exports = UserController;
