import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from './PrivateGroupAccessPage.module.css';

const PrivateGroupAccessPage = ({ group }) => {
  const { groupId } = useParams();
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (group && password === group.password) {
      navigate(`/private-group/${group.id}`);
    } else {
      setModalType("failure");
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>비공개 그룹</h1>
      <p className={styles.description}>
        비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="그룹 비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.submitButton}>제출하기</button>
      </form>

      {/* 모달 */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>비공개 그룹 접근 실패</h2>
            <p>비밀번호가 일치하지 않습니다.</p>
            <button onClick={handleCloseModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateGroupAccessPage;