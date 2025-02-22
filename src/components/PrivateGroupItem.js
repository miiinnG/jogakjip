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
        setIsPublic(false);
      }
    };

    fetchGroupVisibility();
  }, [group.id]);

  const handleClick = () => {
    console.log("🔹 그룹 클릭됨:", group);
    console.log(`🔹 이동할 경로: /private/${group.id}/access`);
    navigate(`/groups/${group.id}/access`, { replace: true });
  };

  return (
    <div className={styles.groupItem} onClick={handleClick}>
      <p className={styles.date}>
        D+
        {Math.floor(
          (new Date() - new Date(group.createdAt)) / (1000 * 60 * 60 * 24)
        )}{" "}
        | 비공개
      </p>

      <h2 className={styles.title}>{group.name}</h2>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span>획득 배지</span> {group.badgeCount}
        </div>
        <div className={styles.stat}>
          <span>추억</span> {group.postCount}
        </div>
        <div className={styles.stat}>
          <span>그룹 공감</span>
          <button
            className={styles.likeButton}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={likeIcon} alt="그룹 공감" className={styles.likeIcon} />
            {group.likeCount >= 1000
              ? Math.floor(group.likeCount / 1000) + "K"
              : group.likeCount}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivateGroupItem;