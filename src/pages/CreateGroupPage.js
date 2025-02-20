import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CreateGroupPage.module.css';
import logo from '../assets/logo.svg';
import { createGroup } from "../api/groupApi";

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 파일 업로드 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // 그룹 생성 API 호출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName) {
      setModalMessage("그룹명을 입력해주세요.");
      setIsModalOpen(true);
      return;
    }

/*    const formData = new FormData();
    formData.append("name", groupName);
    formData.append("introduction", introduction);
    formData.append("isPublic", isPublic);
    if (!isPublic) formData.append("password", password);
    if (image) formData.append("imageUrl", image); */

    const groupData = {
      name: groupName,
      password: password || null,
      imageUrl: "", // 이미지 업로드 기능이 없다면 빈 문자열
      isPublic: isPublic,
      introduction: introduction,
    };

    try {
      await createGroup(groupData);
      setModalMessage("그룹이 성공적으로 생성되었습니다.");
      setIsModalOpen(true);
      setTimeout(() => navigate("/group/public"),2000);
    } catch (error) {
      console.error("Error:", error);
      setModalMessage(error.message || "그룹 생성에 실패했습니다.");
      setIsModalOpen(true);
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (modalMessage === "그룹이 성공적으로 생성되었습니다.") {
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/"><img src={logo} alt="조각집 로고" className={styles.logo} /></Link>
      <h1 className={styles.title}>그룹 만들기</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 그룹명 입력 */}
        <label className={styles.label}>그룹명</label>
        <input 
          type="text" 
          placeholder="그룹명을 입력하세요"
          value={groupName} 
          onChange={(e) => setGroupName(e.target.value)}
          className={styles.input}
        />

        {/* 대표 이미지 업로드 */}
        <label className={styles.label}>대표 이미지</label>
        <div className={styles.imageUploadContainer}>
          <div className={styles.fileUpload}>
            <input 
              type="text"
              placeholder="파일을 선택해 주세요"
              readOnly
              className={styles.fileInput}
              value={image ? image.name : ""}
            />
            <label className={styles.fileButton}>
              파일 선택
              <input type="file" onChange={handleFileChange} className={styles.hiddenFileInput} />
            </label>
          </div>
          {image && <img src={URL.createObjectURL(image)} alt="미리보기" className={styles.previewImage} />}
        </div>

        {/* 그룹 소개 */}
        <label className={styles.label}>그룹 소개</label>
        <textarea
          placeholder="그룹을 소개해주세요"
          value={introduction} 
          onChange={(e) => setIntroduction(e.target.value)}
          className={styles.textarea}
        />

        {/* 공개 선택 */}
        <div className={styles.toggleContainer}>
          <span className={styles.toggleLabel}>그룹 공개 선택</span>
          <div className={styles.switchContainer}>
            <span className={isPublic ? styles.active : ''}>공개</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        {/* 비밀번호 입력 (비공개 시만 표시) */}
        {!isPublic && (
          <div>
            <label className={styles.label}>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>
        )}

        {/* 만들기 버튼 */}
        <button type="submit" className={styles.createButton}>만들기</button>
      </form>

      {/* 모달 */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>알림</h2>
            <p>{modalMessage}</p>
            <button onClick={handleCloseModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGroupPage;