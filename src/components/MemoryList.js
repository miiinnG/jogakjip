import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MemoryHeader from "./MemoryListHeader";
import MemoryCardList from "./MemoryCardList";
import "./MemoryList.css";

const MemoryList = () => {
  const [filter, setFilter] = useState("public");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const navigate = useNavigate();

  const addMemory = () => {
    navigate("/groups/posts/create"); // 추억 올리기 페이지로 이동
  };

  return (
    <div className="memory-list-container">
      <MemoryHeader
        filter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSortOrder={setSortOrder}
        addMemory={addMemory}
      />
      <MemoryCardList
        filter={filter}
        searchQuery={searchQuery}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default MemoryList;
