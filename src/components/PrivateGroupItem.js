import { useNavigate } from 'react-router-dom';
import styles from './PrivateGroupItem.module.css';
import likeIcon from '../assets/logo-small.svg';

function PrivateGroupItem({ group }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/private-group-access/${group.id}`); // 🔹 클릭 시 페이지 이동
  };

  return (
    <div className={styles.groupItem} onClick={handleClick}>
      <div className={styles.thumb}
        style={{ backgroundColor: group.images && group.images.length > 0 ? 'transparent' : '#efede4'}}>
        {group.images && group.images.length > 0 ? (
          <img src={group.images || group.default_thumbnail} alt="그룹 대표 이미지" className={styles.groupImage} />
        ) : (
          <img src={group.default_thumbnail} alt="기본 썸네일" className={styles.defaultLogo} />
        )}
      </div>

      <div className={styles.content}>
        <p className={styles.date}>D+{group.days} | {group.privacy}</p>
        <h2 className={styles.title}>{group.name}</h2>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>추억</span> {group.memories}
          </div>
          <div className={styles.stat}>
            <span>그룹 공감</span>
            <img src={likeIcon} alt="그룹 공감" className={styles.likeIcon} />
            {group.likes}K
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateGroupItem;