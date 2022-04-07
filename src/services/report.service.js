import { get, blob } from "helpers/api_helper";

export const getProNoteReport = (appraisalId) => {
    return blob(`/mobixCamsLoan/v1/loans/resources/pro-note-report/${appraisalId}`);
};