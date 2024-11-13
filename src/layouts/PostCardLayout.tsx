import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import styles from './index.module.css';
import { CustomButton } from '../components/ui/CustomButton';


const PostCardLayout = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginCheck = () => {
    const userId = localStorage.getItem('userId');
    if(userId) {
      setIsLogin(true);
    }
  }
  useEffect(() => {
    loginCheck();
  }, []); 
  return (
    <>
      <header className={styles.postcardHeader}>
        {isLogin && (
          <CustomButton
          variant={'contained'}
          onClick={() => navigate('/dashboard')}
          >
            管理画面
          </CustomButton>
        )}
      </header>
      <main className={styles.postcardWrapper}>
        <Outlet />
      </main>
      <footer className={styles.postcardFooter}>
        &copy; 2025 All rights reserved
      </footer>
    </>
  )
}

export default PostCardLayout