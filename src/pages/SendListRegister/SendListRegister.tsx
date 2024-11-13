import { Box, Button, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { registerSendList } from '../../api/api';
import { SendListFormInputs } from '../../common/interfaces';
import { useDispatch } from 'react-redux';
import { setCoverLoading, setSnackbar } from '../../features/slice/commonslice';

const SendListRegister = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SendListFormInputs>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<SendListFormInputs> = async (data: SendListFormInputs) => {
    try {
      dispatch(setCoverLoading(true));
      const userId = localStorage.getItem('userId');

      if(userId) {
        data.user_id = userId; 
      } else {
        navigate('login');
        dispatch(setSnackbar({
          isOpen: true,
          message: t(`login_failed`),
          severity: 'error'
        }));
      }
      await registerSendList(data);  // APIにデータを送信する
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = t(`api.failed.${(error as Error).message}`);
      dispatch(setSnackbar({
        isOpen: true,
        message: errorMessage,
        severity: 'error'
      }));
    } finally {
      dispatch(setCoverLoading(false));
    }
  };

  return (
    <>
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
            label={t('send_list.postcard_title')}
            {...register('postcard_title')}
            error={Boolean(errors.postcard_title)}
            helperText={errors.postcard_title?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label={t('send_list.postcard_sentence')}
            {...register('postcard_sentence')}
            error={Boolean(errors.postcard_sentence)}
            helperText={errors.postcard_sentence?.message}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label={t('send_list.postcard_end')}
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
    </>
  );
}

export default SendListRegister