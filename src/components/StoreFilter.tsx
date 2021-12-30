import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import CustomInput from './CustomInput';
import FilterMultiSelect from './FilterMultiSelect';

export interface StoreFilterProps {
  search: string;
  setSearch: (x: string) => void;

  uniqueArea: string[];
  areaFilter: string[];
  toggleAreaFilter: (x: string) => void;

  uniqueType: string[];
  typeFilter: string[];
  toggleTypeFilter: (x: string) => void;

  uniqueRoute: string[];
  routeFilter: string[];
  toggleRouteFilter: (x: string) => void;

  noOfStores: number;
}

const StoreFilter = ({
  search,
  setSearch,
  uniqueArea,
  uniqueType,
  areaFilter,
  toggleAreaFilter,
  typeFilter,
  toggleTypeFilter,
  uniqueRoute,
  routeFilter,
  toggleRouteFilter,
  noOfStores,
}: StoreFilterProps) => {
  return (
    <View style={styles.main}>
      <CustomInput
        value={search}
        setValue={setSearch}
        placeholder="Search"
        mainStyle={styles.searchBar}
      />

      <FilterMultiSelect
        unique={uniqueArea}
        mainStyle={styles.multiselect}
        value={areaFilter}
        toggleValue={toggleAreaFilter}
      />
      <FilterMultiSelect
        unique={uniqueRoute}
        mainStyle={styles.multiselect}
        value={routeFilter}
        toggleValue={toggleRouteFilter}
      />
      <FilterMultiSelect
        unique={uniqueType}
        mainStyle={styles.multiselect}
        value={typeFilter}
        toggleValue={toggleTypeFilter}
      />

      <Text style={styles.noOfStores}>{noOfStores} Stores</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 10,
  },
  searchBar: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 10,
    marginBottom: 10,
  },
  multiselect: {
    marginBottom: 10,
  },

  noOfStores: {
    fontSize: 13,
    color: 'grey',
    marginBottom: -10,
  },
});

export default StoreFilter;
