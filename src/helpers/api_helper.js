import axios from "axios"
import { postJwtRefresh } from "./fakebackend_helper"
import Token from "./jwt-token-access/accessToken"

//apply base url for axios
export const API_URL = "/pakoman-digital-loan"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = Token.AccessToken
axiosApi.defaults.headers.common["X-Auth-Token"] = Token.AuthToken

axiosApi.interceptors.response.use(
  async (response) => {
    await postJwtRefresh();
    return response;
  },
  error => {
    if (error.response.status === 401) {
      postJwtRefresh();
    }
    Promise.reject(error)
  }
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data).catch(err => { })
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config }).catch(err => { })
    .then(response => (response !== undefined ? response.data : undefined))
}

export async function postResponse(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config }).catch(err => err);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response?.data).catch(err => { })
}

export async function putResponse(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config }).catch(err => err);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}

export function blob(url) {
  return axiosApi
    .get(url, { responseType: 'arraybuffer' })
}

export function file(url) {
  return axiosApi
    .get(url, { responseType: 'blob' })
}

export function imgFile(url) {
  return axiosApi
    .get(url, { responseType: 'arraybuffer' })
}