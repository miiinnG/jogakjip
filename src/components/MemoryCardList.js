import React, { useState, useEffect } from "react";
import MemoryCard from "./MemoryCard";
import "./MemoryList.css";
import dummyData from "../data/dummyData";
import badgeData from "../data/badgeData"; // 그룹 데이터 가져오기
import moreImage from "../assets/more.png";
import blockImage from "../assets/block.png";

const MemoryCardList = ({ filter, searchQuery, sortOrder }) => {
  const [memories, setMemories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [groupInfo, setGroupInfo] = useState(null);

  useEffect(() => {
    setMemories(dummyData); // 더미 데이터 할당
    setGroupInfo(badgeData[0]); // 그룹 데이터 가져오기
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const filteredMemories = memories
    .filter((memory) =>
      filter === "public" ? memory.isPublic : !memory.isPublic
    )
    .filter(
      (memory) =>
        memory.title.includes(searchQuery) ||
        memory.tags.some((tag) => tag.includes(searchQuery))
    )
    .sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : b.likeCount - a.likeCount
    );

  const isMemoryEmpty =
    filteredMemories.length === 0 || (groupInfo && groupInfo.postCount === 0);

  return (
    <div>
      {/* 🔹 추억이 없을 경우 */}
      {isMemoryEmpty ? (
        <div className="empty-memory">
          <img src={blockImage} alt="게시된 추억 없음" className="block-img" />
          <p className="empty-text">게시된 추억이 없습니다.</p>
          <p className="empty-subtext">첫 번째 추억을 올려보세요!</p>
        </div>
      ) : (
        <>
          <div className="memory-grid">
            {filteredMemories.slice(0, visibleCount).map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>

          {/* 🔹 더보기 버튼 */}
          {visibleCount < filteredMemories.length && (
            <div className="load-more-container">
              <button onClick={loadMore} className="load-more-btn">
                <img src={moreImage} alt="더보기" className="load-more-image" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MemoryCardList;
