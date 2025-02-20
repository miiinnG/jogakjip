import React from "react";
import "./MemoryList.css";

const MemoryListHeader = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  setSortOrder,
  addMemory,
}) => {
  return (
    <div className="memory-header">
      <h2 className="title">추억 목록</h2>
      <div className="controls">
        <button
          onClick={() => setFilter("public")}
          className={
            filter === "public" ? "active filter-button" : "filter-button"
          }
        >
          공개
        </button>
        <button
          onClick={() => setFilter("private")}
          className={
            filter === "private" ? "active filter-button" : "filter-button"
          }
        >
          비공개
        </button>

        <div className="search-container">
          <input
            type="text"
            placeholder="태그 혹은 제목을 입력해주세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="sort-dropdown"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="latest">최신순</option>
          <option value="likes">공감순</option>
        </select>

        <button className="upload-button" onClick={addMemory}>
          추억 올리기
        </button>
      </div>
    </div>
  );
};

export default MemoryListHeader;
