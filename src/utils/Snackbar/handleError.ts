import { setSnackbar } from '../../features/slice/commonslice';
import { TFunction } from 'i18next';
import { Dispatch } from '@reduxjs/toolkit';

export const handleError = (error: unknown, t: TFunction, dispatch: Dispatch) => {
  let errorMessage = '';

  if (error instanceof Error) {
    errorMessage = t(`api.failed.${error.message}`);
  } else if (typeof error === 'string') {
    errorMessage = t(`api.failed.${error}`);
  } else {
    errorMessage = t('api.failed.unknown_error');
  }

  dispatch(setSnackbar({
    isOpen: true,
    message: errorMessage,
    severity: 'error'
  }));
};