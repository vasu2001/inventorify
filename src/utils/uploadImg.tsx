import Snackbar from 'react-native-snackbar';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

import {ACCENT, RED} from './colors';
import {UploadQueue} from '../redux/uploadSlice';

// helper func to upload image in the background
export const uploadHelper = async ({
  storeUid,
  imgUri,
  timestamp,
}: UploadQueue) => {
  try {
    Snackbar.show({text: 'Started Upload'});

    const photoUid = uuid.v4().toString();
    const storageRef = storage().ref(storeUid).child(photoUid);

    await storageRef.putFile(imgUri);

    const photoURL = await storageRef.getDownloadURL();

    await database().ref('store_visits').child(storeUid).child(photoUid).set({
      photoURL,
      timestamp,
    });

    Snackbar.show({
      text: 'Upload Successful',
      backgroundColor: ACCENT,
    });
  } catch (err) {
    console.log(err);
    Snackbar.show({
      text: 'Upload failed',
      backgroundColor: RED,
    });
  }
};
