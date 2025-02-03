import { ISendEmail, IChangePassword } from "../types/authentication";
import apiAuthRequest from "./helpers/apiAuthService";

export const RecoverPasswordSendEmail = async (sendEmail: ISendEmail) =>
  await apiAuthRequest("POST", "passwordrecovery/reset-password", sendEmail);

export const RecoverPasswordChange = async (changePassword: IChangePassword) =>
  await apiAuthRequest(
    "PUT",
    "passwordrecovery/change-password",
    changePassword
  );
