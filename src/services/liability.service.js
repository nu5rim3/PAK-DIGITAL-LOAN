import { get } from "helpers/api_helper";

export const getLiabilityDetails = (appraisalId) => {
    return get(`/mobixCamsLoan/v1/liabilities/appraisals/${appraisalId}`);
};