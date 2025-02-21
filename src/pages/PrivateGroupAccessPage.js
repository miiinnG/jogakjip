import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PrivateGroupAccessPage.module.css';
import { privateGroupAccess } from '../api/api';

const PrivateGroupAccessPage = () => {
  const { groupId } = useParams();
  console.log("🔹 [DEBUG] useParams()에서 가져온 groupId:", groupId);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔹 [DEBUG] 입력된 groupId:", groupId);
    console.log("🔹 [DEBUG] 입력된 password:", password);

    try {
      const request = { password }; // ✅ 요청 객체 생성
      const success = await privateGroupAccess(groupId, request);
      
      console.log("✅ [DEBUG] API 응답:", success); // ✅ API 응답 확인
      if (success) {
        navigate(`/group/${groupId}/access`);
      } else {
        setErrorMessage("비밀번호가 틀렸습니다.");
        setPassword("");
      }
    } catch (error) {
      console.error("❌ [DEBUG] 비밀번호 검증 실패:", error);
      setErrorMessage("비밀번호 검증 중 오류가 발생했습니다.");
      setPassword(""); // 비밀번호 초기화
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>비공개 그룹 접근</h1>
      <p className={styles.description}>비공개 그룹에 접근하려면 비밀번호를 입력하세요.</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.submitButton}>제출하기</button>
      </form>

      {/* 오류 메시지 표시 */}
      {errorMessage && (
        <p className={styles.error}>{errorMessage}</p>
      )}
    </div>
  );
};

export default PrivateGroupAccessPage;