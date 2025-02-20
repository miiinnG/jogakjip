import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Memory from "../components/Memory";
import CommentList from "../components/CommentList";
import Header from "../components/Header";
import { fetchMemory, fetchComments } from "../api/api"; // API 함수 import
import "./MemoryPage.css";

const MemoryPage = () => {
  const { postId } = useParams();
  const [memory, setMemory] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const memoryData = await fetchMemory(postId);
      const commentData = await fetchComments(postId);

      setMemory(memoryData);
      setComments(commentData);
      setLoading(false);
    };

    getData();
  }, [postId]);

  if (loading) return <p>로딩 중...</p>;
  if (!memory) return <p>데이터를 불러오는 데 실패했습니다.</p>;

  return (
    <div className="memory-page">
      <Header />
      <Memory memory={memory} setMemory={setMemory} />
      <CommentList comments={comments.data} postId={postId} setComments={setComments} />
    </div>
  );
};

export default MemoryPage;
