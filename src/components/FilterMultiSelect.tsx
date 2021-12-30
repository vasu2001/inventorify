import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  ViewStyle,
  ListRenderItem,
  Pressable,
} from 'react-native';

import {ACCENT, DARK2} from '../utils/colors';

export interface FilterMultiSelectProps {
  unique: string[];
  mainStyle?: ViewStyle;
  value: string[];
  toggleValue: (x: string) => void;
}

const FilterMultiSelect = ({
  unique,
  mainStyle,
  value,
  toggleValue,
}: FilterMultiSelectProps) => {
  const renderItem: ListRenderItem<string> = ({item}) => {
    const active = value.includes(item);

    return (
      <Pressable
        style={[styles.item, active ? styles.activeItem : null]}
        onPress={() => toggleValue(item)}>
        <Text style={[styles.text, active ? styles.activeText : null]}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      horizontal
      style={mainStyle}
      showsHorizontalScrollIndicator={false}
      fadingEdgeLength={100}
      data={unique}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 3,
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  activeItem: {
    backgroundColor: ACCENT,
  },

  text: {
    color: DARK2,
  },
  activeText: {
    color: 'white',
  },
});

export default FilterMultiSelect;
