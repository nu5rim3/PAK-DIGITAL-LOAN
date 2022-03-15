import React from "react"
import { Redirect } from "react-router-dom"

// ACCESS AND PERMISSIONS
import Login from "pages/Authentication/Login"
import Logout from "pages/Authentication/Logout"

import Role from "pages/AccessAndPermission/Accounts/Role"
import Member from "pages/AccessAndPermission/Accounts/Member"

// APPROVAL AND RETIFICATION
import Group from "pages/ApprovalAndRetification/Group"
import GroupUser from "pages/ApprovalAndRetification/User"
import Workflow from "pages/ApprovalAndRetification/Workflow"

// APPLICAITON MANAGEMENT
import Dashboard from "pages/Dashboard/index"
import Origination from "pages/ApplicationManagement/Origination"

import Appraisal from "pages/ApplicationManagement"
import EcibViwer from "pages/ApplicationManagement/OnBoardingDetails/EcibDocument"
import BiometricViewer from "pages/ApplicationManagement/OnBoardingDetails/BiometricDocument"
import InternalCreditDocument from "pages/ApplicationManagement/OnBoardingDetails/InternalCreditDocument"

// REPORT AND SUMMARY

const authProtectedRoutes = [

  // ACCESS AND PERMISSIONS
  { path: "/pakoman-digital-loan/access-and-permission/roles", component: Role },
  { path: "/pakoman-digital-loan/access-and-permission/members", component: Member },

  // APPROVAL AND RETIFICATION
  { path: "/pakoman-digital-loan/approval-and-retification/groups", component: Group },
  { path: "/pakoman-digital-loan/approval-and-retification/users", component: GroupUser },
  { path: "/pakoman-digital-loan/approval-and-retification/workflows", component: Workflow },
  
  // APPLICATION MANAGEMENT
  { path: "/pakoman-digital-loan/dashboard", component: Dashboard },
  { path: "/pakoman-digital-loan/application-management/origination", component: Origination },
  { path: "/pakoman-digital-loan/credit-appraisals/view/:appraisalId", component: Appraisal },
  { path: "/pakoman-digital-loan/credit-appraisals/documents/ecib/:path*", component: EcibViwer },
  { path: "/pakoman-digital-loan/credit-appraisals/documents/biometric/:id", component: BiometricViewer },
  { path: "/pakoman-digital-loan/credit-appraisals/documents/credit-history/:id", component: InternalCreditDocument },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/pakoman-digital-loan/dashboard" /> },
  { path: "/pakoman-digital-loan", exact: true, component: () => <Redirect to="/pakoman-digital-loan/dashboard" /> },
]

const publicRoutes = [
  { path: "/pakoman-digital-loan/logout", component: Logout },
  { path: "/pakoman-digital-loan/login", component: Login },
]

export { publicRoutes, authProtectedRoutes }
