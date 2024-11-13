import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';
import { fetchSendDetailData } from '../../api/api';
import { useParams } from 'react-router-dom';
import { setCoverLoading, setSnackbar } from '../../features/slice/commonslice';
import { useDispatch } from 'react-redux';
import { SendListFormInputs } from '../../common/interfaces';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

const PostCard = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<SendListFormInputs>();
  const { t } = useTranslation();

  const fetchDetailData = async (userId: string) => {
    try {
      dispatch(setCoverLoading(true));
      const res = await fetchSendDetailData(userId);
      setUserData(res.output);
    } catch(error) {
      const errorMesage = t(`api.failed.${(error as Error).message}`);
      dispatch(setSnackbar({
        isOpen: true,
        message: errorMesage,
        severity: 'error'
      }));
    } finally {
      dispatch(setCoverLoading(false));
    }
  }

  const frontClickHandle = () => {
    parentRef.current?.classList.add(styles.rotate);
  }

  const backClickHandle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 親要素への伝播を防ぐ
    parentRef.current?.classList.remove(styles.rotate);
  };

  useEffect(() => {
    const userId = params.id;
    if(userId) {
      fetchDetailData(userId);
    }
  }, []);

  return (
    <>
    {userData && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: '"Zen Antique Soft", serif',
            fontSize: '25px'
          }}
        >
          <span className={styles.name}>{userData?.name}</span>様<br />明けましておめでとうございます！
        </Typography>
        <div ref={parentRef} className={styles.postcardContainer} onClick={frontClickHandle}>
          <div className={`${styles.postcard} ${styles.postcardFront}`} >
          </div>
          <div className={`${styles.postcard} ${styles.postcardBack}`} onClick={backClickHandle}>
            <div className={styles.text}>
            back
            </div>
          </div>
        </div>
      </Box>
    )}
    </>
  )
}

export default PostCard