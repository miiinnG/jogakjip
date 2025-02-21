import axios from "axios";

const api = axios.create({
  baseURL: "https://codeit-zogakzip-backend.onrender.com", // 서버의 기본 URL 설정
});

export default api;

export const fetchMemory = async (postId) => {
  try {
    const response = await fetch(
      `https://codeit-zogakzip-backend.onrender.com/api/posts/${postId}`
    );
    if (!response.ok)
      throw new Error("메모리 데이터를 불러오는 데 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchComments = async (postId) => {
  try {
    const response = await fetch(
      `https://codeit-zogakzip-backend.onrender.com/api/posts/${postId}/comments`
    );
    if (!response.ok)
      throw new Error("댓글 데이터를 불러오는 데 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const likeMemory = async (postId) => {
  try {
    const response = await fetch(
      `https://codeit-zogakzip-backend.onrender.com/api/posts/${postId}/like`,
      {
        method: "POST",
      }
    );

    if (!response.ok) throw new Error("추억 공감에 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const postMemory = async (groupId = 13, memoryData) => {
  try {
    const response = await fetch(
      `https://codeit-zogakzip-backend.onrender.com/api/groups/${groupId}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memoryData),
      }
    );

    if (!response.ok) throw new Error("게시글 등록에 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateMemory = async (postId, memoryData) => {
  try {
    const response = await fetch(
      `https://codeit-zogakzip-backend.onrender.com/api/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memoryData),
      }
    );

    if (!response.ok) throw new Error("게시글 수정에 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteMemory = async (postId, memoryData) => {
  try {
    const response = await fetch(
      `https://codeit-zogakzip-backend.onrender.com/api/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memoryData),
      }
    );

    if (!response.ok) throw new Error("게시글 삭제에 실패했습니다.");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const postComment = async (postId, commentData) => {
  try {
    const response = await fetch(
      `https://codeit-zogakzip-backend.onrender.com/api/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }
    );

    if (!response.ok) throw new Error("댓글 등록에 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateComment = async (commentId, commentData) => {
  try {
    const response = await fetch(
      `https://codeit-zogakzip-backend.onrender.com/api/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }
    );

    if (!response.ok) throw new Error("댓글 수정에 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteComment = async (commentId, commentData) => {
  try {
    const response = await fetch(
      `https://codeit-zogakzip-backend.onrender.com/api/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }
    );

    if (!response.ok) throw new Error("댓글 삭제에 실패했습니다.");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const imageToUrl = async (image) => {
  try {
    const response = await fetch(
      `https://codeit-zogakzip-backend.onrender.com/api/image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(image),
      }
    );

    if (!response.ok) throw new Error("이미지 변환에 실패했습니다.");
    return await response.json().imageToUrl;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const privateMemoryAccess = async (postId, password) => {
  try {
    const response = await fetch(
      `https://codeit-zogakzip-backend.onrender.com/api/posts/${postId}/verify-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
      }
    );

    if (!response.ok) throw new Error("게시글 조회에 실패했습니다.");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// ✅ 그룹 관련 API 요청 통합
export const createGroup = async (groupData) => {
  try {
    console.log("🔹 [Request Body]:", JSON.stringify(groupData, null, 2));
    const response = await api.post("/groups", groupData);
    console.log("✅ [Response]:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ 그룹 생성 중 오류 발생:",
      error.response ? error.response.data : error
    );
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
    console.error(
      "❌ 이미지 업로드 중 오류 발생:",
      error.response ? error.response.data : error
    );
    throw new Error("이미지 업로드에 실패했습니다.");
  }
};

// ✅ 그룹 목록 조회 (공개/비공개 필터링 가능)
export const fetchGroups = async () => {
  try {
    const response = await api.get("/groups");
    return response.data;
  } catch (error) {
    console.error(
      "❌ 그룹 목록 조회 오류:",
      error.response ? error.response.data : error
    );
    return null;
  }
};

// ✅ 비밀번호 검증 (그룹 접근)
export const verifyPassword = async (id, password) => {
  console.log("🔹 [DEBUG] API 요청 시작 - verifyPassword");
  console.log("🔹 [DEBUG] 요청 URL:", `/groups/${id}/verify-password`);
  console.log("🔹 [DEBUG] 요청 바디:", { password });
  try {
    const response = await api.post(`/groups/${id}/verify-password`, {
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ 비밀번호 확인 오류:",
      error.response ? error.response.data : error
    );
    throw new Error("비밀번호가 틀렸습니다.");
  }
};

// ✅ 그룹 공개 여부 조회
export const checkGroupVisibility = async (groupId) => {
  try {
    const response = await api.get(`/groups/${groupId}/is-public`);
    return response.data.isPublic;
  } catch (error) {
    console.error(
      "❌ 공개 여부 조회 오류:",
      error.response ? error.response.data : error
    );
    return null;
  }
};
