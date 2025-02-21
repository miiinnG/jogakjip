import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './PrivateGroupItem.module.css';
import likeIcon from '../assets/logo-small.svg';
import { checkGroupVisibility } from '../api/api';

function PrivateGroupItem({ group }) {
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(group.likes);
  const [isPublic, setIsPublic] = useState(null);

  useEffect(() => {
    const fetchGroupVisibility = async () => {
      try {
        const visibility = await checkGroupVisibility(group.id);
        setIsPublic(visibility);
      } catch (error) {
        console.error("공개 여부 조회 오류:", error);
        setIsPublic(null);
      }
    };

    fetchGroupVisibility();
  }, [group.id]);

  const handleClick = () => {
    console.log("🔹 그룹 클릭됨:", group);
    console.log(`🔹 이동할 경로: /private/${group.id}/access`);
    navigate(`/private/${group.id}/access`, { replace: true });
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
            <button className={styles.likeButton} onClick={(e) => {
                e.stopPropagation(); // ✅ 부모 클릭 이벤트 방지
                //handleLikeClick();
            }}>
              <img src={likeIcon} alt="그룹 공감" className={styles.likeIcon} />
              {likeCount}K
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateGroupItem;