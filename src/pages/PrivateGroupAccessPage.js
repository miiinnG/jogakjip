import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PrivateGroupAccessPage.module.css';
import { verifyPassword } from '../api/api';

const PrivateGroupAccessPage = () => {
  const { id } = useParams();
  console.log("🔹 [DEBUG] useParams()에서 가져온 id:", id);
  console.log("🔹 현재 id:", id);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔹 [DEBUG] 입력된 id:", id); // ✅ id가 올바르게 전달되는지 확인
    console.log("🔹 [DEBUG] 입력된 password:", password); // ✅ 입력된 비밀번호 확인

    try {
      const response = await verifyPassword(id, password);
      console.log("✅ [DEBUG] API 응답:", response); // ✅ API 응답 확인
      if (response.message === "비밀번호가 확인되었습니다") {
        navigate(`/private/${id}/group`);
      }
    } catch (error) {
      console.error("❌ [DEBUG] 비밀번호 검증 실패:", error);
      setErrorMessage(error.message);
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