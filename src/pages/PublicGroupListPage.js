import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicGroupItem from '../components/PublicGroupItem';
import styles from './PublicGroupListPage.module.css';
import LoadMore from '../components/LoadMore';
import Nav from "../components/Nav";
import Warn from "../components/Warn";
import EmptyPublicGroupListPage from './EmptyPublicGroupListPage';
import GroupItem from '../components/GroupItem';
import mockData from "../api/mock.json";

function PublicGroupListPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups(mockData.groups);
  }, []);

  return (
    <div className={styles.container}>
      {groups.length === 0 ? (
        <EmptyPublicGroupListPage />
      ) : (
        <div className={styles.groupList}>
          {groups.map((group) => (
            <GroupItem key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PublicGroupListPage;
