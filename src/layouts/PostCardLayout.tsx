import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './index.module.css';

const PostCardLayout = () => {
  return (
    <>
      <header className={styles.postcardHeader}>
        乗っ取りなどではないのでご安心を笑
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