import { useState } from 'react';
import styles from './PrivateGroupAccessPage.module.css';
import ResultModal from '../ResultModal';

function PrivateGroupAccessPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
const [modalType, setModalType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === '0000') {
      alert('비밀번호가 확인되었습니다. 그룹에 접근합니다.');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
      setModalType('accessDenied');
      setIsModalOpen(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>조각집</div>
      <h1 className={styles.title}>비공개 그룹</h1>
      <p className={styles.message}>비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.</p>

      <input
        type="password"
        className={styles.input}
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.submitButton} onClick={handleSubmit}>
        제출하기
      </button>
      <ResultModal isOpen={isModalOpen} type={modalType} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default PrivateGroupAccessPage;