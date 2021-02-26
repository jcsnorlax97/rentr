const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ApiError = require('../error/api-error');

const { env } = process;

class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  getUserViaId = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserViaId(req.params.id);
      if (user == null) {
        next(ApiError.notFound(`User with id ${userId} not found`));
      }
      res.status(200).json(user);
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };

  getUserViaEmail = async (req, res, next) => {
    try {
      const userEmail = req.params.email;
      const user = await this.userService.getUserViaEmail(req.params.email);
      if (user == null) {
        next(ApiError.notFound(`User with email ${userEmail} not found`));
      }
      res.status(200).json(user);
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };

  createUser = async (req, res, next) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      const userId = await this.userService.createUser({
        email: req.body.email,
        password: hash,
      });
      res.status(201).json({
        message: `User has been created successfully!`,
        userId: `${userId}`,
      });
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };

  authenticateUser = async (req, res, next) => {
    try {
      const user = await this.userService.getUserViaEmail(req.body.email);
      if (!user) {
        console.log('No such user');
        next(ApiError.unauthenticated('Please check your login info.'));
      } else if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            userId: user.userId,
            email: user.email,
          },
          env.JWT_KEY,
          {
            expiresIn: '1h',
          }
        );
        return res.status(200).json({
          message: 'Login successful.',
          token,
        });
      }
      next(
        ApiError.unauthenticated(`The login email or password is not valid.`)
      );
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };
}

module.exports = UserController;
