import { ISendEmail, IChangePassword } from "../types/authentication";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const RecoverPasswordSendEmail = async (sendEmail: ISendEmail) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/passwordrecovery/reset-password`,
      sendEmail
    );

    return response;
  } catch (error) {
    throw new Error("Failed to send email!");
  }
};

export const RecoverPasswordChange = async (
  changePassword: IChangePassword
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/passwordrecovery/change-password`,
      changePassword
    );

    return response;
  } catch (error) {
    throw new Error("Failed to change password!");
  }
};
