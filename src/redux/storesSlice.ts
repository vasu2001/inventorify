import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StoreType} from '../utils/types';

// Define a type for the slice state
interface StoreStateType {
  data: StoreType[];
}

// Define the initial state using that type
const initialState: StoreStateType = {
  data: [],
};

export const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    loadStores: (state, action: PayloadAction<StoreType[]>) => {
      state.data = action.payload;
    },
  },
});

export const {loadStores} = storesSlice.actions;

export default storesSlice.reducer;
