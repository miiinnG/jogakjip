import React, { useState } from "react";
import "./GroupModify.css";
import { imageToUrl } from "../api/api";

const GroupModify = ({ onClose, onSubmit, groupData }) => {
  const [name, setName] = useState(groupData?.name || "");
  const [introduction, setIntroduction] = useState(groupData?.introduction || "");
  const [isPublic, setIsPublic] = useState(groupData?.isPublic || false);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(groupData?.imageUrl || "");

  const handleImageUpload = async (file) => {
    if (!file || !(file instanceof File)) return;
    try {
      const uploadedUrl = await imageToUrl(file);
      setImageUrl(uploadedUrl);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image) {
      await handleImageUpload(image);
    }
    onSubmit({ name, introduction, isPublic, password, imageUrl });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>그룹 정보 수정</h2>
        <form onSubmit={handleSubmit}>
          <label>그룹명</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="그룹명을 입력하세요" required />

          <label>대표 이미지</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <label>그룹 소개</label>
          <textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)} placeholder="그룹을 소개해주세요"></textarea>

          <label>그룹 공개 선택</label>
          <div className="toggle-switch">
            <input type="checkbox" id="public-toggle" checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
            <label htmlFor="public-toggle" className="toggle-label">
              {isPublic ? "공개" : "비공개"}
            </label>
          </div>

          <label>수정 권한 인증</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력해주세요" required />

          <button type="submit" className="confirm-btn">수정하기</button>
          <button type="button" className="close-btn" onClick={onClose}>닫기</button>
        </form>
      </div>
    </div>
  );
};

export default GroupModify;
