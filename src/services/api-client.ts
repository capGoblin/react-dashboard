import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: "https://dummy.restapiexample.com/api/v1",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config: AxiosRequestConfig = {}) => {
    const res = await axiosInstance.get(this.endpoint, config);
    return res.data;
  };

  get = async (id: number | string, config: AxiosRequestConfig = {}) => {
    const res = await axiosInstance.get<T>(`${this.endpoint}/${id}`, config);
    return res.data;
  };

  create = async (data: T, config: AxiosRequestConfig = {}) => {
    const res = await axiosInstance.post<T>(
      `${this.endpoint}/create`,
      data,
      config
    );
    return res.data;
  };

  update = async (
    id: number | string,
    data: T,
    config: AxiosRequestConfig = {}
  ) => {
    const res = await axiosInstance.put<T>(
      `${this.endpoint}/update/${id}`,
      data,
      config
    );
    return res.data;
  };

  delete = async (id: number | string, config: AxiosRequestConfig = {}) => {
    const res = await axiosInstance.delete<T>(
      `${this.endpoint}/delete/${id}`,
      config
    );
    return res.data;
  };
}

export default APIClient;
