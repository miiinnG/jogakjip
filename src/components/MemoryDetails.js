import React from "react";
import flowerImg from "../assets/flower.svg";
import commentImg from "../assets/comment.svg";
import "./MemoryDetails.css";

const MemoryDetails = ({ title, tags, location, createdAt, likeCount, commentCount }) => {
  const formattedDate = new Date(createdAt).toLocaleString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="memory-details">
      <h1>{title}</h1>
      <p>{tags.map(tag => `#${tag}`).join(" ")}</p>
      <div>
        <span className="memory-details-location">{location}</span>
        <span className="memory-details-time">·  {formattedDate}</span>
        <span className="memory-actions-count"><img src={flowerImg} alt="공감" />{likeCount} <img src={commentImg} alt="댓글" /> {commentCount}</span>
        <button className="memory-action-btn">
            <img src={flowerImg} alt="공감" /> 공감 보내기
        </button>
      </div>
    </div>
  );
};

export default MemoryDetails;
