import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {MainNavigationProp} from '../navigators/MainNavigator';
import {DARK1, DARK2, LIGHT} from '../utils/colors';
import {StoreType} from '../utils/types';

export interface StoreListItemProps {
  item: StoreType;
}

const StoreListItem = ({item}: StoreListItemProps) => {
  const navigation = useNavigation<MainNavigationProp>();

  const onPress = () => {
    navigation.navigate('StoreDetail', {store: item});
  };

  const pressableStyle: (
    state: PressableStateCallbackType,
  ) => StyleProp<ViewStyle> = ({pressed}) => ({
    backgroundColor: pressed ? LIGHT : 'white',
    ...styles.main,
  });
  return (
    <Pressable style={pressableStyle} onPress={onPress}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.area}>{item.area}</Text>
      <Text style={styles.address}>{item.address}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 15,
    margin: 5,
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  name: {
    color: DARK1,
    fontSize: 15,
    fontWeight: 'bold',
  },
  type: {
    color: DARK2,
    marginBottom: 5,
    fontSize: 12,
  },
  area: {
    color: DARK1,
    fontWeight: 'bold',
    fontSize: 14,
  },
  address: {
    color: DARK2,
    fontSize: 12,
  },
});

export default StoreListItem;
