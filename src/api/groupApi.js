import api from "./api"; // api.js에서 생성한 axios 인스턴스 사용

const API_BASE_URL = "/api/groups"; // baseURL이 api.js에서 설정됨

export const createGroup = async (groupData) => {
  try {
      const response = await api.post(`${API_BASE_URL}`, groupData);
      return response.data;
  } catch (error) {
      console.error('그룹 생성 중 오류 발생:', error.response ? error.response.data : error);
      throw new Error('그룹 생성에 실패했습니다.');
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