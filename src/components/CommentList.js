import React, { useState } from "react";
import Comment from "./Comment";
import "./CommentList.css";
import CommentModal from "../modals/CommentModal";
import CommentDeleteModal from "../modals/CommentDeleteModal";
import { postComment, updateComment, deleteComment } from "../api/api";

const CommentList = ({ comments, setComments, postId, onCommentChange }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isError, setIsError] = useState(false);

  const openAddModal = () => setIsAddModalOpen(true);
  const openEditModal = (comment) => {
    setIsError(false);
    setSelectedComment(comment);
    setIsEditModalOpen(true);
  };
  const openDeleteModal = (comment) => {
    setIsError(false);
    setSelectedComment(comment);
    setIsDeleteModalOpen(true);
  };

  const handlePostSubmit = async (commentData) => {
    const newComment = await postComment(postId, commentData);
    if (newComment) {
      setComments((prev) => {
        if (!prev || !prev.data) return { data: [newComment] };
        return { ...prev, data: [...prev.data, newComment] };
      });
      setIsAddModalOpen(false);
      onCommentChange(); // ✅ 댓글 추가 후 MemoryPage 업데이트
    }
  };

  const handleEditSubmit = async (commentId, commentData) => {
    const updatedComment = await updateComment(commentId, commentData);
    if (updatedComment) {
      setIsError(false);
      setComments((prev) => {
        if (!prev || !prev.data) return prev;
        return {
          ...prev,
          data: prev.data.map((c) => (c.id === commentId ? updatedComment : c)),
        };
      });
      setIsEditModalOpen(false);
      onCommentChange(); // ✅ 댓글 수정 후 MemoryPage 업데이트
    } else {
      setIsError(true);
    }
  };

  const handleDelete = async (commentData) => {
    if (selectedComment) {
      const success = await deleteComment(selectedComment.id, commentData);
      if (success) {
        setIsError(false);
        setComments((prev) => {
          if (!prev || !prev.data) return prev;
          return { ...prev, data: prev.data.filter((c) => c.id !== selectedComment.id) };
        });
        setIsDeleteModalOpen(false);
        onCommentChange(); // ✅ 댓글 삭제 후 MemoryPage 업데이트
      } else {
        setIsError(true);
      }
    }
  };

  return (
    <div className="commentList">
      <button className="memory-page-btn" onClick={openAddModal}>
        댓글 등록하기
      </button>
      <h3>댓글 {comments.length}</h3>
      {comments
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((comment) => (
          <Comment
            key={comment.id}
            {...comment}
            onEdit={() => openEditModal(comment)}
            onDelete={() => openDeleteModal(comment)}
          />
        ))}

      {isAddModalOpen && (
        <CommentModal mode="create" onClose={() => setIsAddModalOpen(false)} onSubmit={handlePostSubmit} />
      )}

      {isEditModalOpen && (
        <CommentModal mode="edit" initialData={selectedComment} onClose={() => setIsEditModalOpen(false)} onSubmit={handleEditSubmit} isError={isError} />
      )}

      {isDeleteModalOpen && (
        <CommentDeleteModal onClose={() => setIsDeleteModalOpen(false)} onSubmit={handleDelete} isError={isError} />
      )}
    </div>
  );
};

export default CommentList;
