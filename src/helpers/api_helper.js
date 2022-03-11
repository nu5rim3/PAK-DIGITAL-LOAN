import axios from "axios"
import { postJwtRefresh } from "./fakebackend_helper"
import Token from "./jwt-token-access/accessToken"

//apply base url for axios
export const API_URL = ""

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = Token.AccessToken
axiosApi.defaults.headers.common["X-Auth-Token"] = Token.AuthToken

axiosApi.interceptors.response.use(
  async(response) => {
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
  return await axiosApi.get(url, { ...config }).then(response => response.data).catch(err => console.log(err)) 
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config }).catch(err => console.log(err)) 
    .then(response => (response !== undefined ? response.data : undefined))
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response?.data).catch(err => console.log(err))
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