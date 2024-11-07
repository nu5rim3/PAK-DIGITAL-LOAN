import { get, post, put } from "helpers/api_helper"

/* *********** GROUP *********** */

/* TODO: Proxy */
export const getAllApprovalGroups = async () => {
  return await get("/mobixCamsApproval/v1/approvals/groups")
}

/* *********** USER *********** */

/* TODO: Proxy */
export const getAllApprovalUsers = async () => {
  return await get("/mobixCamsApproval/v1/approvals/users")
}

export const getAllFilterApprovalUsers = async (
  userId,
  status,
  fromDate,
  toDate,
  page,
  size,
  groupCode,
  groupName
) => {
  return await get(
    `/mobixCamsApproval/v1/approval/user/group/filters?userId=${
      userId ?? ""
    }&fromDate=${fromDate ?? ""}&toDate=${toDate ?? ""}&status=${
      status ?? ""
    }&page=${page ?? 0}&size=${size ?? 7}&groupCode=${
      groupCode ?? ""
    }&groupName=${groupName ?? ""}`
  )
}

export const createApprovalUser = async data => {
  return await post("/mobixCamsApproval/v1/approvals/users", data)
}

export const updateApprovalUser = async (idx, data) => {
  return await put(`/mobixCamsApproval/v1/approvals/users/${idx}`, data)
}

/* *********** WORKFLOW *********** */
export const getAllApprovalWorkflows = async () => {
  return await get("/mobixCamsApproval/v1/approvals/workflows")
}

/* *********** APPROVAL *********** */
export const getAllOnBoardingApprovals = async appraisalId => {
  return await get(`/mobixCamsApproval/v1/approvals/on-boarding/${appraisalId}`)
}

export const getAllExceptionalApprovals = async appraisalId => {
  return await get(`/mobixCamsApproval/v1/approvals/appraisal/${appraisalId}`)
}

export const createApprovalComment = async data => {
  return await post("/mobixCamsApproval/v1/approvals/comments", data)
}

export const getAllApprovalSteps = async appraisalId => {
  return await get(`/mobixCamsApproval/v1/approvals/steps/${appraisalId}`)
}

export const createApprovalStep = async data => {
  return await post("/mobixCamsApproval/v1/approvals/steps", data)
}

/* *********** VERIFICATIONS *********** */
export const verifyApprovalUser = async username => {
  return await get(`/mobixCamsApproval/v1/approvals/users/${username}`)
}

export const getActiveStep = async appraisalId => {
  return await get(
    `/mobixCamsApproval/v1/approvals/active/steps/${appraisalId}`
  )
}

export const getObApprovalByParams = async (appraisalId, clienteleId, type) => {
  return await get(
    `/mobixCamsApproval/v1/approvals/on-boarding/appraisals/${appraisalId}/clienteles/${clienteleId}/type/${type}`
  )
}
