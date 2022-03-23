import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef();
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
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

  useEffect(() => {
    ref.current.recalculate()
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
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">

            <li className="menu-title">{props.t("Access and Permisssion")} </li>

            <li>
              <Link to="/#" className="">
                <i className="bx bxs-user-account"></i>
                <span>{props.t("Accounts")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/pakoman-digital-loan/access-and-permission/roles">{props.t("Roles")}</Link>
                </li>
                <li>
                  <Link to="/pakoman-digital-loan/access-and-permission/members">{props.t("Members")}</Link>
                </li>
              </ul>
            </li>

            {/* <li>
              <Link to="#" className="">
                <i className="bx bxs-data"></i>
                <span>{props.t("Definitions")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{props.t("Module 1")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Module 2")}</Link>
                </li>
              </ul>
            </li> */}

            <li className="menu-title">{props.t("Approval and Ratification")}</li>

            <li>
              <Link to="/pakoman-digital-loan/approval-and-retification/groups" className="">
                <i className="bx bx-group"></i>
                <span>{props.t("Groups")}</span>
              </Link>
            </li>

            <li>
              <Link to="/pakoman-digital-loan/approval-and-retification/users" className="">
                <i className="bx bxs-user-check"></i>
                <span>{props.t("Users")}</span>
              </Link>
            </li>

            <li>
              <Link to="/pakoman-digital-loan/approval-and-retification/workflows" className="">
                <i className="bx bx-layer"></i>
                <span>{props.t("Workflows")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Application Management")}</li>

            <li>
              <Link to="/pakoman-digital-loan/application-management/origination" className="">
                <i className="bx bx-layer"></i>
                <span>{props.t("Origination")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Report and Summary")}</li>

            {/* <li>
              <Link to="#" className="">
                <i className="bx bxs-report"></i>
                <span>{props.t("Report 01")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="">
                <i className="bx bxs-report"></i>
                <span>{props.t("Report 01")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="">
                <i className="bx bxs-report"></i>
                <span>{props.t("Report 01")}</span>
              </Link>
            </li> */}
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
