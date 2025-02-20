import React from "react";
import "./GroupDelete.css"; // 스타일 적용

const GroupDelete = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>그룹 삭제</h2>
        <label>삭제 권한 인증</label>
        <input type="password" placeholder="비밀번호를 입력해주세요" />

        <button className="confirm-btn delete-btn">삭제하기</button>
      </div>
    </div>
  );
};

export default GroupDelete;