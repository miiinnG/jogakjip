import React, { useState, useEffect } from "react";
import "./GroupInfo.css";
import flowerImage from "../assets/flower.png";
import likeButton from "../assets/like_button.png";
import Modify from "../modal/GroupModify"; // 수정 모달
import GroupDelete from "../modal/GroupDelete"; // 삭제 모달
import BadgeData from "../data/badgeData"; // 데이터 import

const GroupInfo = () => {
  const [groupData, setGroupData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setGroupData(BadgeData[0]); // BadgeData에서 데이터 가져오기
  }, []);

  if (!groupData) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="group-container">
      {/* 왼쪽 섹션: 대표 이미지 및 그룹 정보 */}
      <div className="group-left">
        <img
          src={groupData.imageUrl || "/default-profile.png"}
          alt="대표 이미지"
          className="profile-img"
        />
        <div className="group-info">
          <div className="group-title-container">
            <h2>{groupData.name}</h2>
            <p className="group-meta">
              D+
              {Math.floor(
                (new Date() - new Date(groupData.createdAt)) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              | {groupData.isPublic ? "공개" : "비공개"}
            </p>
          </div>
          <p className="group-stats">
            추억 {groupData.postCount} | 그룹 공감 {groupData.likeCount}
          </p>
          <p className="group-description">{groupData.introduction}</p>

          {/* 🔹 획득 배지 */}
          <h5 className="badge-title">획득 배지</h5>
          <div className="badges">
            {groupData.badges.map((badge, index) => (
              <img
                key={index}
                src={badge}
                alt={`badge-${index}`}
                className="badge-img"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽 섹션: 수정/삭제 버튼 + 꽃 이미지 + 공감 버튼 */}
      <div className="group-right">
        <div className="group-actions">
          <button
            className="edit-button"
            onClick={() => setIsEditModalOpen(true)}
          >
            그룹 정보 수정하기
          </button>
          <button
            className="delete-button"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            그룹 삭제하기
          </button>
        </div>
        <div className="flower-container">
          <img src={flowerImage} alt="공감" className="flower-img" />
          <button className="like-button">
            <img src={likeButton} alt="공감 보내기" />
          </button>
        </div>
      </div>

      {/* 🔹 수정 모달 */}
      {isEditModalOpen && <Modify onClose={() => setIsEditModalOpen(false)} />}

      {/* 🔹 삭제 모달 */}
      {isDeleteModalOpen && (
        <GroupDelete onClose={() => setIsDeleteModalOpen(false)} />
      )}
    </div>
  );
};

export default GroupInfo;
