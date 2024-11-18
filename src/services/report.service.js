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

export const getMisReport = data => {
  return file(
    `/mobixCamsReport/v1/reports/mis-reports/report.xlsx?cro=${data.cro}&branch=${data.branch}&status=${data.status}&appraisalId=${data.appraisalId}&fromDate=${data.fromDate}&toDate=${data.toDate}`
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
  croCode
) => {
  return get(
    `mobixCamsLoan/v1/mis-report/filters?status=${status ?? ""}&appraisalId=${
      appraisalId ?? ""
    }&fromDate=${fromDate ?? ""}&toDate=${toDate ?? ""}&croCode=${
      croCode ?? ""
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
