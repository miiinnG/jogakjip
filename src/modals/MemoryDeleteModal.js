import React, { useState } from "react";
import "./CommentModal.css";

const MemoryDeleteModal = ({ onClose, onDelete, isError }) => {
  const [postPassword, setPostPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const memoryData = { postPassword };
    onDelete(memoryData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>추억 삭제</h2>

        <form name="MemoryDeleteForm" onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label htmlFor="delete-password">삭제 권한 인증</label>
            <input 
              id="delete-password"
              type="password" 
              value={postPassword}
              onChange={(e) => setPostPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요" 
              required
              className={isError ? "error" : ""}
            />
          </div>
          <button type="submit" className="memory-delete-button">삭제하기</button>
        </form>
      </div>
    </div>
  );
};

export default MemoryDeleteModal;
