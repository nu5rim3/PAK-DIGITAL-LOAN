import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

import moment from "moment"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Table from "components/Datatable/Table"

// Local Components
import Create from "./Create"
import Update from "./Update"

import PaginatedTable from "components/Datatable/PaginatedTable"
import Search from "components/Search/Search"

// APIs
import { getAllFilterApprovalUsers } from "services/approval.service"

const searchTags = [
  { key: "userId", value: "User ID", type: "TEXT" },
  { key: "groupCode", value: "Group Code", type: "TEXT" },
  { key: "groupName", value: "Group Name", type: "TEXT" },
  { key: "lastModifiedDate", value: "Last Modified Date", type: "DATE" },
  { key: "status", value: "Status", type: "SELECT" },
]

const searchStatus = [
  { label: "Active", value: "A" },
  { label: "Inactive", value: "I" },
]

const Member = props => {
  const SIZE = 7

  const [users, setUsers] = useState([])
  const [data, setData] = useState(null)
  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)

  const [page, setPage] = useState(0)
  const [searchData, setSearchData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [tableData, setTableData] = useState([])
  const [searchTriggered, setSearchTriggered] = useState(false)

  const toggelCreateModal = () => {
    setIsOpenCreate(!isOpenCreate)
  }

  const toggelUpdateModal = data => {
    setData(data)
    setIsOpenUpdate(!isOpenUpdate)
  }

  const getLabel = item => {
    if (item.groupStatus === "A") {
      item.groupStatus = "Active"
    } else {
      item.groupStatus = "Inactive"
    }
    item.groupCode = item.groupCode
    item.groupName = item.groupName
    return item
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
          onClick={() => toggelUpdateModal(item)}
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
        field: "groupUserIdx",
        label: "IDX",
        sort: "asc",
      },
      {
        field: "groupCode",
        label: "Group Code",
        sort: "asc",
      },
      {
        field: "groupName",
        label: "Group Name",
        sort: "asc",
      },
      {
        field: "lastModifiedDate",
        label: "Last Modified Date",
        sort: "asc",
      },
      {
        field: "groupStatus",
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
    item = getLabel(item)
    item = getLastModifiedDate(item)
    item = getActions(item)
    return item
  }

  const fetchData = async () => {
    setIsLoading(true)
    const userId =
      searchData?.searchFeild === "User ID" ? searchData.search : ""
    const groupCode =
      searchData?.searchFeild === "Group Code" ? searchData.search : ""
    const groupName =
      searchData?.searchFeild === "Group Name" ? searchData.search : ""
    const fromDate =
      searchData?.searchFeild === "Last Modified Date"
        ? searchData.fromDate
        : ""
    const toDate =
      searchData?.searchFeild === "Last Modified Date" ? searchData.toDate : ""
    const status = searchData?.searchFeild === "Status" ? searchData.status : ""

    const approvalUsers = await getAllFilterApprovalUsers(
      userId,
      status,
      fromDate,
      toDate,
      page,
      SIZE,
      groupCode,
      groupName
    )

    setTableData(approvalUsers)
    setIsLoading(false)
    setSearchTriggered(false)
    if (approvalUsers !== undefined) {
      var data = approvalUsers?.content?.map(item => modernization(item))
      setUsers(data)
    }
  }

  useEffect(() => {
    setSearchTriggered(true)
    setPage(0)
  }, [isReset, searchData.searchFeild, searchData.status, searchData.search])

  useEffect(() => {
    fetchData()
  }, [page, searchTriggered])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={"Approval & Retification"}
            breadcrumbItem={"Users"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Approval Group Users</CardTitle>

                  <div className="d-flex justify-content-between mb-4">
                    <p className="card-title-desc">
                      Approval group users are assigned to specific approval
                      groups based on the defined workflow.
                    </p>

                    <button
                      className="btn btn-primary btn-sm d-flex justify-content-between align-items-center"
                      onClick={() => toggelCreateModal(true)}
                    >
                      <i className="bx bxs-plus-square font-size-16 me-1"></i>
                      <p className="m-0">Create User</p>
                    </button>
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
                    totalPages={tableData?.totalPages ?? 0}
                  />
                </CardBody>
              </Card>
            </Col>

            <Create toggel={toggelCreateModal} isOpen={isOpenCreate} />
            <Update
              toggel={toggelUpdateModal}
              isOpen={isOpenUpdate}
              data={data}
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
