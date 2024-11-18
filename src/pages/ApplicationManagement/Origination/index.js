import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"

import { useForm, Controller } from "react-hook-form"

import Loader from "components/SyncLoader"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Table from "components/Datatable/Table"

// APIs
import {
  getAllCompletedAppraisals,
  getAllFilteredAppraisals,
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
  { key: "createdAt", value: "Created Date", type: "DATE" },
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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm()

  const onSubmitFetchData = async data => {
    setIsLoading(true)
    const originationResponse = await getAllCompletedAppraisals({
      ...data,
      fromDate: moment(data.fromDate).format("YYYY-MM-DD"),
      toDate: moment(data.toDate).format("YYYY-MM-DD"),
    })
    if (originationResponse !== undefined && originationResponse !== null) {
      var data = originationResponse.map(item => modernization(item))

      setData(data)

      setIsLoading(false)
    }
  }

  const getLabel = item => {
    item.customerCnic = item.identificationNumber
    item.customerName = item.fullName
    item.createdBy = item.createdBy
    item.creationDate = moment(item.lastModifiedDate).format(
      "yyyy-MM-DD HH:mm:ss"
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
      item.status = "Approved"
    } else if (item.status === "R") {
      item.status = "Returned"
    } else if (item.status === "C") {
      item.status = "Pending"
    } else if (item.status === "J") {
      item.status = "Rejected"
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

  const onReset = () => {
    setData([])
    reset()
  }

  const fetchData = async () => {
    setIsLoading(true)
    const status = searchData.status ?? "APPROVAL_PENDING"
    const appraisalId =
      searchData?.searchFeild === "Appraisal ID" ? searchData.search : ""
    const fromDate =
      searchData?.searchFeild === "Created Date" ? searchData.fromDate : ""
    const toDate =
      searchData?.searchFeild === "Created Date" ? searchData.toDate : ""
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

    const tableResponse = await getAllFilteredAppraisals(
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
      createdBy
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
            title={"Application Management"}
            breadcrumbItem={"Origination"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Appraisal Origination</CardTitle>
                  <p className="card-title-desc">
                    List of all appraisals that are based on status.
                  </p>

                  {/* Advence search */}
                  <Search
                    searchTags={searchTags}
                    loading={isLoading}
                    onReset={setIsReset}
                    onSubmitSearch={setSearchData}
                    // status={searchStatus}
                    extraStatus={extraStatus}
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
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Origination.propTypes = {
  t: PropTypes.any,
}

export default Origination
