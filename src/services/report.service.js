import { get, blob, file } from "helpers/api_helper"

export const getProNoteReport = appraisalId => {
  return blob(`/mobixCamsReport/v1/reports/pro-note/${appraisalId}/report.pdf`)
}

export const getIqarNamaReport = appraisalId => {
  return blob(`/mobixCamsReport/v1/reports/iqar-nama/${appraisalId}/report.pdf`)
}

export const getLandVerificationReport = appraisalId => {
  return blob(
    `/mobixCamsReport/v1/reports/land-verification/${appraisalId}/report.pdf`
  )
}

export const getMisReport = (
  croName,
  branchName,
  status,
  appraisalId,
  fromDate,
  toDate
) => {
  return file(
    `/mobixCamsReport/v1/reports/mis-reports/report.xlsx?cro=${
      croName ?? ""
    }&branch=${branchName ?? ""}&status=${status ?? ""}&appraisalId=${
      appraisalId ?? ""
    }&fromDate=${fromDate ?? ""}&toDate=${toDate ?? ""}`
  )
}

export const getMisReportSummary = data => {
  return get(
    `/mobixCamsReport/v1/reports/mis-reports?cro=${data.cro}&branch=${data.branch}&status=${data.status}&appraisalId=${data.appraisalId}&fromDate=${data.fromDate}&toDate=${data.toDate}`
  )
}

export const getFilteredMisReport = (
  page,
  size,
  appraisalId,
  status,
  fromDate,
  toDate,
  branch,
  croName
) => {
  return get(
    `mobixCamsLoan/v1/mis-report/filters?status=${status ?? ""}&appraisalId=${
      appraisalId ?? ""
    }&fromDate=${fromDate ?? ""}&toDate=${toDate ?? ""}&croName=${
      croName ?? ""
    }&branch=${branch ?? ""}&page=${page ?? 0}&size=${size ?? 7}`
  )
}

export const getFacilityReport = data => {
  return file(
    `/mobixCamsReport/v1/reports/gold-loan-facility-reports/report.xlsx?status=${data.status}&fromDate=${data.fromDate}&toDate=${data.toDate}`
  )
}

export const getBusinessIntroducerReport = data => {
  return file(
    `/mobixCamsReport/v1/reports/business-introducer/report.xlsx?status=${data.status}&fromDate=${data.fromDate}&toDate=${data.toDate}`
  )
}

export const getTermDepositReport = data => {
  return file(
    `/mobixCamsReport/v1/reports/term-deposit/report.xlsx?status=${data.status}&fromDate=${data.fromDate}&toDate=${data.toDate}`
  )
}
