import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import StoreFilter from '../components/StoreFilter';
import StoreListItem from '../components/StoreListItem';
import {useAppSelector} from '../redux/store';
import {DARK1, LIGHT} from '../utils/colors';
import {StoreType} from '../utils/types';

export interface StoreListProps {}

// func to return a func that takes a string and
// add it to the state if it was not present,
// else removes it from the state
const toogleModifier =
  (fun: React.Dispatch<React.SetStateAction<string[]>>) => (str: string) =>
    fun(state => {
      if (state.includes(str)) return [...state.filter(x => x != str)];
      else return [...state, str];
    });

const StoreList = (props: StoreListProps) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [routeFilter, setRouteFilter] = useState<string[]>([]);
  const [areaFilter, setAreaFilter] = useState<string[]>([]);

  const data = useAppSelector(state => state.stores.data);

  const filterFunc = (item: StoreType) => {
    let res = true;

    if (search !== '')
      res = res && item.name.toLowerCase().includes(search.toLowerCase());
    if (typeFilter.length > 0) res = res && typeFilter.includes(item.type);
    if (areaFilter.length > 0) res = res && areaFilter.includes(item.area);
    if (routeFilter.length > 0) res = res && routeFilter.includes(item.route);

    return res;
  };

  //   using memo as I donot want to compute the unique values on every state change
  const uniqueArea = useMemo(
    () => [...new Set(data.map(item => item.area))].sort(),
    [data],
  );
  const uniqueType = useMemo(
    () => [...new Set(data.map(item => item.type))].sort(),
    [data],
  );
  const uniqueRoute = useMemo(
    () => [...new Set(data.map(item => item.route))].sort(),
    [data],
  );

  const filterData = data.filter(filterFunc);

  return (
    <View style={styles.main}>
      <Text style={styles.storeHeading}>Inventorify</Text>

      <FlatList
        style={styles.flatlist}
        data={filterData}
        renderItem={({item}) => <StoreListItem item={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <StoreFilter
            {...{
              search,
              setSearch,
              uniqueArea,
              uniqueType,
              uniqueRoute,
              areaFilter,
              typeFilter,
              routeFilter,
              toggleAreaFilter: toogleModifier(setAreaFilter),
              toggleTypeFilter: toogleModifier(setTypeFilter),
              toggleRouteFilter: toogleModifier(setRouteFilter),
              noOfStores: filterData.length,
            }}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: LIGHT,
    flex: 1,
    padding: 10,
    paddingBottom: 0,
  },
  storeHeading: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: DARK1,
    marginBottom: 15,
  },
  flatlist: {
    flex: 1,
  },
});

export default StoreList;
