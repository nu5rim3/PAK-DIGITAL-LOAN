import { get } from "helpers/api_helper";

//rewamp
export const getMasterData = async (appraisalId) => {
    return await get(`/mobixCamsClientele/v1/clienteles/stakeholder/${appraisalId}/appraisal`).catch(err => console.log(err));
};

export const masterInformation = async (stkId) => {
    return await get(`/mobixCamsClientele/v1/clienteles/stakeholder/${stkId}`).catch(err => console.log(err));
};

//rewamp
export const contactInformation = async (stkId) => {
    return await get(`/mobixCamsClientele/v1/clienteles/contacts/${stkId}`).catch(err => console.log(err));
};

//rewamp
export const residentialInformation = async (stkId) => {
    return await get(`/mobixCamsClientele/v1/clienteles/residence/${stkId}`).catch(err => console.log(err));
};

//rewamp
export const recipientInformation = async (stkId) => {
    return await get(`/mobixCamsClientele/v1/clienteles/recipient/${stkId}`).catch(err => console.log(err));
};

//rewamp
export const otherInformation = async (stkId) => {
    return await get(`/mobixCamsClientele/v1/clienteles/other/${stkId}`).catch(err => console.log(err));
};

//rewamp
export const pdChequeInformation = async (stkId) => {
    return await get(`/mobixCamsClientele/v1/clienteles/pdc/${stkId}`).catch(err => console.log(err));
};

export const getSignature = async (appraisalId, type) => {
    return await get(`/mobixCamsLoan/v1/loans/image/details/${appraisalId}/master/${type}/sub/SIGN`).catch(err => console.log(err));
};

export const getThumb = async (appraisalId, type) => {
    return await get(`/mobixCamsLoan/v1/loans/image/details/${appraisalId}/master/${type}/sub/1`).catch(err => console.log(err));
};

export const getOriginationClientele = async (appraisalId, stkId) => {
    return await get(`/mobixCamsClientele/v1/stakeholder-details/${appraisalId}/stakeholderId/${stkId}`).catch(err => console.log(err));
};
