import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { registerSendList } from '../../api/api';
import { SendListFormInputs } from '../../common/interfaces';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../features/slice/commonslice';

const SendListRegister = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SendListFormInputs>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<SendListFormInputs> = async (data: SendListFormInputs) => {
    try {
      const userId = localStorage.getItem('userId');

      if(userId) {
        data.user_id = userId; 
      } else {
        navigate('login', {replace: true});
        dispatch(setSnackbar({
          isOpen: true,
          message: t(`login_failed`),
          severity: 'error'
        }));
      }
      await registerSendList(data);  // APIにデータを送信する
      navigate('/dashboard');
    } catch (error) {
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
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('send_list.new_registration')}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={t('send_list.register.name')}
            {...register('name', { required: t('send_list.register.name_required')})}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label={t('send_list.register.postcard_title')}
            {...register('postcard_title')}
            error={Boolean(errors.postcard_title)}
            helperText={errors.postcard_title?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label={t('send_list.register.postcard_sentence')}
            {...register('postcard_sentence')}
            error={Boolean(errors.postcard_sentence)}
            helperText={errors.postcard_sentence?.message}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label={t('send_list.register.postcard_end')}
            {...register('postcard_end')}
            error={Boolean(errors.postcard_end)}
            helperText={errors.postcard_end?.message}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            {t('submit')}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default SendListRegister