"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.getContact = exports.createContact = exports.getContacts = void 0;
const check_1 = require("express-validator/check");
const user_1 = __importDefault(require("../models/user"));
const contact_1 = __importDefault(require("../models/contact"));
const getContacts = (req, res, next) => {
    const params = req.params;
    const id = params.userId;
    contact_1.default.find({ 'creator': `${id}` })
        .then(contacts => {
        res.status(200).json({
            message: 'Fetched contacts successfully.',
            contacts: contacts
        });
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.getContacts = getContacts;
const createContact = (req, res, next) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const body = req.body;
    const first_name = body.first_name;
    const last_name = body.last_name;
    const gender = body.gender;
    const phone = body.phone;
    let creator;
    const contact = new contact_1.default({
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        phone: phone,
        creator: body.userId
    });
    contact
        .save()
        .then(result => {
        return user_1.default.findById(body.userId);
    })
        .then(user => {
        creator = user;
        user.contacts.push(contact);
        return user.save();
    })
        .then(result => {
        res.status(201).json({
            message: 'Contact created successfully!',
            contact: contact,
            creator: { _id: creator._id, name: creator.name }
        });
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.createContact = createContact;
const getContact = (req, res, next) => {
    const params = req.params;
    const id = params.contactId;
    console.log(id);
    contact_1.default.findById(id)
        .then(contact => {
        if (!contact) {
            const error = new Error('Could not find contact.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Contact fetched.', contact: contact });
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.getContact = getContact;
const updateContact = (req, res, next) => {
    const params = req.params;
    const id = params.contactId;
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, data is empty!');
        error.statusCode = 422;
        throw error;
    }
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const gender = req.body.gender;
    const phone = req.body.phone;
    contact_1.default.findById(id)
        .then(contact => {
        if (!contact) {
            const error = new Error('Could not find contact.');
            error.statusCode = 404;
            throw error;
        }
        if (contact.creator.toString() !== req.userId) {
            const error = new Error('Not authorized!');
            error.statusCode = 403;
            throw error;
        }
        contact.first_name = first_name,
            contact.last_name = last_name,
            contact.gender = gender,
            contact.phone = phone;
        return contact.save();
    })
        .then(result => {
        res.status(200).json({ message: 'Contact updated!', contact: result });
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.updateContact = updateContact;
const deleteContact = (req, res, next) => {
    const params = req.params;
    const contactId = params.contactId;
    contact_1.default.findById(contactId)
        .then(contact => {
        if (!contact) {
            const error = new Error('Could not find contact.');
            error.statusCode = 404;
            throw error;
        }
        if (contact.creator.toString() !== req.userId) {
            const error = new Error('Not authorized!');
            error.statusCode = 403;
            throw error;
        }
        // Check logged in user
        return contact_1.default.findByIdAndRemove(contactId);
    })
        .then(result => {
        return user_1.default.findById(req.userId);
    })
        .then(user => {
        user.contacts.pull(contactId);
        return user.save();
    })
        .then(result => {
        res.status(200).json({ message: 'Deleted contact succesfully.' });
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.deleteContact = deleteContact;
