import axios from "axios";

// ✅ Axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://codeit-zogakzip-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// ✅ 그룹 관련 API 요청 통합
export const createGroup = async (groupData) => {
  try {
    console.log("🔹 [Request Body]:", JSON.stringify(groupData, null, 2));
    const response = await api.post("/groups",groupData);
    console.log("✅ [Response]:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 그룹 생성 중 오류 발생:", error.response ? error.response.data : error);
    throw new Error("그룹 생성에 실패했습니다.");
  }
};

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await api.post("/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.imageUrl;
  } catch (error) {
    console.error("❌ 이미지 업로드 중 오류 발생:", error.response ? error.response.data : error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }
};

// ✅ 그룹 목록 조회 (공개/비공개 필터링 가능)
export const fetchGroups = async () => {
  try {
    const response = await api.get("/groups");
    return response.data;
  } catch (error) {
    console.error("❌ 그룹 목록 조회 오류:", error.response ? error.response.data : error);
    return null;
  }
};

// ✅ 비밀번호 검증 (그룹 접근)
export const verifyPassword = async (id, password) => {
  console.log("🔹 [DEBUG] API 요청 시작 - verifyPassword");
  console.log("🔹 [DEBUG] 요청 URL:", `/groups/${id}/verify-password`);
  console.log("🔹 [DEBUG] 요청 바디:", { password });
  try {
    const response = await api.post(`/groups/${id}/verify-password`, { password });
    return response.data;
  } catch (error) {
    console.error("❌ 비밀번호 확인 오류:", error.response ? error.response.data : error);
    throw new Error("비밀번호가 틀렸습니다.");
  }
};

// ✅ 그룹 공개 여부 조회
export const checkGroupVisibility = async (groupId) => {
  try {
    const response = await api.get(`/groups/${groupId}/is-public`);
    return response.data.isPublic;
  } catch (error) {
    console.error("❌ 공개 여부 조회 오류:", error.response ? error.response.data : error);
    return null;
  }
};