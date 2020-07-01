import {
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE,
  FIND_CONTACT_REQUEST,
  FIND_CONTACT_SUCCESS,
  FIND_CONTACT_FAILURE,
  FIND_CONTACTS_REQUEST,
  FIND_CONTACTS_SUCCESS,
  FIND_CONTACTS_FAILURE,
  SAVE_CONTACT_REQUEST,
  SAVE_CONTACT_SUCCESS,
  SAVE_CONTACT_FAILURE,
} from '../actions/constants';
import {put, takeLatest} from 'redux-saga/effects';
import {comAxios} from '../utils/apiUtils';

export function* saveContact(actions) {
  const {firstName, lastName, age, photo, id} = actions.data;
  try {
    const data = yield id
      ? comAxios.put(`contact/${id}`, {firstName, lastName, age, photo})
      : comAxios.post('contact', {firstName, lastName, age, photo});

    yield put({
      type: SAVE_CONTACT_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: SAVE_CONTACT_FAILURE,
      error: error,
    });
  }
}

export function* deleteContactById(actions) {
  try {
    const data = yield comAxios.delete(`contact/${actions.id}`);

    yield put({
      type: DELETE_CONTACT_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: DELETE_CONTACT_FAILURE,
      error: error,
    });
  }
}

export function* findContactById(actions) {
  try {
    const data = yield comAxios.get(`contact/${actions.id}`);

    yield put({
      type: FIND_CONTACT_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_CONTACT_FAILURE,
      error: error,
    });
  }
}

export function* findContacts() {
  console.log(1);
  try {
    const data = yield comAxios.get('contact');

    yield put({
      type: FIND_CONTACTS_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_CONTACTS_FAILURE,
      error: error,
    });
  }
}

export function* watchFindContacts() {
  yield takeLatest(FIND_CONTACTS_REQUEST, findContacts);
}

export function* watchFindContactById() {
  yield takeLatest(FIND_CONTACT_REQUEST, findContactById);
}

export function* watchDeleteContactById() {
  yield takeLatest(DELETE_CONTACT_REQUEST, deleteContactById);
}

export function* watchSaveContact() {
  yield takeLatest(SAVE_CONTACT_REQUEST, saveContact);
}
