"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const check_1 = require("express-validator/check");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const signup = (req, res, next) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password;
    bcryptjs_1.default
        .hash(password, 12)
        .then(hashedPw => {
        const user = new user_1.default({
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
exports.signup = signup;
const login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    user_1.default.findOne({ email: email })
        .then(user => {
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcryptjs_1.default.compare(password, user.password);
    })
        .then(isEqual => {
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jsonwebtoken_1.default.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        }, 'phoneappsupersecretsecret', { expiresIn: '1h' });
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
exports.login = login;
