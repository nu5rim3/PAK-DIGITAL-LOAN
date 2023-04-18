import { get } from "helpers/api_helper";

export const getAllIdentifications = async () => {
    return await get(`/mobixCamsCommon/v1/identifications`).catch(err => console.log(err));
};

export const getAllTitiles = async () => {
    return await get(`/mobixCamsCommon/v1/titles`).catch(err => console.log(err));
};

export const getAllCustomerTypes = async () => {
    return await get(`/mobixCamsCommon/v1/customers/types`).catch(err => console.log(err));
};

export const getAllGenders = async () => {
    return await get(`/mobixCamsCommon/v1/genders`).catch(err => console.log(err));
};

export const getAllProvinces = async () => {
    return await get(`/mobixCamsCommon/v1/provinces`).catch(err => console.log(err));
};

export const getAllCommiunities = async () => {
    return await get(`/mobixCamsCommon/v1/communities`).catch(err => console.log(err));
};

export const getAllNatureOfEmp = async () => {
    return await get(`/mobixCamsCommon/v1/employment-categories`).catch(err => console.log(err));
};

export const getAllDesignationTypes = async () => {
    return await get(`/mobixCamsCommon/v1/employee-designations`).catch(err => console.log(err));
};

export const getAllNationalaties = async () => {
    return await get(`/mobixCamsCommon/v1/nationalities`).catch(err => console.log(err));
};

export const getAllCnicStatus = async () => {
    return await get(`/mobixCamsCommon/v1/cnic-status`).catch(err => console.log(err));
};

export const getAllLanguageList = async () => {
    return await get(`/mobixCamsCommon/v1/languages`).catch(err => console.log(err));
};

export const getAllMaritialStatus = async () => {
    return await get(`/mobixCamsCommon/v1/marital-list`).catch(err => console.log(err));
};

export const getAllInformationSources = async () => {
    return await get(`/mobixCamsCommon/v1/information-sources`).catch(err => console.log(err));
};

export const getAllEducationalLevels = async () => {
    return await get(`/mobixCamsCommon/v1/education-levels`).catch(err => console.log(err));
};

export const getAllBanks = async () => {
    return await get(`/mobixCamsCommon/v1/banks`).catch(err => console.log(err));
};

export const getAllPdBanks = async () => {
    return await get(`/mobixCamsCommon/v1/pd-banks`).catch(err => console.log(err));
};

export const getAllSecurityCategories = async () => {
    return await get(`/mobixCamsCommon/v1/security/categories`).catch(err => console.log(err));
};

export const getAllSecurityTypes = async () => {
    return await get(`/mobixCamsCommon/v1/security/types`).catch(err => console.log(err));
};

export const getAllSecurityOwnerships = async () => {
    return await get(`/mobixCamsCommon/v1/ownerships`).catch(err => console.log(err));
};

export const getAllSuppliers = async () => {
    return await get(`/mobixCamsCommon/v1/suppliers`).catch(err => console.log(err));
};

export const getAllResidantals = async () => {
    return await get(`/mobixCamsCommon/v1/residential-types`).catch(err => console.log(err));
};

export const getAllGuarantorRelations = async () => {
    return await get(`/mobixCamsCommon/v1/fml-details`).catch(err => console.log(err));
};

export const getAllOrganizations = async () => {
    return await get(`/mobixCamsCommon/v1/organizations`).catch(err => console.log(err));
};

export const getAllSectors = async () => {
    return await get(`/mobixCamsCommon/v1/sectors`).catch(err => console.log(err));
};

export const getAllSubSectors = async () => {
    return await get(`/mobixCamsCommon/v1/sub-sectors`).catch(err => console.log(err));
};

export const getAllEmpTypes = async () => {
    return await get(`/mobixCamsCommon/v1/employee-types`).catch(err => console.log(err));
};

export const getAllBusinessPartners = async () => {
    return await get(`/mobixCamsCommon/v1/business-partners`).catch(err => console.log(err));
};

