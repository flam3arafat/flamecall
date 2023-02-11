"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'PhoneBook App New User!'
    },
    contacts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Contact'
        }
    ]
});
exports.default = mongoose_1.model('User', userSchema);
