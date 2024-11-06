import { get } from "helpers/api_helper"

export const getRoles = () => {
  return get(`/mobixCamsCommon/v1/roles`)
}

export const getfilterRoles = (status, code, description, page, size) => {
  return get(
    `/mobixCamsCommon/v1/roles/filters?status=${status ?? ""}&code=${
      code ?? ""
    }&description=${description ?? ""}&page=${page ?? 0}&size=${size ?? 7}`
  )
}
