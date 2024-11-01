import React, { useRef } from 'react';
import styles from './index.module.css';

const PostCard = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const frontClickHandle = () => {
    parentRef.current?.classList.add(styles.rotate);
  }

  const backClickHandle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 親要素への伝播を防ぐ
    parentRef.current?.classList.remove(styles.rotate);
  };

  return (
    <div ref={parentRef} className={styles.postcardContainer} onClick={frontClickHandle}>
      <div className={`${styles.postcard} ${styles.postcardFront}`} >
        front
      </div>
      <div className={`${styles.postcard} ${styles.postcardBack}`} onClick={backClickHandle}>
        <div className={styles.text}>
        back
        </div>
      </div>
    </div>
  )
}

export default PostCard