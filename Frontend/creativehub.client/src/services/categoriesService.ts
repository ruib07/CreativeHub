import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

export const GetCategories = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/categories`
    );

    return response;
  } catch (error) {
    throw new Error("Failed to get categories!");
  }
};
