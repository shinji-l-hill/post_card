import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { setSnackbar } from '../features/slice/commonslice';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import Header from '../components/Header/Header';

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

  return (
    <div>
      <Header />
      <main>
        <Container maxWidth="sm">
          <Outlet />
        </Container>
      </main>
    </div>
  )
}

export default CommonLayout