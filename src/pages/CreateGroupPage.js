import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateGroupPage.module.css';
import logo from '../assets/logo.svg';
import ResultModal from '../ResultModal';

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');

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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>그룹 만들기</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="그룹명을 입력하세요"
          value={groupName} 
          onChangeCapture={(e) => setGroupName(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="그룹을 소개해주세요"
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />
        <div className={styles.toggleContainer}>
          <label>공개</label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
        </div>
        <button type="submit" className={styles.createButton}>만들기</button>
      </form>

      {/* 모달 */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{modalType === "sucess" ? "그룹 만들기 성공" : "그룹 만들기 실패"}</h2>
            <p>{modalType === "success" ? "그룹이 성공적으로 등록되었습니다." : "그룹 등록에 실패했습니다."}</p>
            <button onClick={handleCloseModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGroupPage;