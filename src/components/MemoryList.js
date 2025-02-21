import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MemoryHeader from "./MemoryListHeader";
import MemoryCardList from "./MemoryCardList";
import "./MemoryList.css";

const MemoryList = () => {
  const { groupId } = useParams();
  const [filter, setFilter] = useState("all"); // 🔥 기본값을 "all"로 변경
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const navigate = useNavigate();

  const addMemory = () => {
    navigate(`/groups/${groupId}/posts/create`);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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
        groupId={groupId}
        filter={filter}
        searchQuery={debouncedSearchQuery}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default MemoryList;
