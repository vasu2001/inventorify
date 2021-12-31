import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useNetInfo} from '@react-native-community/netinfo';

import Login from '../screens/Login';
import StoreList from '../screens/StoreList';
import {StoreType} from '../utils/types';
import StoreDetail from '../screens/StoreDetail';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {login} from '../redux/authSlice';
import {loadStores} from '../redux/storesSlice';
import Snackbar from 'react-native-snackbar';
import {RED} from '../utils/colors';
import {uploadHelper} from '../utils/uploadImg';
import {popQueue, startUpload, stopUpload} from '../redux/uploadSlice';

export interface MainProps {}

export type StackParams = {
  // Login: null;
  StoreList: null;
  StoreDetail: {store: StoreType};
};

const Stack = createNativeStackNavigator<StackParams>();
export type MainNavigationProp = NativeStackNavigationProp<StackParams>;

const Main = (props: MainProps) => {
  const authState = useAppSelector(s => s.auth);
  const dispatch = useAppDispatch();
  const {queue: uploadQueue, isUploading} = useAppSelector(s => s.upload);
  const {isConnected} = useNetInfo();

  const loadDataonLogin = async (user: FirebaseAuthTypes.User) => {
    try {
      const userDataSnapshot = await database()
        .ref('/users/' + user.uid)
        .once('value');
      const userData = userDataSnapshot.val();

      const storeDataSnapshot = await Promise.all(
        (userData.stores as string[]).map(uid =>
          database()
            .ref('/stores/' + uid)
            .once('value'),
        ),
      );

      const storesData: StoreType[] = storeDataSnapshot.map(x => ({
        ...x.val(),
        uid: x.key,
      }));
      // console.log(storesData.length);
      // console.log(storesData[0]);

      dispatch(loadStores(storesData));
      dispatch(login({uid: user.uid, data: userData, loading: false}));
    } catch (err) {
      console.log(err);

      Snackbar.show({
        text: 'Some error occured while fetching data',
        backgroundColor: RED,
      });
      auth().signOut();
    }
  };

  // listener on auth state
  useEffect(() => {
    const subsriber = auth().onAuthStateChanged(user => {
      if (user) loadDataonLogin(user);
    });
    return subsriber;
  }, []);

  // listener on queue to start the upload ASAP
  useEffect(() => {
    if (isConnected && uploadQueue.length > 0 && !isUploading) {
      dispatch(startUpload());
      uploadHelper(uploadQueue[0])
        .then(() => dispatch(popQueue()))
        .finally(() => dispatch(stopUpload()));
    }
  }, [uploadQueue, isConnected, isUploading]);

  return authState.uid ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="StoreList" component={StoreList} />
      <Stack.Screen name="StoreDetail" component={StoreDetail} />
    </Stack.Navigator>
  ) : (
    <Login />
  );
};

const styles = StyleSheet.create({
  main: {},
});

export default Main;
