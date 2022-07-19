import { post } from "helpers/api_helper";

export const uploadGeoImage = async(payload) => {
    return await post(`/mobixCamsLoan/v1/loans/image/upload`, payload);
};