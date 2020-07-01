import {Toast} from 'native-base';

export function showError(error) {
  Toast.show({
    text: error.message,
    buttonText: 'Okay',
    type: 'danger',
    duration: 3000,
  });
}
