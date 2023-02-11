import express from 'express';
import { body } from 'express-validator/check';

import * as contactController from '../controllers/contact';
import auth from '../middleware/is-auth';

const router = express.Router();

// GET /contact/contacts
router.get('/contacts/:userId', auth, contactController.getContacts);

// POST /contact/post
router.post(
  '/contact',
  auth,
  [
    body('first_name')
      .trim(),
      body('last_name')
      .trim(),
      body('gender')
      .trim(),
    body('phone')
      .trim()
  ],
  contactController.createContact
);

router.get('/contact/:contactId', auth, contactController.getContact);

router.put(
  '/contact/:contactId',
  auth,
  [
    body('first_name')
      .trim(),
      body('last_name')
      .trim(),
      body('gender')
      .trim(),
    body('phone')
      .trim()
  ],
  contactController.updateContact
);

router.delete('/contact/:contactId', auth, contactController.deleteContact);

export default router;