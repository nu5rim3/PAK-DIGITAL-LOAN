import { get, blob } from "helpers/api_helper";

export const getAllImages = async(appraisalId) => {
    return await get(`/mobixCamsLoan/v1/loans/image/details/${appraisalId}`);
};

export const viewImage = (path) => {
    return blob(`/mobixCamsLoan/v1/loans/images/view/${path}`).catch(err => console.log(err));
};

export const exportAsPdf = async(appraisalId) => {
    return await get(`/mobixCamsLoan/v1/loans/image/details/${appraisalId}`);
};