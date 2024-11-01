import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState: initialState = {
  is_loading: false,
  snackbar: {
    isOpen: false,
    message: '',
    severity: 'info'
  },
}

interface initialState {
  is_loading: boolean;
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

    setLoading(state, action: PayloadAction<boolean>) {
      state.is_loading = action.payload
    }
  }
});

export const { setLoading, setSnackbar } = commonSlice.actions;
export default commonSlice.reducer;