import React, { useState } from "react";
import MemoryHeader from "./MemoryHeader";
import MemoryCardList from "./MemoryCardList";
import "./MemoryList.css";

const MemoryList = () => {
  const [filter, setFilter] = useState("public");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  const addMemory = () => {
    console.log("추억 올리기 기능 추가 예정!");
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
