import React from "react";

const CommentDeleteModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>댓글 삭제</h2>

        <div className="modal-form">
          <div className="input-group">
            <label>삭제 권한 인증</label>
            <input type="password" placeholder="비밀번호를 입력해 주세요" />
          </div>
        </div>

        <button className="delete-button">삭제하기</button>
      </div>
    </div>
  );
};

export default CommentDeleteModal;
