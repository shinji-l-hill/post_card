import { LoginCredentials, LoginResponse } from "../common/interfaces";
import { axiosInstance } from "../plugins/axios";


export async function loginApi(credentials: LoginCredentials): Promise<LoginResponse> {
  const response =  await axiosInstance.post(`/admin/login`, credentials);


  const { access_token } = response.data;

  // トークンをローカルストレージに保存
  localStorage.setItem('jwtToken', access_token);
  return response.data;
}