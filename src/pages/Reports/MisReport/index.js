import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

import moment from "moment"

import { useForm } from "react-hook-form"

import Loader from "components/SyncLoader"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Table from "components/Datatable/Table"

// APIs
import {
  getMisReportSummary,
  getMisReport,
  getFilteredMisReport,
} from "services/report.service"

import { getAllBranches } from "services/common.service"

import { getAllUsers, getUserById } from "services/user.service"

import PaginatedTable from "components/Datatable/PaginatedTable"
import Search from "components/Search/Search"

import { getCurrency } from "services/util.service"

const searchTags = [
  { key: "appraisalId", value: "Appraisal ID", type: "TEXT" },
  { key: "branch", value: "Branch Name", type: "TEXT" },
  { key: "croName", value: "CRO Name", type: "TEXT" },
  // { key: "status", value: "Status", type: "SELECT" },
  { key: "createdAt", value: "Created Date", type: "DATE" },
]

const extraStatus = [
  { label: "Pending", value: "P" },
  { label: "Returned", value: "R" },
  { label: "Approval Pending", value: "C" },
  { label: "Approved", value: "A" },
  { label: "Rejected", value: "J" },
]

// const searchStatus = [
//   { label: "Pending", value: "P" },
//   { label: "Returned", value: "R" },
//   { label: "Approval Pending", value: "C" },
//   { label: "Approved", value: "A" },
//   { label: "Rejected", value: "J" },
// ]

