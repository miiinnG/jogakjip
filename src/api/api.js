import axios from "axios";

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

export const postMemory = async (groupId, memoryData) => {
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

export const imageToUrl = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await fetch(`https://codeit-zogakzip-backend.onrender.com/api/image`, {
        method: "POST",
        body: formData, // FormData 사용
      });
  
      if (!response.ok) throw new Error("이미지 변환에 실패했습니다.");
      const data = await response.json();
      return data.imageUrl; // 서버 응답 구조에 따라 조정 필요
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

    const response = await fetch(
      `https://codeit-zogakzip-backend.onrender.com/api/groups`, // ✅ API 엔드포인트 확인 필요
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData),
      }
    );

    if (!response.ok) {
      throw new Error(`그룹 생성 실패: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ [Response]:", data);
    return data;
  } catch (error) {
    console.error(
      "❌ 그룹 생성 중 오류 발생:",
      error.response ? error.response.data : error
    );
    throw new Error("그룹 생성에 실패했습니다.");
  }
};

export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('image', file); // ✅ 올바른 키 값으로 이미지 추가

        const response = await fetch(`https://codeit-zogakzip-backend.onrender.com/api/image`, {
            method: "POST",
            body: formData, // ✅ Content-Type은 자동으로 설정됨
        });

        if (!response.ok) throw new Error("이미지 변환에 실패했습니다.");
        
        const data = await response.json();
        return data.imageUrl; // ✅ 올바른 응답 데이터 반환
    } catch (error) {
        console.error("❌ 이미지 업로드 실패:", error);
        return false;
    }
};

// ✅ 그룹 목록 조회 (공개/비공개 필터링 가능)
export const fetchGroups = async () => {
  try {
      const response = await fetch("https://codeit-zogakzip-backend.onrender.com/api/groups"); // ✅ 올바른 API 경로 사용
      if (!response.ok) throw new Error("그룹 목록 조회 실패");
      return await response.json();
  } catch (error) {
      console.error("❌ 그룹 목록 조회 오류:", error);
      return null;
  }
};


// ✅ 비밀번호 검증 (그룹 접근)
export const verifyPassword = async (id, password) => {
  console.log("🔹 [DEBUG] API 요청 시작 - verifyPassword");
  console.log("🔹 [DEBUG] 요청 URL:", `/groups/${id}/verify-password`);
  console.log("🔹 [DEBUG] 요청 바디:", password);
  try {
    const response = await fetch(`https://codeit-zogakzip-backend.onrender.com/api/groups/${id}/verify-password`,       {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
      });
    return await response.json();
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
    const response = await fetch(`https://codeit-zogakzip-backend.onrender.com/api/groups/${groupId}/is-public`);
    if (!response.ok) throw new Error("공개 여부 조회 실패");

    const data = await response.json();
    return data.isPublic; // isPublic 값 반환
  } catch (error) {
    console.error("❌ 공개 여부 조회 오류:", error.response ? error.response.data : error);
    return false; // 🚀 API 호출 실패 시 기본값 `false`
  }
};

export const privateGroupAccess = async (groupId, password) => {
  try {
      const response = await fetch(`https://codeit-zogakzip-backend.onrender.com/api/groups/${groupId}/verify-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
      });
  
      if (!response.ok) throw new Error("그룹 조회에 실패했습니다.");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
};
