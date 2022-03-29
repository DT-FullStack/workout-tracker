import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios"

const storage = window.localStorage;

interface AppResponse extends AxiosResponse {
  success?: boolean;
  error?: boolean;
  accessToken?: string
}
interface AuthResponse extends AppResponse {
  email?: string
}

export interface SignInRequest {
  email: string
  password: string
}
export interface RegisterRequest extends SignInRequest {
  password_confirmation: string
}

export class UserHttp {
  constructor() {
    this.api.interceptors.response.use(this.checkResponseForToken)
    this.checkStorageForToken();
  }
  private api = axios.create({
    baseURL: '/auth',
    withCredentials: true,
  })

  //
  // Browser Actions
  private storedToken = (): string | null => {
    return storage.getItem('accessToken');
  }
  private checkResponseForToken = (response: AppResponse) => {
    let { accessToken } = response.data;
    if (accessToken) storage.setItem('accessToken', accessToken);
    this.setTokenHeader(accessToken);
    return response;
  }
  private checkStorageForToken = () => {
    const accessToken = this.storedToken();
    if (accessToken) this.setTokenHeader(accessToken);
  }
  private setTokenHeader(token: string) {
    this.api.defaults.headers.common['X-ACCESS-TOKEN'] = token;
  }


  //
  // Requests
  register = async (user: RegisterRequest) => this.api.post<AuthResponse>("/register", user);
  signIn = async (user: SignInRequest) => this.api.post<AuthResponse>("/signin", user);
  signOut = async () => this.api.get<AuthResponse>("/signout");
  getToken = async () => this.api.get<AuthResponse>('/getToken');
}