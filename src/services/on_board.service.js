import { get, blob } from "helpers/api_helper";

export const getOnBoardClienteles = async (appraisalId) => {
    return await get(`/mobixCamsLoan/v1/appraisals/${appraisalId}/clienteles`).catch(err => console.log(err));
};

export const getVerificationDetails = async (clienteleId) => {
    return await get(`/mobixCamsClientele/v1/clienteles/verifications/get-by-clientele/${clienteleId}`).catch(err => console.log(err));
};

export const getInternalCribDetails = async (clienteleId) => {
    return await get(`/mobixCamsCredit/v1/credits/crib/internal/clientele/${clienteleId}`).catch(err => console.log(err));
};

export const getBiometricDetails = async (clienteleId) => {
    return await get(`/mobixCamsClientele/v1/clienteles/verifications/biometric-result/${clienteleId}`).catch(err => console.log(err));
};

export const getEcibDetails = async (clienteleId) => {
    return await get(`/mobixCamsClientele/v1/clienteles/${clienteleId}/resources/details/master/ecib/sub/ecib`).catch(err => console.log(err));
};

export const viewPdf = async (path) => {
    return await blob(`/mobixCamsClientele/v1/clienteles/resources/view/${path}`).catch(err => console.log(err));
};