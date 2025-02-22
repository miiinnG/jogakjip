import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Nav from "../components/Nav";
import PublicGroupItem from "../components/PublicGroupItem";
import PrivateGroupItem from "../components/PrivateGroupItem";
import Footer from "../components/Footer";
import styles from "./PublicGroupListPage.module.css";
import noteIcon from "../assets/note-icon.svg"; 
import { fetchGroups } from "../api/api";

const PublicGroupListPage = () => {
    const [groups, setGroups] = useState([]);
    const [selectedTab, setSelectedTab] = useState("public");
    const [sortBy, setSortBy] = useState("mostLiked");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadGroups = async () => {
            try {
                setLoading(true);
                const response = await fetchGroups();
                console.log("🔍 [DEBUG] API 응답 데이터:", response); 
                
                if (response) {
                    setGroups(response.groups || []); 
                } else {
                    setGroups([]);
                }
            } catch (error) {
                console.error("공개 그룹 목록을 불러오는 중 오류 발생:", error);
                setGroups([]);
                setError("그룹을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        loadGroups();
    }, []);

    // ✅ 공개/비공개 그룹 필터링 수정
    const filteredGroups = (groups || []).filter(group => {
        console.log("🔍 [DEBUG] 그룹 데이터:", group);
        return (selectedTab === "public" ? group.isPublic : !group.isPublic) &&
            group.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const sortedGroups = () => {
        return [...filteredGroups].sort((a, b) => {
            if (sortBy === "latest") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortBy === "mostPosted") {
                return b.postCount - a.postCount;
            } else if (sortBy === "mostLiked") {
                return b.likeCount - a.likeCount;
            } else if (sortBy === "mostBadge") {
                return (b.badges?.length || 0) - (a.badges?.length || 0);
            }
            return 0;
        });
    };

    return (
        <div className={styles.page}>
            <Nav 
                showTabs={true} 
                showSearch={true} 
                showCreateButton={true} 
                showSortDropDown={true} 
                setSelectedTab={setSelectedTab} 
                setSortBy={setSortBy} 
                setSearchQuery={setSearchQuery} 
            />

            <div className={styles.groupList}>
                {loading ? (
                    <p>로딩 중...</p>
                ) : error ? (
                    <p className={styles.errorMessage}>{error}</p>
                ) : sortedGroups().length > 0 ? (
                    sortedGroups().map(group => (
                        selectedTab === "public" ? (
                            <PublicGroupItem key={group.id} group={group} />
                        ) : (
                            <PrivateGroupItem key={group.id} group={group} />
                        )
                    ))
                ) : (
                    <div className={styles.noGroupsContainer}>
                        <img src={noteIcon} alt="No Groups Icon" className={styles.noGroupsIcon} />
                        <p className={styles.noGroupsText}>등록된 그룹이 없습니다.</p>
                        <p className={styles.createPrompt}>가장 먼저 그룹을 만들어보세요!</p>
                        <Link to="/groups/create" className={styles.createButton}>그룹 만들기</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicGroupListPage;
