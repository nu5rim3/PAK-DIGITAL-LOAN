import { get, post, put, postResponse, putResponse } from "helpers/api_helper";

export const getAllEmployees = async (page, size) => {
    return await get(`/mobixCamsCommon/v1/employees/filters?page=${page}&size=${size}`);
};

export const getEmployeeById = async (idx) => {
    return await get(`/mobixCamsCommon/v1/employees/${idx}`);
};

export const createEmployee = async (data) => {
    return await postResponse(`/mobixCamsCommon/v1/employees`, data, { validateStatus: () => true });
};

export const updateEmployee = async (idx, data) => {
    return await putResponse(`/mobixCamsCommon/v1/employees/${idx}`, data, { validateStatus: () => true });
};

export const deleteEmployee = async (idx) => {
    return await putResponse(`/mobixCamsCommon/v1/employees/${idx}/inactive`, { validateStatus: () => true });
};