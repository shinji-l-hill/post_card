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

export interface SendListFormInputs {
  name: string;
  user_id: string;
  postcard_title: string;
  postcard_sentence: string;
  postcard_end: string;
}

export interface SendListFormResponse {
  output:SendListFormInputs;
  success: boolean;
  message: string;
}

export interface ISendList {
  uuid: string;
  name: string;
  postcard_title: string;
  postcard_sentence: string;
  postcard_end: string;
}

export interface SendListResponse {
  output:ISendList[];
  success: boolean;
  message: string;
}