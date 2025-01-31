export interface ILogin {
  name: string;
  password: string;
}

export interface IRegistration {
  name: string;
  email: string;
  password: string;
  role: string;
  bio: string;
  avatar_url: string;
}

export interface ISendEmail {
  email: string;
}

export interface IChangePassword {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}
