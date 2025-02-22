import { useState, useEffect } from "react";
import styles from './PublicGroupItem.module.css';
import defaultLogo from '../assets/logo-big.svg';
import likeIcon from '../assets/logo-small.svg';
import { Link, useNavigate } from "react-router-dom";

const formatLikeCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K"; // 1.5K 형식으로 변환
    }
    return count; // 1000 미만이면 그대로 표시
  };

function PublicGroupItem({group}) {
    const navigate = useNavigate();
    const [isPublic, setIsPublic] = useState(null);

    useEffect(() => {
        const fetchGroupVisibility = async () => {
            try {
                const response = await fetch(`https://codeit-zogakzip-backend.onrender.com/api/groups/${group.id}/is-public`,);
                if (!response.ok) throw new Error("공개 여부 조회 실패");

                const data = await response.json();
                setIsPublic(data.isPublic);
            } catch (error) {
                console.error("공개 여부 조회 오류:", error);
                setIsPublic(null);
            }
        };

        fetchGroupVisibility();
    }, [group.id]);
    
    const formattedDate = `D+${Math.floor(
    (new Date() - new Date(group.createdAt)) / (1000 * 60 * 60 * 24)
    )}`;

    return (
        <div className={styles.PublicGroupItem} onClick={() => navigate(`/groups/${group.id}`)}>
            {/* 그룹 이미지 */}
            <div 
                className={styles.thumb}
                style={{ backgroundColor: group.image ? 'transparent' : '#efede4'}}
            >
                {group.imageUrl ? (
                    <img src={ group.imageUrl } alt={group.name} />
                ) : (
                    <img src={defaultLogo} alt="기본 로고" className={styles.defaultLogo} />
                )}
            </div>
            
            {/* 그룹 정보 */}
            <div className={styles.content}>
            <p className={styles.date}>
                D+
                {Math.floor(
                (new Date() - new Date(group.createdAt)) / (1000 * 60 * 60 * 24)
                )}{" "}
                | 공개
            </p>
                <h3 className={styles.title}>{group.name}</h3>
                <p className={styles.introduction}>{group.introduction}</p>

                {/* 그룹 통계 */}
                <div className={styles.stats}>
                    <span>획득 배지 <strong>{group.badgeCount}</strong></span>
                    <span>추억 <strong>{group.postCount}</strong></span>
                    <span>
                        <img className={styles.likeIcon} src={likeIcon} alt="공감" />{" "}
                        <strong>{formatLikeCount(group.likeCount)}</strong>
                    </span>
                </div>
            </div>
        </div>        
    );
}

export default PublicGroupItem;