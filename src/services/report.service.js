import { get, blob } from "helpers/api_helper";

export const getProNoteReport = (appraisalId) => {
    return blob(`/mobixCamsLoan/v1/loans/resources/pro-note-report/${appraisalId}`);
};

export const getIqarNamaReport = (appraisalId) => {
    return blob(`/mobixCamsReport/v1/reports/iqar-nama/${appraisalId}/report.pdf`);
};

export const getLandVerificationReport = (appraisalId) => {
    return blob(`/mobixCamsReport/v1/reports/land-verification/${appraisalId}/report.pdf`);
};