export const getAllOccupations = async () => {
    return await get(`/mobixCamsCommon/v1/occupations`).catch(err => console.log(err));
};

export const getAllSubSecurities = async () => {
    return await get(`/mobixCamsCommon/v1/sub-security/types-1`).catch(err => console.log(err));
};

export const getAllDelers = async () => {
    return await get(`/mobixCamsCommon/v1/dealers`).catch(err => console.log(err));
};

export const getAllBankBranches = async () => {
    return await get(`/mobixCamsCommon/v1/banks/branches`).catch(err => console.log(err));
};

export const getAllRoles = async () => {
    return await get(`/mobixCamsCommon/v1/roles`).catch(err => console.log(err));
};
/* Deprecated */
/* export const getAllBranches = async () => {
    return await get(`/mobixCamsCommon/v1/branches`).catch(err => console.log(err));
}; */

export const getAllNadraAreas = async () => {
    return await get(`/mobixCamsCommon/v1/cities/areas`).catch(err => console.log(err));
};

/* TODO: Credit Scoring Commons Here */

export const getAllMonthlyNetSavings = async (product) => {
    return await get(`/mobixCamsCommon/v1/net-saving/products/${product}`).catch(err => console.log(err));
};

export const getAllOtherIncomeSources = async (product) => {
    return await get(`/mobixCamsCommon/v1/other-source-income/products/${product}`).catch(err => console.log(err));
};

export const getAllHouseHoldContribution = async (product) => {
    return await get(`/mobixCamsCommon/v1/house-hold/products/${product}`).catch(err => console.log(err));
};

export const getAllBusinessExperiance = async (product) => {
    return await get(`/mobixCamsCommon/v1/business-experiences/products/${product}`).catch(err => console.log(err));
};

export const getAllBusinessOwnerships = async (product) => {
    return await get(`/mobixCamsCommon/v1/business-ownerships/products/${product}`).catch(err => console.log(err));
};

export const getAllDebitBurdens = async (product) => {
    return await get(`/mobixCamsCommon/v1/debt-burdens/products/${product}`).catch(err => console.log(err));
};

export const getAllApplicantDistance = async (product) => {
    return await get(`/mobixCamsCommon/v1/applicant-distances/products/${product}`).catch(err => console.log(err));
};

export const getAllSalaryInformation = async (product) => {
    return await get(`/mobixCamsCommon/v1/salary-information/products/${product}`).catch(err => console.log(err));
};

export const getAllCoustomerWorkingStatus = async (product) => {
    return await get(`/mobixCamsCommon/v1/customer-working-statuses/products/${product}`).catch(err => console.log(err));
};

export const getAllAnnualIcomes = async (product) => {
    return await get(`/mobixCamsCommon/v1/annual-income/products/${product}`).catch(err => console.log(err));
};

export const getAllEcibCreditHistory = async (product) => {
    return await get(`/mobixCamsCommon/v1/ecib-credit-history/products/${product}`).catch(err => console.log(err));
};

export const getAllRepeatCustomers = async (product) => {
    return await get(`/mobixCamsCommon/v1/repeat-customers/products/${product}`).catch(err => console.log(err));
};

export const getAllGuarantorRelationship = async (product) => {
    return await get(`/mobixCamsCommon/v1/guarantor-relationships/products/${product}`).catch(err => console.log(err));
};

export const getAllRecidencePlaces = async (product) => {
    return await get(`/mobixCamsCommon/v1/current-residences/products/${product}`).catch(err => console.log(err));
};

export const getAllSecurityGuarantees = async (product) => {
    return await get(`/mobixCamsCommon/v1/security-guarantees/products/${product}`).catch(err => console.log(err));
};

export const getAllPackomanCustCreditHist = async () => {
    return await get(`/mobixCamsCommon/v1/pk-customers`).catch(err => console.log(err));
};

export const getAllOustandingLoans = async () => {
    return await get(`/mobixCamsCommon/v1/outStanding-loans`).catch(err => console.log(err));
};

export const getAllBusinessAssetStock = async (product) => {
    return await get(`/mobixCamsCommon/v1/business-costs/products/${product}`).catch(err => console.log(err));
};

