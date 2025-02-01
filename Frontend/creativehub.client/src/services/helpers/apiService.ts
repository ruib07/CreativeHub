import axios from "axios";
import { GetAuthHeaders } from "./getAuthHeaders";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

const apiRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  data?: any
) => {
  try {
    const headers = GetAuthHeaders();
    const url = `${API_BASE_URL}/${API_VERSION}/${endpoint}`;

    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response;
  } catch (error) {
    throw new Error(`Failed to ${method} ${endpoint}`);
  }
};

export default apiRequest;
