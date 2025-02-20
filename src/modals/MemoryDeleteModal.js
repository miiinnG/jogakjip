import React, { useState } from "react";
import "./CommentModal.css";

const MemoryDeleteModal = ({ onClose, onDelete }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(password);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>추억 삭제</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label htmlFor="delete-password">삭제 권한 인증</label>
            <input 
              id="delete-password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요" 
              required
            />
          </div>
          <button type="submit" className="delete-button">삭제하기</button>
        </form>
      </div>
    </div>
  );
};

export default MemoryDeleteModal;
