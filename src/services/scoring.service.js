import { get, file } from "helpers/api_helper";

export const getSummaryDetails = async (appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credits/scores/appraisals/${appraisalId}`);
};

export const getCustomerDetails = async (productCode, appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credits/scores/customers/products/${productCode}/appraisals/${appraisalId}`);
};

export const getGuarantorDetails = async (productCode, appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credits/scores/guarantors/products/${productCode}/appraisals/${appraisalId}`);
};

export const getEcibReport = async (cNic) => {
    return await file(`/mobixCamsCredit/v1/credit/ecib/resources/${cNic}`);
};