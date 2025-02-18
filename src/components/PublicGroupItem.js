import styles from './PublicGroupItem.module.css';
import defaultLogo from '../assets/logo-big.svg';
import likeIcon from '../assets/logo-small.svg';

function PublicGroupItem({group}) {
    return (
        <div className={styles.PublicGroupItem}>
            <div 
                className={styles.thumb}
                style={{ backgroundColor: group.image ? 'transparent' : '#efede4'}}
            >
                {group.image ? (
                    <img src={group.image} alt={group.name} />
                ) : (
                    <img src={defaultLogo} alt="기본 로고" className={styles.defaultLogo} />
                )}
            </div>

            <div className={styles.content}>
                <p className={styles.date}>D+{group.days} | {group.privacy}</p>
                <h2 className={styles.title}>{group.name}</h2>
                <p className={styles.description}>{group.description}</p>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span>획득 배지</span> 
                        {group.badges}
                    </div>
                    <div className={styles.stat}>
                        <span>추억</span> 
                        {group.memories}
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

export default PublicGroupItem;