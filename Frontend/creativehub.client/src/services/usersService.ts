import axios from "axios";
import { GetAuthHeaders } from "./helpers/getAuthHeaders";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const headers = GetAuthHeaders();

export const GetUserById = async (userId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/users/${userId}`,
      {
        headers,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to get user!");
  }
};
