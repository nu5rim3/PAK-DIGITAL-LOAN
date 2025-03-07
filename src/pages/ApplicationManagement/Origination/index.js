import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

// APIs
import {
  getAllFilteredAppraisals,
  getAllExceptionalFilteredAppraisals,
} from "services/origination.service"
import PaginatedTable from "components/Datatable/PaginatedTable"
import Search from "components/Search/Search"

const searchTags = [
  { key: "appraisalId", value: "Appraisal ID", type: "TEXT" },
  { key: "contractId", value: "Contract ID", type: "TEXT" },
  { key: "productName", value: "Product Name", type: "TEXT" },
  { key: "customerCnic", value: "Customer CNIC", type: "TEXT" },
  { key: "customerName", value: "Customer Name", type: "TEXT" },
  { key: "branchName", value: "Branch Name", type: "TEXT" },
  { key: "createdBy", value: "Created User", type: "TEXT" },
  // { key: "createdAt", value: "Created Date", type: "DATE" },
]

const extraStatus = [
  { label: "Approval Pending", value: "APPROVAL_PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Returned", value: "RETURNED" },
  { label: "Rejected", value: "REJECTED" },
]

const Origination = props => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [activeTab, setActiveTab] = useState("tab1")

  const SIZE = 7

  const [searchData, setSearchData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [tableData, setTableData] = useState([])
  const [searchTriggered, setSearchTriggered] = useState(false)

  const items = {
    columns: [
      {
        field: "idx",
        label: "Appraisal ID",
        sort: "asc",
      },

      {
        field: "contractNo",
        label: "Contarct ID",
        sort: "asc",
      },
      {
        field: "productName",
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
        field: "creationDate",
        label: "Created Date",
        sort: "asc",
      },
      {
        field: "branchDesc",
        label: "Branch Name",
        sort: "asc",
      },
      {
        field: "lastModifiedDate",
        label: "Last Modified Date",
        sort: "asc",
      },
      {
        field: "createdBy",
        label: "Created By",
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
    rows: data,
  }

  const getLabel = item => {
    item.customerCnic = item.identificationNumber
    item.customerName = item.fullName
    item.createdBy = item.createdBy
    item.lastModifiedDate = moment(item.lastModifiedDate).format(
      "yyyy-MM-DD | HH:mm:ss"
    )
    item.creationDate = moment(item.creationDate).format(
      "yyyy-MM-DD | HH:mm:ss"
    )
    item.isReturned = item.isReturned
    return item
  }

  const getAction = item => {
    item.actions = (
      <div className="d-flex align-items-center">
        <Link
          to={`/pakoman-digital-loan/credit-appraisals/view/${item.idx}`}
          className="btn btn-primary btn-sm d-flex justify-content-between align-items-center"
        >
          <i className="bx bx-zoom-in font-size-16 me-1"></i>
          <p className="m-0">Preview</p>
        </Link>
      </div>
    )

    return item
  }

  const getContractNo = item => {
    if (item.status === "A") {
      item.contractNo = JSON.parse(item.contractNo)?.object?.lchdContNo
    } else {
      item.contractNo = item.contractNo
    }

    return item
  }
  const getBackgroundColor = item => {
    if (item.isReturned === "Y") {
      item.idx = (
        <span className="font-size-12  badge bg-warning rounded-pill">
          {item.idx}
        </span>
      )
    } else {
      item.idx = <span>{item.idx}</span>
    }
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
          Pending
        </span>
      )
    } else if (item.status === "J") {
      item.status = (
        <span className="font-size-12  badge bg-danger rounded-pill">
          Rejected
        </span>
      )
    }
    return item
  }

  const modernization = item => {
    item = getLabel(item)
    item = getAction(item)
    item = getContractNo(item)
    item = getBackgroundColor(item)
    item = getStatus(item)
    return item
  }

  const fetchData = async () => {
    setIsLoading(true)
    const status = searchData.status ?? "APPROVAL_PENDING"
    const appraisalId =
      searchData?.searchFeild === "Appraisal ID" ? searchData.search : ""
    const fromDate = moment(searchData.fromDate).format("YYYY-MM-DD") ?? ""

    const toDate = moment(searchData.toDate).format("YYYY-MM-DD") ?? ""
    const contractId =
      searchData?.searchFeild === "Contract ID" ? searchData.search : ""
    const productName =
      searchData?.searchFeild === "Product Name" ? searchData.search : ""
    const customerName =
      searchData?.searchFeild === "Customer Name" ? searchData.search : ""
    const createdBy =
      searchData?.searchFeild === "Created User" ? searchData.search : ""
    const branchName =
      searchData?.searchFeild === "Branch Name" ? searchData.search : ""
    const customerCnic =
      searchData?.searchFeild === "Customer CNIC" ? searchData.search : ""

    let tableResponse = null

    if (activeTab === "tab1") {
      tableResponse = await getAllFilteredAppraisals(
        page,
        SIZE,
        branchName,
        status,
        appraisalId,
        fromDate,
        toDate,
        contractId,
        productName,
        customerName,
        createdBy,
        customerCnic
      )
    } else if (activeTab === "tab2") {
      tableResponse = await getAllExceptionalFilteredAppraisals(
        page,
        SIZE,
        branchName,
        status,
        appraisalId,
        fromDate,
        toDate,
        contractId,
        productName,
        customerName,
        createdBy,
        customerCnic
      )
    }

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
  }, [page, searchTriggered, activeTab])

  useEffect(() => {
    setTableData([])
    setData([])
  }, [activeTab])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={"Application Management"}
            breadcrumbItem={"Origination"}
          />
        </Container>

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "tab1"
                  ? "bg-primary text-white rounded-top active"
                  : ""
              }`}
              onClick={() => setActiveTab("tab1")}
            >
              General
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "tab2"
                  ? "bg-primary text-white rounded-top active"
                  : ""
              }`}
              onClick={() => setActiveTab("tab2")}
            >
              Exceptional
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "tab1" && (
            <div className="tab-pane fade show active">
              <Row>
                <Col className="col-12">
                  <Card>
                    <CardBody>
                      <CardTitle className="h4">
                        General Appraisal Origination
                      </CardTitle>
                      <p className="card-title-desc">
                        List of all general appraisals that are based on status.
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

                      <PaginatedTable
                        items={items}
                        setPage={setPage}
                        page={page}
                        totalPages={tableData?.totalPages ?? 0}
                        totalElements={tableData?.totalElements ?? 0}
                        isLoading={isLoading}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          {activeTab === "tab2" && (
            <div className="tab-pane fade show active">
              <Row>
                <Col className="col-12">
                  <Card>
                    <CardBody>
                      <CardTitle className="h4">
                        Exceptional Appraisal Origination
                      </CardTitle>
                      <p className="card-title-desc">
                        List of all exceptional appraisals that are based on
                        status.
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

                      <PaginatedTable
                        items={items}
                        setPage={setPage}
                        page={page}
                        totalPages={tableData?.totalPages ?? 0}
                        totalElements={tableData?.totalElements ?? 0}
                        isLoading={isLoading}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

Origination.propTypes = {
  t: PropTypes.any,
}

export default Origination
