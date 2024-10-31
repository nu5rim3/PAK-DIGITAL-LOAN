import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"

// Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

// i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  const [role, setRole] = useState(null)

  // Permission groups
  const permission = ["ADMIN"]

  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu") // Reinitialize MetisMenu for the sidebar

      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  const assignUserRole = () => {
    const role = localStorage.getItem("role")
    setRole(role)
  }

  const activePermission = (roles = []) => {
    if (roles.includes(role)) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    var _isMounted = true
    ref.current.recalculate()

    if (_isMounted) {
      assignUserRole()
    }

    return () => {
      _isMounted = false
    }
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    // Clear active state from previous items
    document.querySelectorAll(".mm-active").forEach(el => {
      el.classList.remove("mm-active")
    })

    item.classList.add("active")
    let parent = item.parentElement

    while (parent && parent.id !== "side-menu") {
      parent.classList.add("mm-active")
      parent = parent.parentElement.closest("li") // Traverse up to the next list item
      if (parent) {
        parent.classList.add("mm-active")
      }
    }
    scrollElement(item)
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {activePermission(permission) && (
              <>
                <li>
                  <Link to="/#" className="">
                    <i className="bx bx-book-content"></i>
                    <span>{props.t("Dashboard")}</span>
                  </Link>
                </li>
                <li className="menu-title">
                  {props.t("Access and Permission")}{" "}
                </li>

                <li>
                  <Link to="/pakoman-digital-loan/access-and-permission/roles">
                    <i className="bx bxs-user-account"></i>
                    <span>{props.t("Roles")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/pakoman-digital-loan/access-and-permission/members">
                    <i className="bx bx-id-card"></i>
                    <span>{props.t("System Users")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/pakoman-digital-loan/access-and-permission/employees">
                    <i className="bx bx-store"></i>
                    <span>{props.t("Business Introducers")}</span>
                  </Link>
                </li>
              </>
            )}

            {activePermission(permission) && (
              <>
                <li className="menu-title">
                  {props.t("Approval and Ratification")}
                </li>

                <li>
                  <Link
                    to="/pakoman-digital-loan/approval-and-retification/groups"
                    className=""
                  >
                    <i className="bx bx-group"></i>
                    <span>{props.t("Groups")}</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/pakoman-digital-loan/approval-and-retification/users"
                    className=""
                  >
                    <i className="bx bxs-user-check"></i>
                    <span>{props.t("Users")}</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/pakoman-digital-loan/approval-and-retification/workflows"
                    className=""
                  >
                    <i className="bx bx-layer"></i>
                    <span>{props.t("Workflows")}</span>
                  </Link>
                </li>
              </>
            )}

            <li className="menu-title">{props.t("Application Management")}</li>

            <li>
              <Link
                to="/pakoman-digital-loan/application-management/origination"
                className=""
              >
                <i className="bx bx-layer"></i>
                <span>{props.t("Origination")}</span>
              </Link>
            </li>

            {activePermission(permission) && (
              <>
                <li className="menu-title">{props.t("Report and Summary")}</li>
              </>
            )}

            <li>
              <Link to="/pakoman-digital-loan/reports/mis-report" className="">
                <i className="bx bxs-report"></i>
                <span>{props.t("MIS Report")}</span>
              </Link>
            </li>
            {activePermission(permission) && (
              <>
                <li>
                  <Link
                    to="/pakoman-digital-loan/reports/facility-report"
                    className=""
                  >
                    <i className="bx bxs-report"></i>
                    <span>{props.t("Gold Facility Report")}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pakoman-digital-loan/reports/term-deposit-report"
                    className=""
                  >
                    <i className="bx bxs-report"></i>
                    <span>{props.t("Term Deposit Report")}</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/pakoman-digital-loan/reports/bi-report"
                    className=""
                  >
                    <i className="bx bxs-report"></i>
                    <span>{props.t("BI Report")}</span>
                  </Link>
                </li>
              </>
            )}

            {activePermission(permission) && (
              <>
                <li className="menu-title">{props.t("Gold Loan Details")}</li>
                <li>
                  <Link
                    to="/pakoman-digital-loan/gold-loan-summary/index-goldsmith"
                    className=""
                  >
                    <i className="bx bx-book-bookmark"></i>
                    <span>{props.t("Goldsmith")}</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/pakoman-digital-loan/gold-loan-summary/index-marketvalue"
                    className=""
                  >
                    <i className="bx bx-bar-chart"></i>
                    <span>{props.t("Gold Rate Per Gram")}</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
