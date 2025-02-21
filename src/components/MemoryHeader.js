import React, { useState } from "react";
import MemoryEditModal from "../modals/MemoryEditModal";
import MemoryDeleteModal from "../modals/MemoryDeleteModal";
import "./MemoryHeader.css";
import { deleteMemory, updateMemory } from "../api/api";
import { useNavigate } from "react-router-dom";

const MemoryHeader = ({ memory }) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDelete = async (memoryData) => {
    try {
      const success = await deleteMemory(memory.id, memoryData);
      if (success) {
        navigate(`/group/${memory.groupId}`);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  const handleEdit = async (updatedData) => {
    try {
      console.log(updatedData);
      const success = await updateMemory(memory.id, updatedData);
      if (success) {
        navigate(0); // 페이지 새로고침으로 변경된 데이터 반영
      }
    } catch (error) {
      console.error('수정 실패:', error);
    }
  };

  return (
    <div className="memory-detail-header">
      <div className="memory-header-left">
        <span>{memory.nickname}</span>
        <span>{memory.isPublic ? "| 공개" : "| 비공개"}</span>
      </div>
      <div className="memory-header-right">
        <button onClick={() => {
          setIsEditModalOpen(true);
          setIsError(false);
        }}>추억 수정하기</button>
        <button onClick={() => {
          setIsDeleteModalOpen(true);
          setIsError(false);
        }}>추억 삭제하기</button>
      </div>

      {isEditModalOpen && (
        <MemoryEditModal 
          onClose={() => setIsEditModalOpen(false)}
          initialData={memory}
          onSubmit={handleEdit}
          isError={isError}
        />
      )}

      {isDeleteModalOpen && (
        <MemoryDeleteModal onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDelete} isError={isError} />
      )}
    </div>
  );
};

export default MemoryHeader;
