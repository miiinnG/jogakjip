import React, { useState } from "react";
import "./FormPage.css";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { privateMemoryAccess } from "../api/api";

const PrivateMemoryAccessPage = () => {
  const { postId } = useParams();
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const request = { password };

      const success = await privateMemoryAccess(postId, request);
      if(success) {
        navigate(`/groups/posts/${postId}`);
      } else {
        setIsError(true);
        setPassword(""); // 비밀번호 초기화
      }
    } catch (e) {
      console.error('조회 실패: ',e);
      setIsError(true);
      setPassword(""); // 비밀번호 초기화
    }
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
              onChange={(e) => {
                setPassword(e.target.value);
                setIsError(false); // 입력이 변경되면 에러 상태 초기화
              }}
              placeholder={isError ? "잘못된 비밀번호입니다. 다시 입력해 주세요." : "비밀번호를 입력해 주세요"}
              required
              className={isError ? "error" : ""}
            />
          </div>
        <button type="submit" className="submit-button">제출하기</button>
      </form>
    </div>
  );
};

export default PrivateMemoryAccessPage;
