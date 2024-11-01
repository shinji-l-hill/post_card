export interface LoginResponse {
  output: {
    access_token: string;
    expires_in: number;
    token_type: string;
  };
  success: boolean;
  message: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}