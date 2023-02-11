import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: 'Contact'
    }
  ]
});

export default model('User', userSchema);