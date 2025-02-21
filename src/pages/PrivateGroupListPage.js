import { useState, useEffect } from 'react';
import PrivateGroupItem from '../components/PrivateGroupItem';
import LoadMore from '../components/LoadMore';
import styles from './PrivateGroupListPage.module.css';
import { fetchGroups } from '../api/api'; // ✅ API 요청 추가

function PrivateGroupListPage() {
  const [privateGroups, setPrivateGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        setLoading(true);
        const response = await fetchGroups();
        if (response && response.groups) {
          // 🔹 비공개 그룹만 필터링하여 저장
          setPrivateGroups(response.groups.filter(group => !group.isPublic));
        } else {
          setPrivateGroups([]);
        }
      } catch (error) {
        console.error("비공개 그룹 목록을 불러오는 중 오류 발생:", error);
        setPrivateGroups([]);
        setError("비공개 그룹을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.groupList}>
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : privateGroups.length > 0 ? (
          privateGroups.map(group => (
            <PrivateGroupItem key={group.id} group={group} />
          ))
        ) : (
          <p className={styles.noGroupsText}>등록된 비공개 그룹이 없습니다.</p>
        )}
      </div>
      <LoadMore />
    </div>
  );
}

export default PrivateGroupListPage;