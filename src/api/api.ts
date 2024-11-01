import { LoginCredentials, LoginResponse, SendListFormInputs, SendListFormResponse, SendListResponse } from "../common/interfaces";
import { axiosInstance } from "../plugins/axios";

export async function loginApi(credentials: LoginCredentials): Promise<LoginResponse> {
  const response =  await axiosInstance.post(`/admin/login`, credentials);
  const { access_token } = response.data;

  // トークンをローカルストレージに保存
  localStorage.setItem('jwtToken', access_token);
  localStorage.setItem('userId', response.data.output.user.id);
  return response.data;
}

export async function registerSendList(data: SendListFormInputs): Promise<SendListFormResponse> {
  const response =  await axiosInstance.post(`/sendlist/register`, data);
  return response.data;
}

export async function fetchSendList(): Promise<SendListResponse> {
  const response =  await axiosInstance.get(`/sendlist`);
  return response.data;
}