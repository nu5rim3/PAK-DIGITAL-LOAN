import { get } from "helpers/api_helper";

/* TODO: Proxy */
export const getAllCompletedAppraisals = (data) => {
    var role = localStorage.getItem("role");
    var branch = localStorage.getItem("branch");
    return get(`/mobixCamsLoan/v1/appraisals/completed?role=${role}&branch=${branch}&status=${data.status}&appraisalId=${data.appraisalId}&fromDate=${data.fromDate}&toDate=${data.toDate}`);
};


export const getAllOriginationCommon = async (productCode) => {
    return await get(`/mobixCamsCommon/v1/common-details/product/${productCode}`);
};

export const getAllOriginationCredit = async (appraisalId, productCode) => {
    return await get(`/mobixCamsCredit/v1/loan-application-details/${appraisalId}/products/${productCode}`);
};

export const getAllOriginationClientele = async (appraisalId, stkId) => {
    return await get(`/mobixCamsClientele/v1/stakeholder-details/${appraisalId}/stakeholderId/${stkId}`);
};

export const getAllOriginationApproval = async (appraisalId) => {
    return await get(`/mobixCamsApproval/v1/approval-details/${appraisalId}`);
};
