import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';

import {DARK2} from '../utils/colors';

export interface CustomInputProps {
  mainStyle?: ViewStyle;
  value: string;
  setValue: (x: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  placeholder?: string;
}

const CustomInput = ({
  mainStyle,
  value,
  setValue,
  keyboardType,
  secureTextEntry,
  placeholder,
}: CustomInputProps) => {
  return (
    <View style={[styles.main, mainStyle]}>
      <TextInput
        style={[styles.input]}
        autoCorrect={false}
        value={value}
        onChangeText={setValue}
        placeholderTextColor={'grey'}
        {...{keyboardType, secureTextEntry, placeholder}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignSelf: 'stretch',
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: DARK2,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: DARK2,
  },
});

export default CustomInput;
