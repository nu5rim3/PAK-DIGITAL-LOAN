import { get, post, put } from "helpers/api_helper";

export const getAllUsers = async(page, size) => {
    return await get(`/mobixCamsCommon/v1/users?page=${page}&size=${size}`);
};

export const getUserById = async(idx) => {
    return await get(`/mobixCamsCommon/v1/users/${idx}`);
};

export const createUser = async(data) => {
    return await post(`/mobixCamsCommon/v1/users`, data);
};

export const updateUser = async(idx, data) => {
    return await put(`/mobixCamsCommon/v1/users/${idx}`, data);
};

export const deleteUser = async(idx) => {
    return await put(`/mobixCamsCommon/v1/users/${idx}/inactive`);
};