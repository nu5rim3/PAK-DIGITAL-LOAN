import { get, blob } from "helpers/api_helper";

export const getProNoteReport = (appraisalId) => {
    return blob(`/mobixCamsReport/v1/reports/pro-note/${appraisalId}/report.pdf`);
};

export const getIqarNamaReport = (appraisalId) => {
    return blob(`/mobixCamsReport/v1/reports/iqar-nama/${appraisalId}/report.pdf`);
};

export const getLandVerificationReport = (appraisalId) => {
    return blob(`/mobixCamsReport/v1/reports/land-verification/${appraisalId}/report.pdf`);
};

export const getMisReport = (data) => {
    return blob(`/mobixCamsReport/v1/reports/mis-reports/report.xlsx?cro=${data.cro}&branch=${data.branch}&status=${data.status}&appraisalId=${data.appraisalId}&fromDate=${data.fromDate}&toDate=${data.toDate}`);
};

export const getMisReportSummary = (data) => {
    return  get(`/mobixCamsReport/v1/reports/mis-reports?cro=${data.cro}&branch=${data.branch}&status=${data.status}&appraisalId=${data.appraisalId}&fromDate=${data.fromDate}&toDate=${data.toDate}`);
};