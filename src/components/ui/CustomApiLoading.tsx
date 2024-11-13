import { Box, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store';

const CustomApiLoading = () => {
  const { isApiLoading } = useSelector((state: RootState) => state.common);

  return (
    <>
      {isApiLoading && (
        <Box
          sx={{ 
            backgroundColor: '#fff',
            width: '100%',
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 5
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  )
}

export default CustomApiLoading