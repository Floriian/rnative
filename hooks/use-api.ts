import axios, { type CreateAxiosDefaults } from "axios";

export function useApi(config?: CreateAxiosDefaults) {
  const {
    get,
    delete: axiosDelete,
    post,
    put,
    patch
  } = axios.create({
    baseURL: "http://localhost:3000",
    ...config,
  });

  return {
    get,
    delete: axiosDelete,
    post,
    put,
    patch,
  };
}
