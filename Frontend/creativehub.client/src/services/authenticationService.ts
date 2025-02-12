import { IRegistration, ILogin } from "../types/authentication";
import apiAuthRequest from "./helpers/apiAuthService";

export const Registration = async (newUser: IRegistration) =>
  await apiAuthRequest("POST", "auth/signup", newUser);

export const Login = async (login: ILogin) =>
  await apiAuthRequest("POST", "auth/signin", login);
