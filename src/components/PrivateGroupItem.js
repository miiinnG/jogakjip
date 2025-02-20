import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './PrivateGroupItem.module.css';
import likeIcon from '../assets/logo-small.svg';

function PrivateGroupItem({ group }) {
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(group.likes);
  const [isPublic, setIsPublic] = useState(null);

  useEffect(() => {
    const fetchGroupVisibility = async () => {
      try {
        const response = await fetch(`/api/groups/${group.id}/is-public`);
        if (!response.ok) throw new Error("공개 여부 조회 실패");

        const data = await response.json();
        setIsPublic(data.isPublic);
      } catch (error) {
        console.error("공개 여부 조회 오류:",error);
        setIsPublic(null);
      }
    };

    fetchGroupVisibility();
  }, [group.id]);

  //공감 버튼 클릭 시 API 호출
  const handleLikeClick = async () => {
    try {
      const response = await fetch(`/api/groups/${group.id}/like`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('공감 요청 실패');
      }

      // 공감 성공하면 likeCount 증가
      setLikeCount((prev) => prev + 1);
    } catch (error) {
      console.error('공감 요청 중 오류 발생:', error);
      alert('공감을 처리하는 중 오류가 발생했습니다.');
    }
  };

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
            <button className={styles.likeButton} onClick={handleLikeClick}>
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