import styles from "./GroupItem.module.css";

const GroupItem = ({ group }) => {
    const { id, name, status, image, description, badges, default_thumbnail, created_at } = group;

    const getDaysSinceCreation = (createdDate) => {
        const createdAt = new Date(createdDate);
        const today = new Date();
        const diffTime = today - createdAt;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));

    }
    return (
        <div className={styles.groupCard}>
            {/* 그룹 이미지 */}
            <div className={styles.imageContainer}>
                {image ? (
                    <img src={image} alt={name} className={styles.groupImage} />
                ) : (
                    <div className={styles.defaultThumbnail}
                    style={{ backgroundColor: default_thumbnail.backgroundColor}}
                >
                    <img src={default_thumbnail.logo} alt="default logo" className={styles.defaultlogo} />
                </div>
            )}
            </div>

            {/* 그룹 정보 */}
            <div className={styles.groupInfo}>
                <p className={styles.status}>{`D+${getDaysSinceCreation(created_at)} | {status}`}</p>
                <h3 className={styles.groupName}>{name}</h3>
                <p className={styles.description}>{description}</p>

                {/* 그룹 배지 */}
                <div className={styles.badges}>
                    <span>획득 배지</span>
                    <span>{badges.achievements}</span>
                    <span>추억</span>
                    <span>{badges.memories}</span>
                    <span>그룹 공감</span>
                    <span>
                        <img src="./assets/logo-small.svg" alt="like" className={styles.likeIcon} />
                        {badges.likes}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GroupItem;