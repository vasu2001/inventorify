import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UploadQueue {
  storeUid: string;
  imgUri: string;
  timestamp: string;
}

// Define a type for the slice state
interface UploadStateType {
  queue: UploadQueue[];
  isUploading: boolean;
}

// Define the initial state using that type
const initialState: UploadStateType = {
  queue: [],
  isUploading: false,
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    addQueue: (state, action: PayloadAction<UploadQueue>) => {
      state.queue = [...state.queue, action.payload];
    },
    popQueue: (state, action: PayloadAction<null>) => {
      state.queue.shift();
      state.queue = [...state.queue];
    },
    // actions to lock and unlock upload lock, such that only one upload is active at the moment
    startUpload: (state, action: PayloadAction<null>) => {
      state.isUploading = true;
    },
    stopUpload: (state, action: PayloadAction<null>) => {
      state.isUploading = false;
    },
  },
});

export const {popQueue, addQueue, stopUpload, startUpload} =
  uploadSlice.actions;

export default uploadSlice.reducer;
