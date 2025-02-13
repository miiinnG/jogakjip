import styles from './PrivateGroupItem.module.css';
import likeIcon from './assets/logo-small.svg';

function PrivateGroupItem({ group }) {
  return (
    <div className={styles.groupItem}>
      <div className={styles.thumb}>
        <img src={group.image} alt={group.name} />
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
