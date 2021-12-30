import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface AuthStateType {
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
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthStateType>) => {
      state.uid = action.payload.uid;
      state.data = action.payload.data;
    },
  },
});

export const {login} = authSlice.actions;

export default authSlice.reducer;
