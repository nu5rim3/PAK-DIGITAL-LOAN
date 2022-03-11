import { get } from "helpers/api_helper";

export const getIncomeExpenses = async (appraisalId) => {
    return await get(`/mobixCamsCredit/v1/credit/income-expense/${appraisalId}`).catch(err => console.log(err));
};