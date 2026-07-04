import { useState } from "react";
import { analysisAPI } from "../services/api";

// Custom hook - a reusable function that contains state + logic
// Any component that needs channel analysis just calls this hook
// instead of duplicating the fetch logic everywhere
const useChannelAnalysis = () => {
  // The analysis data returned from the backend
  const [analysis, setAnalysis] = useState(null);

  // The channel data (title, subscribers etc)
  const [channel, setChannel] = useState(null);

  // Loading state - true while waiting for the API response
  const [loading, setLoading] = useState(false);

  // Error state - stores error message if something goes wrong
  const [error, setError] = useState(null);

  // The function that actually triggers the analysis
  const analyzeChannel = async (channelId) => {
    // Reset states before each new request
    setLoading(true);
    setError(null);
    setAnalysis(null);
    setChannel(null);

    try {
      // Call our backend analysis endpoint
      const response = await analysisAPI.analyzeChannel(channelId);

      // response.data = the JSON body returned by FastAPI
      // response.data.channel = the YouTube channel stats
      // response.data.analysis = the AI recommendations
      setChannel(response.data.channel);
      setAnalysis(response.data.analysis);
    } catch (err) {
      // err.response.data.detail = the error message from FastAPI's HTTPException
      setError(
        err.response?.data?.detail || "Something went wrong. Please try again."
      );
    } finally {
      // finally runs whether the request succeeded or failed
      // always turn off loading when done
      setLoading(false);
    }
  };

  // Return everything the component needs
  return { channel, analysis, loading, error, analyzeChannel };
};

export default useChannelAnalysis;