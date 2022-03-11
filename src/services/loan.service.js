import { get } from "helpers/api_helper";

export const getSalaryLoanDetails = async (appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credit/loan/app/sal/${appraisalId}`).catch(err => console.log(err));
};

export const getLoanBusinessDetails = async (appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credit/loan/app/bns/${appraisalId}`).catch(err => console.log(err));
};

export const getLiveStockDetails = async (appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credit/loan/app/stk/${appraisalId}`).catch(err => console.log(err));
};

export const getCultivationLoanDetails = async (appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credit/loan/app/cult/${appraisalId}`).catch(err => console.log(err));
};

export const getBaraKarobarLoanEmployeeDetails = async (appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credit/loan/app/emp/${appraisalId}`).catch(err => console.log(err));
};

export const getBaraKarobarLoanSupplierDetails = async (appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credit/loan/app/sup/${appraisalId}`).catch(err => console.log(err));
};

export const getBaraKarobarLoanPermanetDetails = async (appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credit/loan/app/perm/${appraisalId}`).catch(err => console.log(err));
};

export const getBaraKarobarLoanSwotDetails = async (appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credit/loan/app/swot/${appraisalId}`).catch(err => console.log(err));
};

export const getOtherIncomeDetails = async (appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credit/loan/app/oth/${appraisalId}`).catch(err => console.log(err));
};

export const getSignature = async (appraisalId, type) => {
    return await get(`/mobixCamsLoan/v1/loans/image/details/${appraisalId}/master/${type}/sub/SIGN`).catch(err => console.log(err));
};

export const getContractDetails = async (appraisalId) => {
    return await get(`/mobixCamsLoan/v1/appraisals/sync-log/${appraisalId}/block/INIT_FACILITY_SYNC_BLOCK`).catch(err => console.log(err));
};