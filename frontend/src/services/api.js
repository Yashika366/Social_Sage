import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// AUTH API CALLS
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

// YOUTUBE API CALLS
export const youtubeAPI = {
  getChannel: (channelId) => api.get(`/youtube/channel/${channelId}`),
  getVideos: (channelId, maxResults = 10) =>
    api.get(`/youtube/channel/${channelId}/videos?max_results=${maxResults}`),
};

// ANALYSIS API CALLS
export const analysisAPI = {
  analyzeChannel: (channelId) => api.get(`/analysis/channel/${channelId}`),
};

export default api;