const MisReport = props => {
  const [branches, setBranches] = useState([])

  const [cros, setCros] = useState([])
  const [userDetails, setUserDetails] = useState(null)
  const [isBranch, setIsBranch] = useState(false)

  const [data, setData] = useState([])
  const [page, setPage] = useState(0)

  const SIZE = 7

  const [searchData, setSearchData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [tableData, setTableData] = useState([])
  const [searchTriggered, setSearchTriggered] = useState(false)

  const items = {
    columns: [
      {
        field: "appraisalId",
        label: "Appraisal ID",
        sort: "asc",
      },

      {
        field: "branchDesc",
        label: "Branch Name",
        sort: "asc",
      },
      {
        field: "userName",
        label: "CRO Name",
        sort: "asc",
      },
      {
        field: "status",
        label: "Status",
        sort: "asc",
      },
      {
        field: "loanProduct",
        label: "Product Name",
        sort: "asc",
      },
      {
        field: "customerCnic",
        label: "Customer CNIC",
        sort: "asc",
      },
      {
        field: "customerName",
        label: "Customer Name",
        sort: "asc",
      },
      {
        field: "requestedLoanAmount",
        label: "Req. Loan Amount",
        sort: "asc",
      },
      {
        field: "createdDate",
        label: "Created Date",
        sort: "asc",
      },

      {
        field: "userIdx",
        label: "Created By",
        sort: "asc",
      },
      {
        field: "nextActionPendingRole",
        label: "Next Action Pending Role",
        sort: "asc",
      },
    ],
    rows: data,
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    if (
      userDetails.roles[0].code === "CO" ||
      userDetails.roles[0].code === "BHO"
    ) {
      data.branch = userDetails.branches[0].code
    }

    setIsLoading(true)
    const misResponse = await getMisReportSummary(data)
    if (misResponse !== undefined && misResponse !== null) {
      var data = misResponse.map(item => modernization(item))

      setData(data)

      setIsLoading(false)
    }
  }

  const getLabel = item => {
    item.appraisalId = item.appIdx
    item.branchDesc = item.branchName
    item.userName = item.userName
    item.status = item.appraisalStatus
    item.customerCnic = item.customerCnic
    item.customerName = item.customerName
    item.loanProduct = item.productName
    item.requestedLoanAmount = getCurrency(item.loanAmount)
    item.createdDate = moment(item.createdDate).format("yyyy-MM-DD HH:mm:ss")
    item.userIdx = item.userIdx
    item.nextActionPendingRole = item.nextActionPendingUser ?? "-"
    return item
  }

  const getStatus = item => {
    if (item.status === "A") {
      item.status = (
        <span className="font-size-12  badge bg-success rounded-pill">
          Approved
        </span>
      )
    } else if (item.status === "R") {
      item.status = (
        <span className="font-size-12  badge bg-warning rounded-pill">
          Returned
        </span>
      )
    } else if (item.status === "C") {
      item.status = (
        <span className="font-size-12  badge bg-secondary rounded-pill">
          Approval Pending
        </span>
      )
    } else if (item.status === "J") {
      item.status = (
        <span className="font-size-12  badge bg-danger rounded-pill">
          Rejected
        </span>
      )
    } else if (item.status === "P") {
      item.status = (
        <span className="font-size-12  badge bg-danger rounded-pill">
          Pending
        </span>
      )
    }
    return item
  }

  const modernization = item => {
    item = getLabel(item)
    item = getStatus(item)
    return item
  }

  const exportToExcel = async () => {
    var exportData = watch()
    var role = localStorage.getItem("role")
    var branch = localStorage.getItem("branch")

    console.log("[branch]", branch)
    if (role === "CO" || role === "BHO") {
      exportData.branch = branch
    }
    const response = await getMisReport(exportData)

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = `mis-report.xlsx`
    link.click()
  }

  // useEffect(() => {
  //   var _isMounted = true

  //   const fetchData = async () => {
  //     const branchResponse = await getAllBranches()

  //     const userResponse = await getAllUsers(0, 10000)
  //     const obj = JSON.parse(localStorage.getItem("authUser"))

  //     const userDetailsResponse = await getUserById(obj.username)

  //     if (_isMounted) {
  //       setBranches(branchResponse)
  //       setUserDetails(userDetailsResponse)
  //       if (
  //         userDetailsResponse.roles[0].code === "CO" ||
  //         userDetailsResponse.roles[0].code === "BHO"
  //       ) {
  //         setIsBranch(false)
  //       } else {
  //         setBranches(true)
  //       }
  //       if (userResponse !== undefined) {
  //         var croList = []

  //         userResponse.content.forEach(function (item) {
  //           if (item.meCode != null) {
  //             croList.push(item)
  //           }
  //         })
  //         croList.sort((a, b) =>
  //           a.userName.toLowerCase() > b.userName.toLowerCase() ? 1 : -1
  //         )
  //         setCros(croList)
  //       }
  //     }
  //   }

  //   fetchData()

  //   return () => {
  //     _isMounted = false
  //   }
  // }, [])

  const fetchData = async () => {
    setIsLoading(true)
    const status = searchData.status ?? ""
    const appraisalId =
      searchData?.searchFeild === "Appraisal ID" ? searchData.search : ""
    const fromDate =
      searchData?.searchFeild === "Created Date" ? searchData.fromDate : ""
    const toDate =
      searchData?.searchFeild === "Created Date" ? searchData.toDate : ""
    const branchName =
      searchData?.searchFeild === "Branch Name" ? searchData.search : ""
    const croName =
      searchData?.searchFeild === "CRO Name" ? searchData.search : ""

    const tableResponse = await getFilteredMisReport(
      page,
      SIZE,
      appraisalId,
      status,
      fromDate,
      toDate,
      branchName,
      croName
    )

    setTableData(tableResponse)
    setIsLoading(false)
    setSearchTriggered(false)
    if (tableResponse !== undefined) {
      var data = tableResponse.content?.map(item => modernization(item))
      setData(data)
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
            title={"Report And Summary"}
            breadcrumbItem={"MIS Report"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">MIS Report</CardTitle>
                  <p className="card-title-desc"></p>

                  {/* <form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="my-4">
                      <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-4 col-form-label"
                          >
                            Status :{" "}
                          </label>
                          <div className="col-md-9">
                            <select
                              className="form-control"
                              name="status"
                              {...register("status", { required: false })}
                            >
                              <option value="">-- Select --</option>
                              <option value="P">Pending</option>
                              <option value="R">Returned</option>
                              <option value="C">Approval Pending</option>
                              <option value="A">Approved</option>
                              <option value="J">Rejected</option>
                            </select>
                          </div>
                          {errors.status && (
                            <span className="error">
                              This field is required
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-4 col-form-label"
                          >
                            ID :{" "}
                          </label>
                          <div className="col-md-9">
                            <input
                              {...register("appraisalId", { required: false })}
                              className="form-control"
                              type="text"
                              name="appraisalId"
                              id="appraisalId"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-4 col-form-label"
                          >
                            From :{" "}
                          </label>
                          <div className="col-md-9">
                            <input
                              {...register("fromDate", { required: false })}
                              className="form-control"
                              type="date"
                              defaultValue={new Date()
                                .toISOString()
                                .slice(0, 10)}
                              name="fromDate"
                              id="fromDate"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-4 col-form-label"
                          >
                            To :{" "}
                          </label>
                          <div className="col-md-9">
                            <input
                              {...register("toDate", { required: false })}
                              className="form-control"
                              type="date"
                              defaultValue={new Date()
                                .toISOString()
                                .slice(0, 10)}
                              name="toDate"
                              id="toDate"
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {isBranch && (
                        <Col className="col-3">
                          <div className="form-group row">
                            <label
                              htmlFor="example-date-input"
                              className="col-md-4 col-form-label"
                            >
                              Branch :{" "}
                            </label>
                            <div className="col-md-9">
                              <select
                                className="form-control"
                                id="branch"
                                {...register("branch", { required: false })}
                              >
                                <option value="">-- Select --</option>
                                {branches.map((item, index) => (
                                  <option key={index} value={item.code}>
                                    {item.description}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </Col>
                      )}
                      <Col className="col-3">
                        <div className="form-group row">
                          <label
                            htmlFor="example-date-input"
                            className="col-md-4 col-form-label"
                          >
                            CRO :{" "}
                          </label>
                          <div className="col-md-9">
                            <select
                              className="form-control"
                              id="cro"
                              {...register("cro", { required: false })}
                            >
                              <option value="">-- Select --</option>
                              {cros.map((item, index) => (
                                <option key={index} value={item.idx}>
                                  {item.userName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-12 mt-4">
                        <div className="d-flex justify-content-end">
                          <div className="p-2">
                            <button
                              type="submit"
                              className="btn btn-primary waves-effect waves-light"
                            >
                              <span className="d-flex">
                                <Loader loading={isLoading} />{" "}
                                <p className="m-0">Search</p>
                              </span>
                            </button>
                          </div>
                          <div className="p-2">
                            <button
                              onClick={exportToExcel}
                              type="button"
                              className="btn btn-success waves-effect waves-light"
                            >
                              <span className="d-flex">
                                <p className="m-0">
                                  <i className="dripicons-download"></i>Download
                                </p>
                              </span>
                            </button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </form> */}

                  {/* Advence search */}
                  <Search
                    searchTags={searchTags}
                    loading={isLoading}
                    onReset={setIsReset}
                    onSubmitSearch={setSearchData}
                    // status={searchStatus}
                    extraStatus={extraStatus}
                  />

                  <div className="pb-2 d-flex justify-content-end align-items-center">
                    <button
                      onClick={exportToExcel}
                      type="button"
                      className="btn btn-success waves-effect waves-light"
                    >
                      <i className="dripicons-download pe-1"></i> Download
                    </button>
                  </div>

                  {/* <Table items={items} /> */}

                  <PaginatedTable
                    items={items}
                    setPage={setPage}
                    page={page}
                    totalPages={tableData?.totalPages ?? 0}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

MisReport.propTypes = {
  t: PropTypes.any,
}

export default MisReport
