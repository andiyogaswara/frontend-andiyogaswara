import {
  watchFindContacts,
  watchFindContactById,
  watchDeleteContactById,
  watchSaveContact,
} from './contact';

import {all, fork} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    fork(watchFindContacts),
    fork(watchFindContactById),
    fork(watchDeleteContactById),
    fork(watchSaveContact),
  ]);
}
