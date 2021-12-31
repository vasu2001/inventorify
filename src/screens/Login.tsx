import React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {DARK1, LIGHT, RED} from '../utils/colors';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {startLoading, stopLoading} from '../redux/flagSlice';

export interface LoginProps {}

const Login = (props: LoginProps) => {
  const [username, setUsername] = useState('user1@example.com');
  const [password, setPassword] = useState('retailpulse');
  const {loading} = useAppSelector(s => s.flag);
  const dispatch = useAppDispatch();

  const onLogin = () => {
    if (!username || !password) {
      Snackbar.show({
        text: 'Input email/ pass',
        backgroundColor: RED,
      });
      return;
    }

    dispatch(startLoading());
    auth()
      .signInWithEmailAndPassword(username, password)
      .catch(err => {
        console.log(err);
        dispatch(stopLoading());
        Snackbar.show({
          text: 'Invalid email/ pass',
          backgroundColor: RED,
        });
      });
  };

  return (
    <View style={styles.main}>
      <Text style={styles.loginText}>Login</Text>

      <CustomInput
        mainStyle={styles.input}
        value={username}
        setValue={setUsername}
        keyboardType="email-address"
        placeholder="Email"
      />
      <CustomInput
        mainStyle={styles.input}
        value={password}
        setValue={setPassword}
        secureTextEntry
        placeholder="Password"
      />

      <CustomButton
        label="LOGIN"
        mainStyle={styles.loginButton}
        onPress={onLogin}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: LIGHT,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginText: {
    // alignSelf: 'center',
    fontSize: 25,
    marginBottom: 35,
    fontWeight: 'bold',
    color: DARK1,
  },
  input: {
    marginVertical: 5,
  },
  loginButton: {
    marginTop: 30,
  },
});

export default Login;
