import api from "./api"; // api.js에서 생성한 axios 인스턴스 사용

const API_BASE_URL = "/api/groups"; // baseURL이 api.js에서 설정됨

export const createGroup = async (groupData) => {
  try {
      console.log("🔹 [Request Body]:", JSON.stringify(groupData, null, 2)); // 요청 데이터 확인
      const response = await api.post("/api/groups", groupData);
      console.log("✅ [Response]:", response.data);
      return response.data;
  } catch (error) {
      console.error('❌ 그룹 생성 중 오류 발생:', error.response ? error.response.data : error);
      throw new Error('그룹 생성에 실패했습니다.');
  }
};

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await api.post("/api/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.imageUrl; // 서버에서 반환한 imageUrl
  } catch (error) {
    console.error("❌ 이미지 업로드 중 오류 발생:", error.response ? error.response.data : error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }
};

export const getGroups = async (params) => {
  const response = await api.get(`${API_BASE_URL}/public`, { params });
  return response.data;
};

export const getPrivateGroups = async (params) => {
  const response = await api.get(`${API_BASE_URL}/private`, { params });
  return response.data;
};

export const verifyPassword = async (groupId, password) => {
  const response = await api.post(`${API_BASE_URL}/${groupId}/verify-password`, { password });
  return response.data;
};