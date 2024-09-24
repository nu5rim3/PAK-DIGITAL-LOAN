import { get, post, put, postResponse, putResponse } from "helpers/api_helper"

export const createGoldSmith = async data => {
  return await postResponse(`/mobixCamsCommon/v1/goldsmith`, data)
}

export const getAllGoldsmiths = async (page, shop, owner, branch) => {
  return await get(
    `/mobixCamsCommon/v1/goldsmith/filters?shop=${shop ?? ""}&owner=${
      owner ?? ""
    }&fromDate&toDate&status&branch=${branch ?? ""}&page=${page ?? ""}&size=7`
  ).catch(err => console.log(err))
}

export const getGoldsmithById = async id => {
  return await get(`/mobixCamsCommon/v1/goldsmith/${id}`)
}

export const getGoldsmithByBranchCode = async branchIdFx => {
  return await get(`/mobixCamsCommon/v1/goldsmith/${branchIdFx}/branchCode`)
}

export const deactivateGoldsmith = async id => {
  return await putResponse(`/mobixCamsCommon/v1/goldsmith/${id}/deactivate`, {
    validateStatus: () => true,
  })
}

export const updateGoldsmith = async (id, data) => {
  return await putResponse(`/mobixCamsCommon/v1/goldsmith/${id}/update`, data, {
    validateStatus: () => true,
  })
}
