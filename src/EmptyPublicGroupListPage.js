import { Link } from 'react-router-dom';
import styles from './EmptyPublicGroupListPage.module.css';
import emptyIcon from './assets/note-icon.svg'; // ✅ 아이콘 추가

function EmptyPublicGroupListPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>공개 그룹 목록</h1>

      <div className={styles.emptyState}>
        <img src={emptyIcon} alt="공개 그룹 없음" className={styles.emptyIcon} />
        <p className={styles.emptyMessage}>등록된 공개 그룹이 없습니다.</p>
        <p className={styles.emptySubMessage}>가장 먼저 그룹을 만들어보세요!</p>
        <Link to="/create-group" className={styles.createGroupButton}>그룹 만들기</Link>
      </div>
    </div>
  );
}

export default EmptyPublicGroupListPage;