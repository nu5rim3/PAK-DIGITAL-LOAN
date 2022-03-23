import { get, post } from "helpers/api_helper";

export const getTcDetails = async (appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credit/tc/${appraisalId}`);
};

export const getTcSyncId = async (appraisalId) => {
    return await get(`/mobixCamsClientele/v1/clienteles/sync-tc-log/${appraisalId}`);
};

export const getAmountsOfTcDetails = async(tcId) => {
    var payload = {
        "tcNo": tcId,
        "mode": "T"
    }
    return await post(`/mobixCamsCredit/v1/credit/tc/getTCDetails`, payload);  
};