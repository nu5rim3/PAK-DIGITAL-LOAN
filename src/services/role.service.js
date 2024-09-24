import { get } from "helpers/api_helper";

export const getRoles = () => {
    return get(`/mobixCamsCommon/v1/roles`);
};