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
  { path: "/access-and-permission/roles", component: Role },
  { path: "/access-and-permission/members", component: Member },

  // APPROVAL AND RETIFICATION
  { path: "/approval-and-retification/groups", component: Group },
  { path: "/approval-and-retification/users", component: GroupUser },
  { path: "/approval-and-retification/workflows", component: Workflow },
  
  // APPLICATION MANAGEMENT
  { path: "/dashboard", component: Dashboard },
  { path: "/application-management/origination", component: Origination },
  { path: "/credit-appraisals/view/:appraisalId", component: Appraisal },
  { path: "/credit-appraisals/documents/ecib/:path*", component: EcibViwer },
  { path: "/credit-appraisals/documents/biometric/:id", component: BiometricViewer },
  { path: "/credit-appraisals/documents/credit-history/:id", component: InternalCreditDocument },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
]

export { publicRoutes, authProtectedRoutes }
