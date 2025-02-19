import React, { useState } from "react";
import penImg from "../assets/pen.svg";
import binImg from "../assets/trashBin.svg";
import "./Comment.css"; // CSS 파일 import


const Comment = ({ nickname, content, createdAt, onEdit, onDelete }) => {
  // 날짜를 'YY.MM.DD HH:mm' 형식으로 변환
  const formattedDate = new Date(createdAt)
    .toISOString()
    .slice(2, 16) // "24.02.12T15:30"
    .replace("T", " ")
    .replace(/-/g, "."); // "24.02.12 15:30"

  return (
    <div className="comment">
      <div className="comment-content-wrapper">
        <div className="comment-header">
          <strong>{nickname}</strong>
          <span className="comment-date">{formattedDate}</span>
        </div>
        <p className="comment-content">{content}</p>
      </div>
      <div className="comment-footer">
        <button className="edit-btn" onClick={onEdit}><img src={penImg} alt="수정" /></button>
        <button className="delete-btn" onClick={onDelete}><img src={binImg} alt="삭제" /></button>
      </div>
    </div>
  );
};

export default Comment;
