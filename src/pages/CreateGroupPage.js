import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CreateGroupPage.module.css';
import logo from '../assets/logo.svg';
import Layout from "../components/Layout";

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileChange = (event) => {
      if (event.target.files.length > 0) {
          setSelectedFileName(event.target.files[0].name);
      } else {
          setSelectedFileName("");
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!groupName) {
      setModalType("failure");
      setIsModalOpen(true);
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: groupName,
      status: isPublic ? "공개" : "비공개",
      created_at: new Date().toISOString(),
      description: description,
      image: image ? URL.createObjectURL(image) : "default_thumbnail.jpg",
      badges: { achievements: 0, memories: 0, likes: 0 },
    };
    

    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    storedGroups.push(newGroup);
    localStorage.setItem('groups', JSON.stringify(storedGroups));

    setModalType("success");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (modalType === "success") {
      navigate('/');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
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
                <input type="file" onChange={handleImageUpload} className={styles.hiddenFileInput} />
              </label>
            </div>
            {image && <img src={URL.createObjectURL(image)} alt="미리보기" className={styles.previewImage} />}
          </div>

          {/* 그룹 소개 */}
          <label className={styles.label}>그룹 소개</label>
          <textarea
            placeholder="그룹을 소개해주세요"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
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
              <h2>{modalType === "success" ? "그룹 만들기 성공" : "그룹 만들기 실패"}</h2>
              <p>{modalType === "success" ? "그룹이 성공적으로 등록되었습니다." : "그룹 등록에 실패했습니다."}</p>
              <button onClick={handleCloseModal}>확인</button>
            </div>
          </div>
        )}
      </div>
  );
};

export default CreateGroupPage;