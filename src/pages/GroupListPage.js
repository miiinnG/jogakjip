import { useState, useEffect } from 'react';
import GroupItem from '../components/GroupItem';
import EmptyPublicGroupListPage from './EmptyPublicGroupListPage';
import styles from "./CreateGroupPage.module.css";

const GroupListPage = ({ type }) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch("/mock.json")
            .then((res) => res.json())
            .then((data) => {
                const filteredGroups = data.groups.filter(group => group.status === type);
                setGroups(filteredGroups);
            })
            .catch((err) => console.error("데이터 로드 실패:", err));
    }, [type]);

    return (
        <div className={styles.page}>
            <h1 className={styles.titl}>{type === "공개" ? "공개 그룹 목록" : "비공개 그룹 목록"}</h1>
            
            {groups.length > 0 ? (
                <div className={styles.groupList}>
                    {groups.map(group => (
                        <GroupItem key={group.id} group={group} />
                    ))}
                </div>
            ) : (
                <EmptyPublicGroupListPage />
            )}
        </div>
    );
};

export default GroupListPage;