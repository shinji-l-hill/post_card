import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { setSnackbar } from '../features/slice/commonslice';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../components/ui/CustomButton';
import { Box, Container, Typography } from '@mui/material';
import { logout } from '../utils/Auth/logout';

const CommonLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if(!token) {
      navigate('login');
      dispatch(setSnackbar({
        isOpen: true,
        message: t(`login_failed`),
        severity: 'error'
      }));
    }
  },[]);

  const handleLogout = () => {
    if(logout()) {
      navigate('login');
    };
  }

  return (
    <div>
      <header>
        <Container
        sx = {{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        >
          <Box>
            <Typography component="h1" variant="h5">
              {t('app_title')}
            </Typography>
          </Box>
          <Box>
            <CustomButton onClick={handleLogout}>ログアウト</CustomButton>
          </Box>
        </Container>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default CommonLayout