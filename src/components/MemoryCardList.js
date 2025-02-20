import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MemoryCard from "./MemoryCard";
import "./MemoryList.css";
import dummyData from "../data/dummyData";
import moreImage from "../assets/more.png";
import blockImage from "../assets/block.png";

const MemoryCardList = ({ filter, searchQuery, sortOrder }) => {
  const [memories, setMemories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const navigate = useNavigate();

  useEffect(() => {
    setMemories(dummyData); // 더미 데이터 할당
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

  return (
    <div>
      {/* 🔹 추억이 없을 경우 */}
      {filteredMemories.length === 0 ? (
        <div className="empty-memory">
          <img src={blockImage} alt="게시된 추억 없음" className="block-img" />
          <p className="empty-text">게시된 추억이 없습니다.</p>
          <p className="empty-subtext">첫 번째 추억을 올려보세요!</p>
        </div>
      ) : (
        <>
          {/* 🔹 게시물 목록 */}
          <div className="memory-grid">
            {filteredMemories.slice(0, visibleCount).map((memory) => (
              <div
                key={memory.id}
                onClick={() => navigate(`/groups/posts/${memory.id}`)} // 클릭 시 이동
                style={{ cursor: "pointer" }} // 클릭 가능하도록 커서 변경
              >
                <MemoryCard memory={memory} />
              </div>
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
