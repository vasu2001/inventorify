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
  disabled?: boolean;
}

const CustomButton = ({
  mainStyle,
  label,
  onPress,
  disabled,
}: CustomButtonProps) => {
  const pressableStyle: (
    state: PressableStateCallbackType,
  ) => StyleProp<ViewStyle> = ({pressed}) => ({
    backgroundColor: disabled || pressed ? DARK2 : ACCENT,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  });

  return (
    <View style={mainStyle}>
      <Pressable style={pressableStyle} onPress={onPress} disabled={disabled}>
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
