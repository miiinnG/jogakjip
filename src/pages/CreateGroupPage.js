import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CreateGroupPage.module.css';
import logo from '../assets/logo.svg';
import { createGroup, uploadImage } from "../api/groupApi";

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(''); 

  // 파일 업로드 핸들러
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      try {
        const uploadedImageUrl = await uploadImage(file); // 서버에 업로드 후 URL 받기
        setImageUrl(uploadedImageUrl); // URL 저장
        console.log("✅ [Uploaded Image URL]:", uploadedImageUrl.imageUrl);
      } catch (error) {
        console.error("❌ 이미지 업로드 실패:", error);
        setModalMessage("이미지 업로드에 실패했습니다.");
        setIsModalOpen(true);
      } 
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
      password: password || "default_password", // 빈 값이면 기본값 설정
      imageUrl: imageUrl || "default_image_url", // 빈 값이면 기본 이미지 URL 사용
      isPublic: Boolean(isPublic), // boolean 값으로 변환
      introduction: introduction
    };

    console.log("🚀 [Request Body]:", groupData);

    try {
      await createGroup(groupData);
      setModalMessage("그룹이 성공적으로 생성되었습니다.");
      navigate("/groups/public");
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