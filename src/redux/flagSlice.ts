import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface FlagStateType {
  loading: boolean;
  isUploading: boolean;
}

// Define the initial state using that type
const initialState: FlagStateType = {
  isUploading: false,
  loading: false,
};

export const flagSlice = createSlice({
  name: 'flag',
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<null>) => {
      state.loading = true;
    },
    stopLoading: (state, action: PayloadAction<null>) => {
      state.loading = false;
    },
    startUpload: (state, action: PayloadAction<null>) => {
      state.isUploading = true;
    },
    stopUpload: (state, action: PayloadAction<null>) => {
      state.isUploading = false;
    },
  },
});

export const {startLoading, stopLoading, startUpload, stopUpload} =
  flagSlice.actions;

export default flagSlice.reducer;
