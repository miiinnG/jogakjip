import styles from './LoadMore.module.css';

function LoadMore({ onClick }) {
  return (
    <button className={styles.loadMore} onClick={onClick}>
      더보기
    </button>
  );
}

export default LoadMore;
