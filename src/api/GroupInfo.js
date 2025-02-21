import api from "./api";

// 모든 그룹 정보 가져오기
export const fetchGroups = async () => {
  try {
    const response = await api.get("/api/groups");
    return response.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
};

// 특정 그룹 정보 가져오기
export const fetchGroupById = async (id) => {
  try {
    const response = await api.get(`/api/groups/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching group ${id}:`, error);
    return null;
  }
};

// 특정 그룹의 추억 목록 가져오기
export const fetchPosts = async (groupId) => {
  try {
    const response = await api.get(`/api/groups/${groupId}/posts`);
    return response.data.data || []; // response.data.data를 반환
  } catch (error) {
    console.error(`Error fetching posts for group ${groupId}:`, error);
    return [];
  }
};
