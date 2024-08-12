import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
});

// User
export const getAllUsers = () => api.get("/user/all");
export const removeUser = (userId) => api.delete(`/user/remove/${userId}`);
export const getAllStory = () => api.get("/story/all");
export const removeStory = (storyId) => api.delete(`/story/remove/${storyId}`);
export const login = (email, password) =>
  api.post("/user/login", { email, password });
export const register = (name, email, password) =>
  api.post("/user/register", { name, email, password });
export const getAllStories = (page = 1, limit = 5) =>
  api.get(`/story/all?page=${page}&limit=${limit}`);
export const addStory = (content) =>
  api.post(
    "/story/add",
    { content },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
export const addLike = (storyId) =>
  api.post(
    `/story/${storyId}/like`,
    { storyId },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
export const addComment = (storyId, content) =>
  api
    .post(
      `/story/${storyId}/comments`,
      { content },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((response) => response.data);

export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/user/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Admin
export const loginAdmin = (email, password) =>
  api.post("/admin/login", { email, password });
