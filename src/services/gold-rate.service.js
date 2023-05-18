import { get, post, put, postResponse, putResponse } from "helpers/api_helper";

export const saveGoldRates = async (data) => {
    return await postResponse(`/mobixCamsCommon/v1/market-value`, data);
};

export const getAllGoldRates = async () => {
    return await get(`/mobixCamsCommon/v1/market-value`).catch(err => console.log(err));
};

export const updateGoldRates = async (id, data) => {
    return await putResponse(`/mobixCamsCommon/v1/market-value/${id}/update`, data, { validateStatus: () => true });
};

export const deacivateGoldRates = async (id) => {
    return await putResponse(`/mobixCamsCommon/v1/market-value/${id}/deactivate`, { validateStatus: () => true });
};

export const getGoldRatesByDate = async (valueDate) => {
    return await get(`/mobixCamsCommon/v1/market-value/${valueDate}`).catch(err => console.log(err));
};