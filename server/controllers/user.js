const userService = require('../services/user');

class UserController {
  createUser = async (req, res) => {
    try {
      console.log(req.body);
      const result = await userService.createUser(req.body);

      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: `${err}'` });
    }
  };
}

module.exports = new UserController();
