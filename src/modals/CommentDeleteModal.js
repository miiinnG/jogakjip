import React, { useState } from "react";

const CommentDeleteModal = ({ onClose, onSubmit, isError }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const commentData = { password };
    onSubmit(commentData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>댓글 삭제</h2>

        <form name="CommentDeleteForm" className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>삭제 권한 인증</label>
            <input 
            id="password"
            type="password" 
            placeholder="비밀번호를 입력해 주세요" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={isError ? "error" : ""}
            />
          </div>
        

        <button type="submit" className="comment-delete-button">삭제하기</button>
        </form>
      </div>
    </div>
  );
};

export default CommentDeleteModal;
