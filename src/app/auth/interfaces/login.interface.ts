export interface UserResponse {
  id: string;
  email: string;
  password: string;
  token: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
