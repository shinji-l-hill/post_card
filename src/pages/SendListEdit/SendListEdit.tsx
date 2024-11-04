import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { editSendListDetail, fetchSendDetailData } from '../../api/api';
import { SendListFormInputs } from '../../common/interfaces';
import { useDispatch } from 'react-redux';
import { setCoverLoading, setSnackbar } from '../../features/slice/commonslice';

const SendListEdit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<SendListFormInputs>();
  const [userId, setUserId] = useState<string>('');
  const dispatch = useDispatch();
  const params = useParams();

  const onSubmit: SubmitHandler<SendListFormInputs> = async (data: SendListFormInputs) => {
    try {
      dispatch(setCoverLoading(true));
      const res = await editSendListDetail(userId,data);
      dispatch(setSnackbar({
        isOpen: true,
        message: t(`api.success.${res.message}`),
        severity: 'success'
      }));
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

  const fetchSendTargetData = async (id: string) => {
    try {
      const res = await fetchSendDetailData(id);
      console.log(res);
      reset(res.output);

    } catch(error) {
      const errorMesage = t(`api.failed.${(error as Error).message}`);
      dispatch(setSnackbar({
        isOpen: true,
        message: errorMesage,
        severity: 'error'
      }));
    }
  }

  useEffect(() => {
    const id = params.id;
    if(id) {
      setUserId(id);
      fetchSendTargetData(id);
    }
  }, []);

  return (
    <>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('send_list.edit_data')}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={t('send_list.register.name')}
            {...register('name', { required: t('send_list.register.name_required')})}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label={t('send_list.postcard_title')}
            {...register('postcard_title')}
            error={Boolean(errors.postcard_title)}
            helperText={errors.postcard_title?.message}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label={t('send_list.postcard_sentence')}
            {...register('postcard_sentence')}
            error={Boolean(errors.postcard_sentence)}
            helperText={errors.postcard_sentence?.message}
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
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

export default SendListEdit