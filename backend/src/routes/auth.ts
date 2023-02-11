import express from 'express';
import { body } from 'express-validator/check';

import User from '../models/user';
import * as authController from '../controllers/auth';

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 6 }),
    body('first_name')
      .trim()
      .not()
      .isEmpty(),
      body('last_name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

router.post('/login', authController.login);

export default router;
