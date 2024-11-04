import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState: IinitialState = {
  isApiLoading: false,
  isCoverLoading: false,
  snackbar: {
    isOpen: false,
    message: '',
    severity: 'info'
  },
}

interface IinitialState {
  isApiLoading: boolean;
  isCoverLoading: boolean;
  snackbar: SnackbarAction;
}

interface SnackbarAction {
  isOpen: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setSnackbar(state, action: PayloadAction<SnackbarAction>) {
      state.snackbar.isOpen = action.payload.isOpen;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
    },

    setApiLoading(state, action: PayloadAction<boolean>) {
      state.isApiLoading = action.payload
    },

    setCoverLoading(state, action: PayloadAction<boolean>) {
      state.isCoverLoading = action.payload
    },
  }
});

export const { setCoverLoading, setSnackbar, setApiLoading} = commonSlice.actions;
export default commonSlice.reducer;