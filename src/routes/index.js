import React from "react"
import { Redirect } from "react-router-dom"

// ACCESS AND PERMISSIONS
import Login from "pages/Authentication/Login"
import Logout from "pages/Authentication/Logout"
import RedirectPage from "pages/Authentication/Redirect"
import UserRoleSelecter from "pages/Authentication/LoginRoles"
import CommonOauth2Logout from "pages/Authentication/CommonOauth2Logout"

import Role from "pages/AccessAndPermission/Accounts/Role"
import Member from "pages/AccessAndPermission/Accounts/Member"
import Employee from "pages/AccessAndPermission/Accounts/Employee"
// APPROVAL AND RETIFICATION
import Group from "pages/ApprovalAndRetification/Group"
import GroupUser from "pages/ApprovalAndRetification/User"
import Workflow from "pages/ApprovalAndRetification/Workflow"

// APPLICAITON MANAGEMENT
import Dashboard from "pages/Dashboard/index"
import Origination from "pages/ApplicationManagement/Origination"

import Appraisal from "pages/ApplicationManagement"
import PepDocument from "pages/ApplicationManagement/OnBoardingDetails/PepDocument"
import SancDocument from "pages/ApplicationManagement/OnBoardingDetails/SancDocument"
import EcibViwer from "pages/ApplicationManagement/OnBoardingDetails/EcibDocument"
import BiometricViewer from "pages/ApplicationManagement/OnBoardingDetails/BiometricDocument"
import InternalCreditDocument from "pages/ApplicationManagement/OnBoardingDetails/InternalCreditDocument"
import ReportDocument from "pages/ApplicationManagement/ReportDetails/Document"
import CombinedReports from "../components/ApprasialLayout/ReportLayout";

// REPORT AND SUMMARY

import MisReport from "pages/Reports/MisReport"
import FacilityReport from "pages/Reports/FacilityReport"
import TermDepositReport from "pages/Reports/TermDepositReport"
import BiReport from "pages/Reports/BiReport"
//GOLD LOAN SUMMARY
import IndexGoldSmith from "pages/GoldLoan/Goldsmith"
// import ReportGoldSmith from "pages/Gold Loan/Goldsmith/GoldsmithReport"
import IndexMarcketValue from "pages/GoldLoan/MarketValue"
// import GoldRateReport from "pages/Gold Loan/MarketValue/GoldRateReport"

const authProtectedRoutes = [

  // ACCESS AND PERMISSIONS
  { path: "/pakoman-digital-loan/access-and-permission/roles", component: Role },
  { path: "/pakoman-digital-loan/access-and-permission/members", component: Member },
  { path: "/pakoman-digital-loan/access-and-permission/employees", component: Employee },
  // APPROVAL AND RETIFICATION
  { path: "/pakoman-digital-loan/approval-and-retification/groups", component: Group },
  { path: "/pakoman-digital-loan/approval-and-retification/users", component: GroupUser },
  { path: "/pakoman-digital-loan/approval-and-retification/workflows", component: Workflow },

  // APPLICATION MANAGEMENT
  { path: "/pakoman-digital-loan/dashboard", component: Dashboard },
  { path: "/pakoman-digital-loan/application-management/origination", component: Origination },
  { path: "/pakoman-digital-loan/credit-appraisals/view/:appraisalId", component: Appraisal },
  { path: "/pakoman-digital-loan/credit-appraisals/documents/pep/:id", component: PepDocument },
  { path: "/pakoman-digital-loan/credit-appraisals/documents/sanc/:id", component: CombinedReports },
  { path: "/pakoman-digital-loan/credit-appraisals/documents/ecib/:cnic", component: EcibViwer },
  { path: "/pakoman-digital-loan/credit-appraisals/documents/biometric/:id", component: BiometricViewer },
  { path: "/pakoman-digital-loan/credit-appraisals/documents/credit-history/:id", component: InternalCreditDocument },
  { path: "/pakoman-digital-loan/credit-appraisals/documents/:reportType/reports/:appraisalId", component: ReportDocument },

  // REPORT AND SUMMARY
  { path: "/pakoman-digital-loan/reports/mis-report", component: MisReport },
  { path: "/pakoman-digital-loan/reports/facility-report", component: FacilityReport },
  { path: "/pakoman-digital-loan/reports/term-deposit-report", component: TermDepositReport },
  { path: "/pakoman-digital-loan/reports/bi-report", component: BiReport },
  // GOLD LOAN SUMMARY
  { path: "/pakoman-digital-loan/gold-loan-summary/index-goldsmith", component: IndexGoldSmith },
  // { path: "/pakoman-digital-loan/gold-loan-summary/report-goldsmith", component: ReportGoldSmith },
  { path: "/pakoman-digital-loan/gold-loan-summary/index-marketvalue", component: IndexMarcketValue },
  // { path: "/pakoman-digital-loan/gold-loan-summary/report-marketvalue", component: GoldRateReport },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/pakoman-digital-loan/dashboard" /> },
  { path: "/pakoman-digital-loan", exact: true, component: () => <Redirect to="/pakoman-digital-loan/dashboard" /> },
]

const publicRoutes = [
  { path: "/pakoman-digital-loan/logout", component: Logout },
  { path: "/pakoman-digital-loan/login", component: Login },
  { path: "/pakoman-digital-loan/redirect", component: RedirectPage },
  { path: "/pakoman-digital-loan/openidconnect/oauth2client", component: CommonOauth2Logout },
  { path: "/pakoman-digital-loan/role", component: UserRoleSelecter },
]

export { publicRoutes, authProtectedRoutes }
