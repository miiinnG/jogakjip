import profileImage from "../assets/profile.png";
import badge1 from "../assets/badge1.png";
import badge2 from "../assets/badge2.png";
import badge3 from "../assets/badge3.png";

const BadgeData = [
  {
    id: 1,
    name: "달봉이네 가족",
    imageUrl: profileImage, // ✅ import한 이미지 사용
    isPublic: true,
    likeCount: 486,
    badges: [badge1, badge2, badge3], // ✅ import한 이미지 사용
    postCount: 31,
    createdAt: "2024-04-22T07:47:49.803Z",
    introduction: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
  },
];

export default BadgeData;
