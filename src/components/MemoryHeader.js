import React, { useState } from "react";
import MemoryEditModal from "../modals/MemoryEditModal"; // 모달 컴포넌트 import
import MemoryDeleteModal from "../modals/MemoryDeleteModal";
import "./MemoryHeader.css";
import { deleteMemory } from "../api/api";
import { useNavigate } from "react-router-dom";

const MemoryHeader = ({ memory }) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async (memoryData) => {
    try {
      await deleteMemory(memory.id, memoryData); // 삭제 API 호출
      navigate('/'); // 삭제 성공 후 그룹 페이지로 이동(수정 필요)
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  }

  return (
    <div className="memory-detail-header">
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
        <MemoryDeleteModal onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default MemoryHeader;
