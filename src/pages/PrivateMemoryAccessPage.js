import React, { useState } from "react";
import "./FormPage.css";
import Header from "../components/Header";

const PrivateMemoryAccessPage = ({ onSubmit }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="create-content">
      <Header />
      <h2>비공개 추억</h2>
      <h5>비공개 추억에 접근하기 위해 권한 확인이 필요합니다.</h5>
      <form name="MemoryCreateForm" className="create-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="delete-password">비밀번호를 입력해 주세요</label>
            <input 
              id="delete-password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요" 
              required
            />
          </div>
        <button type="submit" className="submit-button">제출하기</button>
      </form>
    </div>
  );
};

export default PrivateMemoryAccessPage;
