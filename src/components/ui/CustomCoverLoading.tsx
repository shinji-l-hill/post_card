import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store';

const CustomCoverLoading = () => {
  const { isCoverLoading } = useSelector((state: RootState) => state.common);

  return (
    <Backdrop
      sx={{ backgroundColor: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isCoverLoading}
    >
      <CircularProgress />
    </Backdrop>
  )
}

export default CustomCoverLoading