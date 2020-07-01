import {combineReducers} from 'redux';
import {
  deletedContactById,
  contactById,
  Contacts,
  savedContact,
} from './contact';

export default combineReducers({
  deletedContactById,
  contactById,
  Contacts,
  savedContact,
});
