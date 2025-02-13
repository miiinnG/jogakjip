import { useState } from 'react';
import styles from './CreateGroupPage.module.css';
import logo from './assets/logo.svg';
import ResultModal from './ResultModal';

function CreateGroupPage() {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGroupImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`그룹 "${groupName}"이 생성되었습니다!`);
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="로고" className={styles.logo} />
      <h1 className={styles.title}>그룹 만들기</h1>
      <input
        type="text"
        className={styles.input}
        placeholder="그룹명을 입력하세요"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <div className={styles.imageUploadContainer}>
        <input
          type="text"
          className={styles.imageInput}
          placeholder="파일을 선택해주세요"
          value={groupImage ? groupImage.name : ''}
          readOnly
        />
        <label className={styles.imageButton}>
          파일 선택
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>
      <textarea
        className={styles.textarea}
        placeholder="그룹을 소개해주세요"
        value={groupDescription}
        onChange={(e) => setGroupDescription(e.target.value)}
      />
      <div className={styles.toggleContainer}>
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          {isPublic ? '공개' : '비공개'}
        </label>
      </div>

      {!isPublic && (
        <input
          type="password"
          className={styles.input}
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}

        <div>
        <button onClick={handleSubmit}>그룹 만들기</button>

    +     <ResultModal isOpen={isModalOpen} type={modalType} onClose={() => setIsModalOpen(false)} />
        </div>
    </div>
  );
}

export default CreateGroupPage;