import styles from './ResultModal.module.css';

function ResultModal({ isOpen, type, onClose }) {
  if (!isOpen) return null;

  const messages = {
    success: {
      title: '그룹 만들기 성공',
      description: '그룹이 성공적으로 등록되었습니다.',
    },
    failure: {
      title: '그룹 만들기 실패',
      description: '그룹 등록에 실패했습니다.',
    },
    accessDenied: {
      title: '비공개 그룹 접근 실패',
      description: '비밀번호가 일치하지 않습니다.',
    },
  };

  const { title, description } = messages[type] || messages.failure;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <button className={styles.confirmButton} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
}

export default ResultModal;