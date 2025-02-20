import React, { useState } from "react";
import Comment from "./Comment";
import "./CommentList.css";
import CommentModal from "../modals/CommentModal";
import CommentDeleteModal from "../modals/CommentDeleteModal";

const CommentList = ({ comments }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openEditModal = (comment) => {
    setSelectedComment(comment); // 수정할 댓글 저장
    setIsEditModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handlePostSubmit = (commentData) => {
    console.log(`댓글 등록`);
    console.log(commentData);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (commentId, commentData) => {
    console.log(`댓글 수정 - ID: ${commentId}`);
    console.log(commentData);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    console.log(`댓글 삭제`);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="commentList">
      <button className="memory-page-btn" onClick={openAddModal}>댓글 등록하기</button>
      <h3>댓글 {comments.length}</h3>
      {comments.map((comment) => (
        <Comment 
          key={comment.id} 
          {...comment} 
          onEdit={() => openEditModal(comment)} // 댓글 정보를 넘김
          onDelete={openDeleteModal}
        />
      ))}

      {isAddModalOpen && (
        <CommentModal
          mode="create"
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handlePostSubmit}
        />
      )}

      {isEditModalOpen && (
        <CommentModal
          mode="edit"
          initialData={selectedComment} // 수정할 댓글 데이터 전달
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditSubmit}
        />
      )}

      {isDeleteModalOpen && (
        <CommentDeleteModal onClose={() => setIsDeleteModalOpen(false)} />
      )}
    </div>
  );
};

export default CommentList;
