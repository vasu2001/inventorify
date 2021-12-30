import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
} from 'react-native';

import {ACCENT, DARK2, LIGHT} from '../utils/colors';

export interface CustomButtonProps {
  mainStyle?: ViewStyle;
  label: String;
  onPress: () => void;
}

const CustomButton = ({mainStyle, label, onPress}: CustomButtonProps) => {
  const pressableStyle: (
    state: PressableStateCallbackType,
  ) => StyleProp<ViewStyle> = ({pressed}) => ({
    backgroundColor: pressed ? DARK2 : ACCENT,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  });

  return (
    <View style={mainStyle}>
      <Pressable style={pressableStyle} onPress={onPress}>
        <Text style={[styles.label]}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: LIGHT,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CustomButton;
