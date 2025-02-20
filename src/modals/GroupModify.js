import React, { useState } from "react";
import "./GroupModify.css"; // 스타일 적용

const GroupModify = ({ onClose }) => {
  const [isPublic, setIsPublic] = useState(true); // 기본값: 공개

  const toggleVisibility = () => {
    setIsPublic((prev) => !prev);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>그룹 정보 수정</h2>

        <label>그룹명</label>
        <input type="text" placeholder="그룹명을 입력하세요" />

        <label>대표 이미지</label>
        <input type="file" />

        <label>그룹 소개</label>
        <textarea placeholder="그룹을 소개해주세요"></textarea>

        <label>그룹 공개 선택</label>
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="public-toggle"
            checked={isPublic}
            onChange={toggleVisibility}
          />
          <label htmlFor="public-toggle" className="toggle-label">
            {isPublic ? "공개" : "비공개"}
          </label>
        </div>

        <label>수정 권한 인증</label>
        <input type="password" placeholder="비밀번호를 입력해주세요" />

        <button className="confirm-btn">수정하기</button>
        <button className="close-btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default GroupModify;
