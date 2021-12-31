import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RNCamera, TakePictureResponse} from 'react-native-camera';
import Snackbar from 'react-native-snackbar';
import {useNetInfo} from '@react-native-community/netinfo';

import CustomButton from '../components/CustomButton';
import {StackParams} from '../navigators/MainNavigator';
import {DARK1, LIGHT, RED} from '../utils/colors';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {addQueue} from '../redux/uploadSlice';

export interface StoreDetailProps {}

const StoreDetail = (props: StoreDetailProps) => {
  const {store} = useRoute<RouteProp<StackParams, 'StoreDetail'>>().params;
  const {isConnected} = useNetInfo();
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();
  const {isUploading} = useAppSelector(s => s.upload);

  const cameraRef = useRef<RNCamera>(null);
  const [img, setImg] = useState<TakePictureResponse>(null);

  const onCapture = async () => {
    try {
      const capImg = await cameraRef.current.takePictureAsync({
        quality: 0.75,
      });
      // console.log(capImg);
      setImg(capImg);
    } catch (err) {
      console.log(err);
    }
  };

  const onCancel = () => {
    setImg(null);
  };

  const onUpload = async () => {
    if (!img) {
      Snackbar.show({
        text: 'Please Capture an Image First',
        backgroundColor: RED,
      });
      return;
    }

    setImg?.(null);
    if (!isConnected) Snackbar.show({text: 'Device Offline, Upload queued'});
    else if (isUploading) Snackbar.show({text: 'Upload queued'});

    dispatch(
      addQueue({
        storeUid: store.uid,
        imgUri: img.uri,
        timestamp: new Date().toISOString(),
      }),
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.body}>
        <Text style={styles.name}>{store.name}</Text>
        <Text style={styles.type}>{store.type}</Text>
        <Text style={styles.area}>{store.area}</Text>
        <Text style={styles.address}>{store.address}</Text>
      </View>

      <View style={styles.cameraView}>
        {isFocus && (
          <RNCamera
            ref={cameraRef}
            style={styles.camera}
            captureAudio={false}
            type={RNCamera.Constants.Type.back}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
        )}
        {img ? (
          <View style={styles.captureImgView}>
            <Image
              source={img}
              style={styles.captureImg}
              resizeMode="contain"
            />
          </View>
        ) : null}

        <CustomButton
          label={img ? 'Cancel' : 'Capture'}
          onPress={img ? onCancel : onCapture}
          mainStyle={styles.captureButton}
        />
      </View>

      <CustomButton label="UPLOAD PHOTO" onPress={onUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: LIGHT,
    padding: 20,
    //     justifyContent: 'space-between',
  },
  body: {
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: DARK1,
  },
  type: {
    fontSize: 15,
    marginBottom: 20,
    color: DARK1,
  },
  area: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: DARK1,
  },
  address: {
    fontSize: 13,
    textAlign: 'center',
    color: DARK1,
  },

  cameraView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
    margin: 20,
    position: 'relative',
  },
  camera: {
    flex: 1,
    alignSelf: 'stretch',
  },
  captureButton: {
    position: 'absolute',
    bottom: 10,
  },
  captureImgView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: -35,
    right: -35,
    backgroundColor: 'white',
  },
  captureImg: {
    width: undefined,
    flex: 1,
  },
});

export default StoreDetail;
