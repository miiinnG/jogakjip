import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PrivateGroupAccessPage.module.css';
import { verifyPassword } from '../api/groupApi';

const PrivateGroupAccessPage = () => {
  const { groupId } = useParams();
  const [password, setPassword] = useState("");
  const [isPublic, setIsPublic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkPublicStatus = async () => {
      try {
        const response = await fetch(`/api/groups/${groupId}/is-public`);
        if(!response.ok) throw new Error("네트워크 응답이 올바르지 않습니다.");
        const data = await response.json();

        if(data.isPublic) {
          navigate(`/groups/${groupId}`);
        } else {
          setIsPublic(false);
        }
      } catch (error) {
        console.error("그룹 공개 여부 확인 실패:", error);
        setModalMessage("그룹 정보를 불러오지 못했습니다.");
        setIsModalOpen(true);
      }
    };

    checkPublicStatus();
  }, [groupId,navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await verifyPassword(groupId, password);
      navigate(`/group/private/${groupId}`);
    } catch (error) {
      alert("비밀번호가 틀렸습니다.");
    }
  };

/*    if (group && password === group.password) {
      navigate(`/private-group/${group.id}`);
    } else {
      setModalType("failure");
      setIsModalOpen(true);
    }
  };
*/
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