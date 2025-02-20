// 게시물 상세 페이지
import React from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams(); // ✅ URL에서 게시물 ID 가져오기

  return (
    <div>
      <h2>게시물 상세 페이지</h2>
      <p>게시물 ID: {id}</p>
      <p>여기에 게시물의 상세 내용을 표시할 예정입니다.</p>
    </div>
  );
};

export default PostDetail;
