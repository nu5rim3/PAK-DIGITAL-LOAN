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
import DeActivateEmployee from "./DeActivateEmployee"
import ActivateEmployee from "./ActivateEmployee"
// APIs
import { getAllEmployees } from "services/employee.service"

import PaginatedTable from "components/Datatable/PaginatedTable"
import Search from "components/Search/Search"

const searchTags = [
  { key: "empNo", value: "Employee No", type: "TEXT" },
  { key: "empName", value: "Employee Name", type: "TEXT" },
  { key: "empDisplayName", value: "Display Name", type: "TEXT" },
  { key: "cnic", value: "Cnic", type: "TEXT" },
  { key: "lastModifiedDate", value: "Last Modified Date", type: "DATE" },
  { key: "status", value: "Status", type: "SELECT" },
]

const searchStatus = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
]

const Employee = props => {
  const [page, setPage] = useState(0)

  const SIZE = 7

  const [employees, setEmployees] = useState([])
  const [data, setData] = useState(null)
  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const [isDeactivate, setIsDecivate] = useState(false)
  const [isOpenActivate, setIsOpenActivate] = useState(false)

  const [searchData, setSearchData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [tableData, setTableData] = useState([])
  const [searchTriggered, setSearchTriggered] = useState(false)

  const toggelCreateModal = () => {
    setIsOpenCreate(!isOpenCreate)
  }
  const toggelDeactivateModal = data => {
    setData(data)
    setIsDecivate(!isDeactivate)
  }
  const toggelActivateModal = data => {
    setData(data)
    setIsOpenActivate(!isOpenActivate)
  }

  const toggelUpdateModal = data => {
    setData(data)
    setIsOpenUpdate(!isOpenUpdate)
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

  const getLastModifiedDate = item => {
    item.lastModifiedDate = moment(item.lastModifiedDate).format("YYYY-MM-DD")
    return item
  }

  const getActions = item => {
    if (item.status === "ACTIVE") {
      item.actions = (
        <Row>
          <Col>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-warning btn-sm d-flex justify-content-between align-items-center"
                onClick={() => toggelUpdateModal(item)}
              >
                <i className="bx bxs-edit font-size-16 me-1"></i>
                <p className="m-0">Update</p>
              </button>
            </div>
          </Col>
          <Col>
            <div className="d-flex ">
              <button
                className="btn btn-danger btn-sm d-flex align-items-space-between m-1"
                onClick={() => toggelDeactivateModal(item)}
              >
                <i className="bx bxs-trash font-size-18"></i>
                <p className="m-0">Deactivate</p>
              </button>
            </div>
          </Col>
        </Row>
      )
      return item
    } else {
      item.actions = (
        <Row>
          <Col>
            <div className="d-flex ">
              <button
                className="btn btn-success btn-sm d-flex align-items-space-between m-1"
                onClick={() => toggelActivateModal(item)}
              >
                <i className="bx bx-revision font-size-16"></i>
                <p className="m-0">Activate</p>
              </button>
            </div>
          </Col>
        </Row>
      )
      return item
    }
  }
  const items = {
    columns: [
      {
        field: "empNo",
        label: "Employee No",
        sort: "asc",
      },
      {
        field: "empName",
        label: "Employee Name",
        sort: "asc",
      },
      {
        field: "empDisplayName",
        label: "Display Name",
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
    rows: employees,
  }

  const modernization = item => {
    item = getLabel(item)
    item = getLastModifiedDate(item)
    item = getActions(item)
    return item
  }

  const fetchData = async () => {
    setIsLoading(true)
    const empNo =
      searchData?.searchFeild === "Employee No" ? searchData.search : ""
    const empName =
      searchData?.searchFeild === "Employee Name" ? searchData.search : ""
    const empDisplayName =
      searchData?.searchFeild === "Display Name" ? searchData.search : ""
    const cnic = searchData?.searchFeild === "Cnic" ? searchData.search : ""
    const fromDate =
      searchData?.searchFeild === "Last Modified Date"
        ? searchData.fromDate
        : ""
    const toDate =
      searchData?.searchFeild === "Last Modified Date" ? searchData.toDate : ""
    const status = searchData?.searchFeild === "Status" ? searchData.status : ""

    const employeeResponse = await getAllEmployees(
      page,
      SIZE,
      empNo,
      empName,
      empDisplayName,
      cnic,
      fromDate,
      toDate,
      status
    )

    setTableData(employeeResponse?.data)
    setIsLoading(false)
    setSearchTriggered(false)
    if (employeeResponse !== undefined) {
      var data = employeeResponse.data?.content?.map(item =>
        modernization(item)
      )
      setEmployees(data)
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
            title={"Access & Permission"}
            breadcrumbItem={"Business Introducers"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">
                    System Business Introducers
                  </CardTitle>

                  <div className="d-flex justify-content-between mb-4">
                    <p className="card-title-desc">
                      The system end Business Introducers of the system refer to
                      the people who use computers to perform their jobs, like
                      desktop operators.
                    </p>

                    <button
                      className="btn btn-primary btn-sm d-flex justify-content-between align-items-center"
                      onClick={() => toggelCreateModal(true)}
                    >
                      <i className="bx bxs-plus-square font-size-16 me-1"></i>
                      <p className="m-0">Create Business Introducers</p>
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
              onSuccessfulUpdate={() => console.log("Data Feteched")}
            />
            <DeActivateEmployee
              toggel={toggelDeactivateModal}
              isOpen={isDeactivate}
              data={data}
              onSuccessfulDeactivate={() => console.log("Data Feteched")}
            />
            <ActivateEmployee
              toggel={toggelActivateModal}
              isOpen={isOpenActivate}
              data={data}
              onSuccessfulActivate={() => console.log("Data Feteched")}
            />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Employee.propTypes = {
  t: PropTypes.any,
}

export default Employee
