import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap"

import moment from "moment"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Table from "components/Datatable/Table"

// Local Components
import Create from "./Create"
import Update from "./Update"

// APIs
import { getAllFilterUsers } from "services/user.service"
import PaginatedTable from "components/Datatable/PaginatedTable"
import Search from "components/Search/Search"

const searchTags = [
  { key: "idx", value: "IDX", type: "TEXT" },
  { key: "shop", value: "Name", type: "TEXT" },
  { key: "role", value: "Role", type: "TEXT" },
  { key: "profileUser", value: "Profile User", type: "TEXT" },
  { key: "lastModifiedDate", value: "Last Modified Date", type: "DATE" },
  { key: "status", value: "Status", type: "SELECT" },
]

const searchStatus = [
  { label: "Active", value: "A" },
  { label: "Inactive", value: "I" },
]

const Member = props => {
  const [page, setPage] = useState(0)

  const SIZE = 7

  const [users, setUsers] = useState([])
  const [usersTableData, setUsersTableData] = useState([])
  const [searchData, setSearchData] = useState({})
  const [data, setData] = useState(null)
  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [searchTriggered, setSearchTriggered] = useState(false)

  const toggelCreateModal = () => {
    setIsOpenCreate(!isOpenCreate)
  }

  const openUpdateModal = data => {
    setData(data)
    setIsOpenUpdate(true)
  }

  const closeUpdateModal = () => {
    setData(null)
    setIsOpenUpdate(false)
  }

  const getLabel = item => {
    if (item.status === "A") {
      item.status = "Active"
      return item
    } else {
      item.status = "Inactive"
      return item
    }
  }

  const getRoles = item => {
    if (item.roles.length > 0) {
      item.roles = item.roles.map(role => role.code).join(" , ")
      return item
    } else {
      item.roles = ""
      return item
    }
  }

  const getLastModifiedDate = item => {
    item.lastModifiedDate = moment(item.lastModifiedDate).format("YYYY-MM-DD")
    return item
  }

  const getActions = item => {
    item.actions = (
      <div className="d-flex align-items-center">
        <button
          className="btn btn-warning btn-sm d-flex justify-content-between align-items-center"
          onClick={() => openUpdateModal(item)}
        >
          <i className="bx bxs-edit font-size-16 me-1"></i>
          <p className="m-0">Update</p>
        </button>
      </div>
    )
    return item
  }

  const items = {
    columns: [
      {
        field: "idx",
        label: "IDX",
        sort: "asc",
      },
      {
        field: "userName",
        label: "Name",
        sort: "asc",
      },
      {
        field: "roles",
        label: "Role",
        sort: "asc",
      },
      {
        field: "profileUser",
        label: "Profile User",
        sort: "asc",
      },
      {
        field: "lastModifiedDate",
        label: "Last Modified Date",
        sort: "asc",
      },
      {
        field: "status",
        label: "Status",
        sort: "asc",
      },
      {
        field: "actions",
        label: "Action",
        sort: "asc",
      },
    ],
    rows: users,
  }

  const modernization = item => {
    item = getRoles(item)
    item = getLabel(item)
    item = getLastModifiedDate(item)
    item = getActions(item)
    return item
  }

  const fetchData = async () => {
    setIsLoading(true)
    const idx = searchData?.searchFeild === "IDX" ? searchData.search : ""
    const name = searchData?.searchFeild === "Name" ? searchData.search : ""
    const role = searchData?.searchFeild === "Role" ? searchData.search : ""
    const profileUser =
      searchData?.searchFeild === "Profile User" ? searchData.search : ""
    const fromDate =
      searchData?.searchFeild === "Last Modified Date"
        ? searchData.fromDate
        : ""
    const toDate =
      searchData?.searchFeild === "Last Modified Date" ? searchData.toDate : ""
    const status = searchData?.searchFeild === "Status" ? searchData.status : ""

    const userResponse = await getAllFilterUsers(
      searchData.search === "" && isReset ? 0 : page,
      SIZE,
      idx,
      name,
      role,
      profileUser,
      fromDate,
      toDate,
      status
    )
    setUsersTableData(userResponse)
    setIsLoading(false)
    setSearchTriggered(false)
    if (userResponse !== undefined) {
      var data = userResponse.content.map(item => modernization(item))
      setUsers(data)
    }
  }

  useEffect(() => {
    setSearchTriggered(true)
    setPage(0)
  }, [
    isReset,
    searchData.searchFeild,
    searchData.status,
    searchData.search,
    searchData.fromDate,
    searchData.toDate,
  ])

  useEffect(() => {
    fetchData()
  }, [page, searchTriggered])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={"Access & Permission"}
            breadcrumbItem={"System Users"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">System Users</CardTitle>
                  <div className="d-flex justify-content-between mb-4">
                    <p className="card-title-desc">
                      The system users refer to the people who use Mobile and
                      Computers to perform their jobs.
                    </p>

                    <Button
                      color="primary"
                      size="sm"
                      className="btn d-flex justify-content-between align-items-center"
                      onClick={() => toggelCreateModal(true)}
                    >
                      <i className="bx bxs-plus-square font-size-16 me-1"></i>
                      <p className="m-0">Create System User</p>
                    </Button>
                  </div>
                  {/* Advence search */}
                  <Search
                    searchTags={searchTags}
                    loading={isLoading}
                    onReset={setIsReset}
                    onSubmitSearch={setSearchData}
                    status={searchStatus}
                  />

                  <PaginatedTable
                    items={items}
                    setPage={setPage}
                    page={page}
                    totalPages={usersTableData?.totalPages ?? 0}
                  />
                </CardBody>
              </Card>
            </Col>

            <Create toggel={toggelCreateModal} isOpen={isOpenCreate} />
            <Update
              openModal={openUpdateModal}
              closeUpdateModal={closeUpdateModal}
              isOpen={isOpenUpdate}
              data={data}
              setData={setData}
              onSuccessfulUpdate={fetchData}
            />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Member.propTypes = {
  t: PropTypes.any,
}

export default Member
