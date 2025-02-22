import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styles from './PrivateGroupAccessPage.module.css';
import { privateGroupAccess, verifyPassword } from '../api/api';
import logo from '../assets/logo.svg';

const PrivateGroupAccessPage = () => {
  const { groupId } = useParams();
  console.log("🔹 [DEBUG] useParams()에서 가져온 groupId:", groupId);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔹 [DEBUG] 입력된 groupId:", groupId);
    console.log("🔹 [DEBUG] 입력된 password:", password);
    console.log("🔹 [DEBUG] 입력된 groupId:", groupId);
    console.log("🔹 [DEBUG] 입력된 password:", password);

    try {
      const request = { password }; // ✅ 요청 객체 생성
      const response = await verifyPassword(groupId, request);
      
      console.log("✅ [DEBUG] API 응답:", response); // ✅ API 응답 확인

      if (response?.message === "비밀번호가 확인되었습니다.") {
        navigate(`/groups/${groupId}`);
      } else if (response?.message === "비밀번호가 틀렸습니다.") {
        setIsModalOpen(true);
        setErrorMessage("비밀번호가 틀렸습니다.");
        setPassword("");
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("❌ [DEBUG] 비밀번호 검증 실패:", error);
      setErrorMessage("비밀번호 검증 중 오류가 발생했습니다.");
      setIsModalOpen(true)
      setPassword(""); // 비밀번호 초기화
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* 로고 추가 */}
      <Link to="/groups">
        <img src={logo} alt="조각집 로고" className={styles.logo} />
      </Link>

      <div className={styles.container}>
        <h1 className={styles.title}>비공개 그룹</h1>
        <p className={styles.description}>비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            placeholder="그룹 비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>제출하기</button>
        </form>

        {/* 오류 메시지 표시 */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
              <h2 className={styles.modalTitle}>비공개 그룹 접근 실패</h2>
              <p className={styles.modalText}>비밀번호가 일치하지 않습니다.</p>
              <button 
                className={styles.modalButton}
                onClick={() => setIsModalOpen(false)}
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateGroupAccessPage;