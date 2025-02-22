import React, { useState } from "react";
import "./GroupDelete.css"; // 스타일 적용

const GroupDelete = ({ onClose, onDelete }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    onDelete(password);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>그룹 삭제</h2>
        <form onSubmit={handleSubmit}>
          <label>삭제 권한 인증</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="confirm-btn delete-btn">
            삭제하기
          </button>
          <button type="button" className="close-btn" onClick={onClose}>
            취소
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupDelete;
