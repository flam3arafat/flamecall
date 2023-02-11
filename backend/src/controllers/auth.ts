import {validationResult} from 'express-validator/check';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const signup = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: any = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        first_name: first_name,
        last_name: last_name
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const login = (req: any, res: any, next: any) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser: any;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error: any = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error: any = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'phoneappsupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ 
        token: token, 
        id: loadedUser._id.toString(),
        first_name: loadedUser.first_name.toString(),
        last_name: loadedUser.last_name.toString() 
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
