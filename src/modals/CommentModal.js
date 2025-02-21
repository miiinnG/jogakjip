import React, { useState, useEffect } from "react";
import "./CommentModal.css"; // 스타일 파일 import

const CommentModal = ({ mode, initialData = null, onClose, onSubmit, isError }) => {
  const [id, setId] = useState(null);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");  

  // 수정 모드라면 기존 데이터 세팅
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setId(initialData.id);
      setNickname(initialData.nickname);
      setContent(initialData.content);
    }
  }, [mode, initialData]);

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const commentData = { nickname, content, password };
    if (mode === "edit") {
      onSubmit(id, commentData); // 수정 모드에서는 id 포함
    } else {
      onSubmit(commentData); // 등록 모드에서는 id 없음
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{mode === "edit" ? "댓글 수정하기" : "댓글 등록하기"}</h2>

        <form name="CommentForm" className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해 주세요"
              required
              disabled={mode === "edit"}
            />
          </div>
          <div className="input-group">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="댓글 내용을 입력해 주세요"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              required
              className={isError ? "error" : ""}
            />
          </div>

          <button type="submit" className="submit-button">
            {mode === "edit" ? "수정하기" : "등록하기"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
