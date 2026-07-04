import axios from "axios";

// Create one axios instance with base config
// Every API call in the whole frontend goes through this one object
// So if the backend URL ever changes, we only update it in one place
const api = axios.create({
  baseURL: "http://localhost:8000", // our FastAPI backend
  timeout: 30000, // 30 seconds - AI analysis can take a while
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
// Runs before EVERY request is sent
// Perfect place to attach auth tokens later (when we add login)
api.interceptors.request.use(
  (config) => {
    // Later this will be:
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
// Runs after EVERY response comes back
// Perfect place to handle global errors (401 = redirect to login, 500 = show toast)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // error.response = server returned an error (4xx, 5xx)
    // error.request = request was made but no response (network down)
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// YOUTUBE API CALLS
export const youtubeAPI = {
  // Fetch channel stats by channel ID
  getChannel: (channelId) => api.get(`/youtube/channel/${channelId}`),

  // Fetch recent videos for a channel
  getVideos: (channelId, maxResults = 10) =>
    api.get(`/youtube/channel/${channelId}/videos?max_results=${maxResults}`),
};

// ANALYSIS API CALLS
export const analysisAPI = {
  // Get full AI analysis for a channel
  analyzeChannel: (channelId) => api.get(`/analysis/channel/${channelId}`),
};

export default api;