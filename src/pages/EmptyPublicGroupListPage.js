import { Link } from 'react-router-dom';
import styles from './EmptyPublicGroupListPage.module.css';
import emptyIcon from '../assets/note-icon.svg';

function EmptyPublicGroupListPage() {
  return (
    <div className={styles.container}>
      {/* 빈 그룹 아이콘 */}
      <img src={emptyIcon} alt="Emtpy" className={styles.icon} />

      {/* 안내 메시지 */}
      <p className={styles.title}>등록된 공개 그룹이 없습니다.</p>
      <p className={styles.subtitle}>가장 먼저 그룹을 만들어보세요!</p>

      {/* 그룹 만들기 버튼 */}
      <Link to="/create-group">
        <button className={styles.createButton}>그룹 만들기</button>
      </Link>
    </div>
  );
}

export default EmptyPublicGroupListPage;