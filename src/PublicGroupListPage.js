import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicGroupItem from './PublicGroupItem';
import styles from './PublicGroupListPage.module.css';
import LoadMore from './LoadMore';

const dummyGroups = [
  {
    id: 1,
    name: "에델바이스",
    days: 265,
    privacy: "공개",
    description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
    badges: 2,
    memories: 8,
    likes: 1.5,
    image: "./assets/img1.svg"
  },
  {
    id: 2,
    name: "에델바이스",
    days: 265,
    privacy: "공개",
    description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
    badges: 2,
    memories: 8,
    likes: 1.5,
    image: ""
  }
];

function PublicGroupListPage() {
    const [publicGroups, setPublicGroups] = useState(dummyGroups);

    return (
    <div className={styles.page}>
        <h1 className={styles.title}>공개 그룹 목록</h1>
        <div className={styles.groupList}>
        {publicGroups.map(group => (
            <PublicGroupItem key={group.id} group={group} />
        ))}
        </div>
        <div className={styles.page}>
            <LoadMore />
        </div>
    </div>
    );
}

export default PublicGroupListPage;
