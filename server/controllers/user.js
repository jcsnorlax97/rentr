const userService = require('../services/user');
const ApiError = require('../error/api-error');

class UserController {
  createUser = async (req, res, next) => {
    try {
      const result = await userService.createUser(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };
}

module.exports = new UserController();
