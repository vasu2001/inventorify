import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UploadQueue {
  storeUid: string;
  imgUri: string;
  timestamp: string;
}

// Define a type for the slice state
interface UploadStateType {
  queue: UploadQueue[];
}

// Define the initial state using that type
const initialState: UploadStateType = {
  queue: [],
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
  },
});

export const {popQueue, addQueue} = uploadSlice.actions;

export default uploadSlice.reducer;
