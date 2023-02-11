import {validationResult} from 'express-validator/check';
import User from '../models/user';
import Contact from '../models/contact';
import { Types } from 'mongoose';

type RequestParams = { contactId: Number };
type RequestParam = { userId: string };
type RequestBody = { 
    first_name: string,
    last_name: string,
    gender: string,
    phone: string,
    userId: string
};


export const getContacts = (req, res, next) => {
  const params = req.params as RequestParam;
    const id = params.userId;
    Contact.find({'creator' : `${id}`})
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
  
  export const createContact = (req, res, next) => {
    const errors: any = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    const body = req.body as RequestBody;
    const first_name = body.first_name;
    const last_name = body.last_name;
    const gender = body.gender;
    const phone = body.phone;
    let creator;
    const contact = new Contact({
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      phone: phone,
      creator: body.userId
    });
    contact
      .save()
      .then(result => {
        return User.findById(body.userId);
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
  
  export const getContact = (req, res, next) => {
    const params = req.params as RequestParams;
    const id = params.contactId;
    console.log(id);
    Contact.findById(id)
      .then(contact => {
        if (!contact) {
          const error: any = new Error('Could not find contact.');
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
  
  export const updateContact = (req, res, next) => {
    const params = req.params as RequestParams;
    const id = params.contactId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error('Validation failed, data is empty!');
      error.statusCode = 422;
      throw error;
    }
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const gender = req.body.gender;
    const phone = req.body.phone;
    Contact.findById(id)
      .then(contact => {
        if (!contact) {
          const error: any = new Error('Could not find contact.');
          error.statusCode = 404;
          throw error;
        }
        if (contact.creator.toString() !== req.userId) {
          const error: any = new Error('Not authorized!');
          error.statusCode = 403;
          throw error;
        }
        contact.first_name = first_name,
        contact.last_name = last_name,
        contact.gender = gender,
        contact.phone = phone
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
  
  export const deleteContact = (req, res, next) => {
    const params = req.params as RequestParams;
    const contactId = params.contactId;
    Contact.findById(contactId)
      .then(contact => {
        if (!contact) {
          const error: any = new Error('Could not find contact.');
          error.statusCode = 404;
          throw error;
        }
        if (contact.creator.toString() !== req.userId) {
          const error: any = new Error('Not authorized!');
          error.statusCode = 403;
          throw error;
        }
        // Check logged in user
        return Contact.findByIdAndRemove(contactId);
      })
      .then(result => {
        return User.findById(req.userId);
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