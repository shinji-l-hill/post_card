import { Alert, Snackbar } from '@mui/material'
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../features/slice/commonslice';

interface Props {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

const CustomSnackbar = (props:Props) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setSnackbar({
      isOpen: false,
      message: '',
      severity: 'info',
    }))
  }
  const {
    open,
    message,
    severity
  } = props;
  return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
        {message}
        </Alert>
      </Snackbar>
  )
}

export default CustomSnackbar