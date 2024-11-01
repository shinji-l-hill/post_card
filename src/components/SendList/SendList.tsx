import { Box, Container } from '@mui/material'
import React from 'react'
import { CustomButton } from '../ui/CustomButton'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const SendList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleResister = () => {
    navigate('/sendlist/new', { replace: true });
  }

  return (
    <Container>
      <Box>
        <CustomButton variant='contained' onClick={handleResister}>
          {t('resister')}
        </CustomButton>
      </Box>
    </Container>
  )
}

export default SendList