import { AxiosResponse } from "axios"
import { AppAxios } from './util/AppAxios';

const storage = window.localStorage;

export interface AppAxiosResponse<T = any> extends AxiosResponse<T> {
  success?: boolean;
  error?: boolean;
  accessToken?: string
}
interface AuthResponse {
  success?: boolean;
  error?: boolean;
  accessToken?: string
  email?: string,
  id?: string
}

export interface SignInRequest {
  email: string
  password: string
}
export interface RegisterRequest extends SignInRequest {
  password_confirmation: string
}

export class UserHttp extends AppAxios {
  constructor() {
    super({
      baseURL: '/auth',
      withCredentials: true,
    })
    this.api.interceptors.response.use(this.checkResponseForToken)
    this.checkStorageForToken();
  }

  //
  // Browser Actions
  private getCookie = (): any => {
    let token = document.cookie.replace(/(?:(?:^|.*;\s*)X-ACCESS-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(token);
  }
  private storedToken = (): string | null => {
    return storage.getItem('accessToken');
  }
  private checkResponseForToken = (response: AppAxiosResponse) => {
    let { accessToken } = response;
    if (accessToken) {
      storage.setItem('accessToken', accessToken);
      this.setTokenHeader(accessToken);
    }
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