export const getAllAgeRange = async (product) => {
    return await get(`/mobixCamsCommon/v1/age-ranges/products/${product}`).catch(err => console.log(err));
};

export const getAllNoDependents = async (product) => {
    return await get(`/mobixCamsCommon/v1/dependents/products/${product}`).catch(err => console.log(err));
};

export const getAllHeadOfFamily = async (product) => {
    return await get(`/mobixCamsCommon/v1/fml-heads/products/${product}`).catch(err => console.log(err));
};

export const getAllHelthConditions = async (product) => {
    return await get(`/mobixCamsCommon/v1/health-conditions/products/${product}`).catch(err => console.log(err));
};

export const getAllLoanPurpose = async (product) => {
    return await get(`/mobixCamsCommon/v1/loan-purposes/products/${product}`).catch(err => console.log(err));
};

export const getAllFloodFactors = async (product) => {
    return await get(`/mobixCamsCommon/v1/floods-factors/products/${product}`).catch(err => console.log(err));
};

export const getAllIrrigations = async (product) => {
    return await get(`/mobixCamsCommon/v1/irrigations/products/${product}`).catch(err => console.log(err));
};

export const getAllFieldVerification = async (product) => {
    return await get(`/mobixCamsCommon/v1/field-verifications/products/${product}`).catch(err => console.log(err));
};

export const getAllCultivationOwnership = async (product) => {
    return await get(`/mobixCamsCommon/v1/cultivation-ownerships/products/${product}`).catch(err => console.log(err));
};

export const getAllMethodUseAgriMachine = async (product) => {
    return await get(`/mobixCamsCommon/v1/agri-methods/products/${product}`).catch(err => console.log(err));
};

export const getAllCultivationProofs = async (product) => {
    return await get(`/mobixCamsCommon/v1/cultivation-proofs/products/${product}`).catch(err => console.log(err));
};

export const getAllSecurityModes = async (product) => {
    return await get(`/mobixCamsCommon/v1/security-modes/products/${product}`).catch(err => console.log(err));
};

export const getAllWorkers = async (product) => {
    return await get(`/mobixCamsCommon/v1/workers/products/${product}`).catch(err => console.log(err));
};

export const getAllBusinessSectorRates = async (product) => {
    return await get(`/mobixCamsCommon/v1/business-sector-rates/products/${product}`).catch(err => console.log(err));
};

export const getAllIncomeGenTurn = async (product) => {
    return await get(`/mobixCamsCommon/v1/income-generation-turnovers/products/${product}`).catch(err => console.log(err));
};

export const getAllEducations = async (product) => {
    return await get(`/mobixCamsCommon/v1/educations/products/${product}`).catch(err => console.log(err));
};

export const getAllMaritialStatusCredit = async (product) => {
    return await get(`/mobixCamsCommon/v1/marital-statuses/products/${product}`).catch(err => console.log(err));
};

export const getAllPlaceOwnerships = async (product) => {
    return await get(`/mobixCamsCommon/v1/current-ownerships/products/${product}`).catch(err => console.log(err));
};

export const getAllIncomeSourcesCredit = async (product) => {
    return await get(`/mobixCamsCommon/v1/income-sources/products/${product}`).catch(err => console.log(err));
};

export const getAllOwnershipResidance = async (product) => {
    return await get(`/mobixCamsCommon/v1/ownership-residences/products/${product}`).catch(err => console.log(err));
};

export const getAllNatureOfBusiness = async () => {
    return await get(`/mobixCamsCommon/v1/nature-of-businesses`).catch(err => console.log(err));
};

export const getAllJobs = async () => {
    return await get(`/mobixCamsCommon/v1/jobs`).catch(err => console.log(err));
};

export const getAllOtherIncomeCategories = async () => {
    return await get(`/mobixCamsCommon/v1/other-income-categories`).catch(err => console.log(err));
};

export const getAllExceptionalCategories = async () => {
    return await get(`/mobixCamsCommon/v1/exceptional-approval-categories`).catch(err => console.log(err));
};

