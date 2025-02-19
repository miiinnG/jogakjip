import React, { useState } from "react";
import MemoryEditModal from "../modals/MemoryEditModal"; // 모달 컴포넌트 import
import MemoryDeleteModal from "../modals/MemoryDeleteModal";
import "./MemoryHeader.css";

const MemoryHeader = ({ memory }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="memory-header">
      <div className="memory-header-left">
        <span>{memory.nickname}</span>
        <span>{memory.isPublic ? "| 공개" : "| 비공개"}</span>
      </div>
      <div className="memory-header-right">
        <button onClick={() => setIsEditModalOpen(true)}>추억 수정하기</button>
        <button onClick={() => setIsDeleteModalOpen(true)}>추억 삭제하기</button>
      </div>

      {isEditModalOpen && (
        <MemoryEditModal 
          onClose={() => setIsEditModalOpen(false)}
          initialData={memory} // memory 데이터 전달
          onSubmit={(formData) => {
            console.log("수정된 데이터:", formData);
            setIsEditModalOpen(false);
          }}
        />
      )}

      {isDeleteModalOpen && (
        <MemoryDeleteModal onClose={() => setIsDeleteModalOpen(false)} />
      )}
    </div>
  );
};

export default MemoryHeader;
