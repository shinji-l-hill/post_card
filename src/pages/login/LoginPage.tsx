import { Box, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useLoginForm } from '../../hooks/useLoginForm';
import { CustomButton } from '../../components/ui/CustomButton';
import { loginApi } from '../../api/api';
import { LoginCredentials } from '../../common/interfaces';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../features/slice/commonslice';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../utils/Snackbar/HandleError';

const LoginPage = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, errors } = useLoginForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      const res = await loginApi(data);
      dispatch(setSnackbar({
        isOpen: true,
        message: t(`api.success.${res.message}`),
        severity: 'success'
      }));
      navigate('/dashboard');
    } catch(error) {
      handleError(error, t, dispatch);
    } finally {
      setIsLoading(false);
    }
  }
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Box >
        <Typography component="h1" variant="h5">
          {t('app_title')}
        </Typography>
        <form
        onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label={t('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email')}
            fullWidth
            margin="normal"
          />
          <TextField
            label={t('password')}
            type="password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            {...register('password')}
            fullWidth
            margin="normal"
          />
          <CustomButton
            type="submit"
            fullWidth
            sx={{ mt: 3 }}
            variant="contained"
            disabled={isLoading}
          >
            {t('submit_login')}
          </CustomButton>
        </form>
      </Box>

    </Container>
  )
}

export default LoginPage