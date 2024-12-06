import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

import moment from "moment"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

// APIs
import { getMisReport, getFilteredMisReport } from "services/report.service"

import PaginatedTable from "components/Datatable/PaginatedTable"
import Search from "components/Search/Search"

import { getCurrency } from "services/util.service"

const searchTags = [
  { key: "appraisalId", value: "Appraisal ID", type: "TEXT" },
  { key: "branch", value: "Branch Name", type: "TEXT" },
  { key: "croName", value: "CRO Name", type: "TEXT" },
  // { key: "createdAt", value: "Created Date", type: "DATE" },
]

const extraStatus = [
  { label: "Pending", value: "P" },
  { label: "Returned", value: "R" },
  { label: "Approval Pending", value: "C" },
  { label: "Approved", value: "A" },
  { label: "Rejected", value: "J" },
]

const MisReport = props => {
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
        algin: "right",
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
        label: "Next Action By",
        sort: "asc",
      },
    ],
    rows: data,
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
        <span className="font-size-12  badge bg-info rounded-pill">
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
    const status = searchData.status ?? ""
    const appraisalId =
      searchData?.searchFeild === "Appraisal ID" ? searchData.search : ""
    const fromDate = searchData.fromDate
      ? moment(searchData.fromDate).format("YYYY-MM-DD")
      : ""
    const toDate = searchData.toDate
      ? moment(searchData.toDate).format("YYYY-MM-DD")
      : ""
    var branchName =
      searchData?.searchFeild === "Branch Name" ? searchData.search : ""
    const croName =
      searchData?.searchFeild === "CRO Name" ? searchData.search : ""

    var role = localStorage.getItem("role")

    if (role === "CO" || role === "BHO") {
      branchName = localStorage.getItem("branchName")
    }

    const response = await getMisReport(
      croName,
      branchName,
      status,
      appraisalId,
      fromDate,
      toDate
    )

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = `mis-report.xlsx`
    link.click()
  }

  const fetchData = async () => {
    setIsLoading(true)
    const status = searchData.status ?? ""
    const appraisalId =
      searchData?.searchFeild === "Appraisal ID" ? searchData.search : ""
    const fromDate = moment(searchData.fromDate).format("YYYY-MM-DD") ?? ""
    const toDate = moment(searchData.toDate).format("YYYY-MM-DD") ?? ""
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
            title={"Report And Summary"}
            breadcrumbItem={"MIS Report"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">MIS Report</CardTitle>
                  <p className="card-title-desc">
                    Management Information System report list.
                  </p>

                  {/* Advence search */}
                  <Search
                    searchTags={searchTags}
                    loading={isLoading}
                    onReset={setIsReset}
                    onSubmitSearch={setSearchData}
                    // status={searchStatus}
                    extraStatus={extraStatus}
                    isDateFilter={true}
                  />
                  {tableData?.totalPages > 0 &&
                    (searchData.search !== undefined ||
                      (searchData.fromDate !== undefined &&
                        searchData.toDate !== undefined)) && (
                      <div className="pb-2 d-flex justify-content-end align-items-center">
                        <button
                          onClick={exportToExcel}
                          type="button"
                          className="btn btn-success waves-effect waves-light"
                        >
                          <i className="dripicons-download pe-1"></i> Download
                        </button>
                      </div>
                    )}

                  <PaginatedTable
                    items={items}
                    setPage={setPage}
                    page={page}
                    totalPages={tableData?.totalPages ?? 0}
                    totalElements={tableData?.totalElements ?? 0}
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
