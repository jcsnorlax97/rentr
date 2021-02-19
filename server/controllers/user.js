const UserDao = require('../dao/user');
const ApiError = require('../error/api-error');

class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  getUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUser(req.params.id);
      if (user == null) {
        next(ApiError.notFound(`User with id ${userId} not found`));
        return;
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
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };

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

  authenticateUser = async (req, res, next) => {
    try {
      const user = await this.userService.getUserViaEmail(req.body.email);
      
      if(!user){
        console.log('No such user')
        res.status(401).json({
          message: 'Please check your login info.'
        })
      }else if(user.password == req.body.password){
        return res.status(200).json({
          message: 'Login succesful.'
        });  
      }

      
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };
}

module.exports = UserController;