export const getAllPurposeOfFacility = async () => {
    return await get(`/mobixCamsCommon/v1/facility-purposes`).catch(err => console.log(err));
};

export const getAllBranches = async () => {
    return await get(`/mobixCamsCommon/v1/marketeers/branches`).catch(err => console.log(err));
};

export const getAllCros = async () => {
    return await get(`/mobixCamsCommon/v1/marketeers`).catch(err => console.log(err));
};

export const verifyProfileUser = async (user) => {
    return await get(`/mobixCamsCommon/v1/marketeers/${user}`).catch(err => console.log(err));
};

/* HARDCODED KEY VALUES */

export const getValueOwnershipOfLand = (key) => {
    switch (key) {
        case "OWNED": return "Owned";
        case "RENTED": return "Rented";
        case "FAMILY": return "Family";
        case "LEASED": return "Leased";
        default: return "Value Not Found";
    }
};

export const getValueNatureOfBorrowe = (key) => {
    switch (key) {
        case "OWNER": return "Owner";
        case "TENANTCROPPER": return "Tenant/Shared Cropper";
        case "OWNERTENANT": return "Owner cum Tenant";
        default: return "Value Not Found";
    }
};

export const getValueAddressType = (key) => {
    switch (key) {
        case "TEMPORARY": return "Residential Address";
        case "PERMANANT": return "Permanent Address";
        case "BUSINESS": return "Business Address";
        default: return "Value Not Found";
    }
};

export const getValuePhoneNumberType = (key) => {
    switch (key) {
        case "MN": return "Mobile Number";
        case "FN": return "Fixed Number";
        case "ON": return "Office Number";
        case "APN": return "Additional Phone Number";
        default: return "Value Not Found";
    }
};

export const getValueAccountTitle = (key) => {
    switch (key) {
        case "Active": return "Active";
        case "inactive": return "Inactive";
        default: return "Value Not Found";
    }
};

export const getValuePoliticallyExposed = (key) => {
    switch (key) {
        case "N": return "No";
        case "L": return "Legislative";
        case "AF": return "Armed Forces";
        case "JE": return "Judiciary Executive";
        case "A": return "Administrative";
        case "BR": return "By way of Association/Relationship with PEP";
        default: return "Value Not Found";
    }
};

export const getValueSourceOfIncome = (key) => {
    switch (key) {
        case "SI": return "Salary Income";
        case "BI": return "Business Income";
        case "AI": return "Agri Income";
        case "RI": return "Rental Income";
        default: return "Value Not Found";
    }
};

export const getValueOfClientele = (key) => {
    switch (key) {
        case "C": return "Customer";
        case "G": return "Guarantor";
        default: return "Value Not Found";
    }
};

export const getValueOfVerification = (key) => {
    switch (key) {
        case "RUL_CNIC_ID_VERIFICATION": return { display: true, modal: false, link: false };
        case "RUL_CNIC_NAME_VERIFICATION": return { display: true, modal: false, link: false };
        case "RUL_CLI_OTP_VERIFICATION": return { display: true, modal: false, link: false };
        case "RUL_ECIB_VERIFICATION": return { display: true, modal: false, link: true };
        case "RUL_BIOMETRIC_VERIFICATION": return { display: true, modal: true, link: false };
        case "RUL_TC_CALCULATION": return { display: false, modal: true, link: false };
        case "RUL_GET_LOAN_DETAILS": return { display: false, modal: true, link: false };
        case "RUL_INTERNAL_CRIB": return { display: true, modal: true, link: false };
        default: return {};
    }
};

export const getObExceptionals = (key) => {
    switch (key) {
        case "BLACKLIST": return "Blacklist";
        case "MSASPRO": return "MSAS Pro";
        case "INTCRIB": return "Internal CRIB";
    }
};

export const getCommonAreaValues = (key) => {
    switch (key) {
        case "001": return "COMMON";
        case "KHI": return "KARACHI";
        default: return "Value Not Found";
    }
};