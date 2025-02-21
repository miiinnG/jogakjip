import React from "react";
import "./MemoryCard.css";

const MemoryCard = ({ memory }) => {
  return (
    <div className="memory-card">
      {memory.isPublic ? (
        <img
          src={memory.imageUrl}
          alt={memory.title}
          className="memory-image"
        />
      ) : (
        <div className="hidden-image">🔒 비공개</div>
      )}

      <div className="memory-content">
        <div className="memory-header">
          <div className="memory-info">
            <span className="nickname">{memory.nickname}</span>
            <span className="divider">|</span>
            <span className="visibility">
              {memory.isPublic ? "공개" : "비공개"}
            </span>
          </div>
        </div>

        <h2 className="memory-title">{memory.title}</h2>

        <div className="memory-tags">
          {memory.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag.tagName} {/* 🔥 객체에서 tagName을 올바르게 추출 */}
            </span>
          ))}
        </div>

        <div className="memory-footer">
          <span className="location">{memory.location}</span>
          <span className="date">{memory.createdAt}</span>
          <div className="stats">
            <span className="icon">❤️ {memory.likeCount}</span>
            <span className="icon">💬 {memory.commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
