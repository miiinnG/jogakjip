import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Nav from "../components/Nav";
import PublicGroupItem from "../components/PublicGroupItem";
import PrivateGroupItem from "../components/PrivateGroupItem";
import Footer from "../components/Footer";
import styles from "./PublicGroupListPage.module.css";
import noteIcon from "../assets/note-icon.svg"; // 아이콘 파일 import
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
                console.log("🔍 [DEBUG] API 응답 데이터:", response); // ✅ 디버깅 추가
                if (response) {
                    setGroups(response.data); // ✅ API에서 받아온 데이터 저장
                } else {
                    setGroups([]);
                }
            } catch (error) {
                console.error("공개 그룹 목록을 불러오는 중 오류 발생:", error);
                setGroups([]); // 오류 발생 시 빈 배열
                setError("그룹을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        loadGroups();
    }, []);

    // 🔹 filteredGroups에서 API 데이터 사용
    const filteredGroups = (groups || []).filter(group => {
        console.log("🔍 [DEBUG] 그룹 데이터:", group); // ✅ 디버깅 추가
        return (selectedTab === "public" ? group.isPublic === true : group.isPublic === false) &&
            group.name.toLowerCase().includes(searchQuery.toLowerCase());
    });    

    const sortedGroups = () => {
        return [...filteredGroups].sort((a, b) => {
            if (sortBy === "latest") {
                return new Date(b.createdAt) - new Date(a.createdAt); // 최신순 정렬
            } else if (sortBy === "mostPosted") {
                return b.postCount - a.postCount; // 게시글 많은순
            } else if (sortBy === "mostLiked") {
                return b.likeCount - a.likeCount; // 공감순
            } else if (sortBy === "mostBadge") {
                return (b.badges?.length || 0) - (a.badges?.length || 0); // 획득 배지순
            }
            return 0;
        });
    };    

    return (
        <div className={styles.page}>
            <Nav showTabs={true} showSearch={true} showCreateButton={true} showSortDropDown={true} setSelectedTab={setSelectedTab} setSortBy={setSortBy} setSearchQuery={setSearchQuery} />

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
                        <Link to="/group/create" className={styles.createButton}>그룹 만들기</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicGroupListPage;