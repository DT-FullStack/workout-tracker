import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class AppAxios {
  protected api: AxiosInstance;
  storage = window.localStorage

  constructor(config: AxiosRequestConfig) {
    this.api = axios.create(config);
    this.api.interceptors.request.use(this.addTokenToHeader);
  }

  protected getData = ({ data }: AxiosResponse) => data;

  private getStoredToken = (): string | null => this.storage.getItem('accessToken');
  private getTokenAsHeader = (): {} => {
    const token = this.getStoredToken();
    return token ? { "X-ACCESS-TOKEN": token } : {};
  }
  private addTokenToHeader = (config: AxiosRequestConfig) => {
    const headers = config.headers || {};
    config.headers = { ...headers, ...this.getTokenAsHeader() };
    return config;
  }

}