import { get, post, put, postResponse, putResponse } from "helpers/api_helper";

export const getAllUsers = async(page, size) => {
    return await get(`/mobixCamsCommon/v1/users?page=${page}&size=${size}`);
};

export const getUserById = async(idx) => {
    return await get(`/mobixCamsCommon/v1/users/${idx}`);
};

export const createUser = async(data) => {
    return await postResponse(`/mobixCamsCommon/v1/users`, data, { validateStatus: () => true });
};

export const updateUser = async(idx, data) => {
    return await putResponse(`/mobixCamsCommon/v1/users/${idx}`, data, { validateStatus: () => true });
};

export const deleteUser = async(idx) => {
    return await put(`/mobixCamsCommon/v1/users/${idx}/inactive`);
};