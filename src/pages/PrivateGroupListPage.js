import { useState } from 'react';
import PrivateGroupItem from '../components/PrivateGroupItem';
import LoadMore from '../components/LoadMore';
import styles from './PrivateGroupListPage.module.css';

const dummyPrivateGroups = [
  { id: 1, name: "달봉이네 가족", days: 265, privacy: "비공개", memories: 8, likes: 1.5, image: "" },
];

function PrivateGroupListPage() {
  const [privateGroups, setPrivateGroups] = useState(dummyPrivateGroups);

  return (
    <div className={styles.page}>
      <div className={styles.groupList}>
        {privateGroups.map(group => (
          <PrivateGroupItem key={group.id} group={group} />
        ))}
      </div>
      <LoadMore />
    </div>
  );
}

export default PrivateGroupListPage;