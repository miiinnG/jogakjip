import React, { useState, useEffect } from "react";
import Memory from "../components/Memory";
import CommentList from "../components/CommentList";
import data from "../mockDate.json";
import "./MemoryPage.css";
import Header from "../components/Header";

const MemoryPage = () => {
  const [memory, setMemory] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setMemory(data.memory);
    setComments(data.comments.data);
  }, []);

  if (!memory) return <p>로딩 중...</p>;

  return (
    <div className="memory-page">
      <Header />
      <Memory memory={memory} />
      <CommentList comments={comments} />
    </div>
  );
};

export default MemoryPage;
