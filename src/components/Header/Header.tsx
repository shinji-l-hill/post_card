import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { CustomButton } from '../ui/CustomButton'
import { logout } from '../../utils/Auth/logout'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleHome = () => {
    navigate('dashboard');
  }

  const handleLogout = () => {
    if(logout()) {
      navigate('login');
    };
  }
  return (
    <header>
      <Container
      sx = {{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      >
        <Box>
          <Typography component="h1" variant="h5" onClick={handleHome}>
            {t('app_title')}
          </Typography>
        </Box>
        <Box>
          <CustomButton onClick={handleLogout}>ログアウト</CustomButton>
        </Box>
      </Container>
    </header>
  )
}

export default Header