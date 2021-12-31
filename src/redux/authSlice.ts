import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface AuthStateType {
  loading: boolean;
  uid: string | null;
  data: {
    name: string;
    stores: string[];
  } | null;
}

// Define the initial state using that type
const initialState: AuthStateType = {
  uid: null,
  data: null,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<null>) => {
      state.loading = true;
    },
    stopLoading: (state, action: PayloadAction<null>) => {
      state.loading = false;
    },
    login: (state, action: PayloadAction<AuthStateType>) => {
      state.uid = action.payload.uid;
      state.data = action.payload.data;
      state.loading = action.payload.loading;
    },
  },
});

export const {login, startLoading, stopLoading} = authSlice.actions;

export default authSlice.reducer;
