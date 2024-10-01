import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"

import { useForm, Controller } from "react-hook-form"

import Loader from "components/SyncLoader"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Table from "components/Datatable/Table"

// APIs
import { getAllCompletedAppraisals } from "services/origination.service"

const Origination = props => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
        label: "Created At",
        sort: "asc",
      },
      {
        field: "branchName",
        label: "Branch Name",
        sort: "asc",
      },
      {
        field: "createdBy",
        label: "Created By",
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

  const onSubmit = async data => {
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
    item.customerCnic = item.clienteles[0].identificationNumber
    item.customerName = item.clienteles[0].fullName
    item.createdBy = item.clienteles[0].createdBy
    item.creationDate = moment(item.lastModifiedDate).format(
      "DD-MM-yyyy HH:mm:ss"
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

  const modernization = item => {
    item = getLabel(item)
    item = getAction(item)
    item = getContractNo(item)
    item = getBackgroundColor(item)
    return item
  }

  const onReset = () => {
    setData([])
    reset()
  }

  useEffect(() => {
    var _isMounted = true

    const fetchData = async () => {}

    fetchData()

    return () => {
      _isMounted = false
    }
  }, [])

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
                  <p className="card-title-desc"></p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="my-4">
                      <Col className="col">
                        <div className="form-group row">
                          <div className="col-md-12">
                            <select
                              className="form-control"
                              name="status"
                              {...register("status", { required: true })}
                            >
                              <option value="">Select Status</option>
                              <option value="completed">Pending</option>
                              <option value="returned">Returned</option>
                              <option value="active">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                          {errors.status && (
                            <span className="error">
                              This field is required
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col className="col">
                        <div className="form-group row">
                          <div className="col-md-12">
                            <input
                              {...register("appraisalId", { required: false })}
                              className="form-control"
                              type="text"
                              name="appraisalId"
                              id="appraisalId"
                              placeholder="Appraisal ID"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col className="col">
                        <div className="form-group row">
                          <div className="col-md-12">
                            <Controller
                              name="fromDate"
                              id="fromDate"
                              control={control}
                              defaultValue={null}
                              rules={{
                                required: true,
                                message: "This field is required",
                              }}
                              render={({ field }) => (
                                <DatePicker
                                  className="form-control"
                                  placeholderText="Select From Date"
                                  onChange={date => field.onChange(date)}
                                  selected={field.value}
                                  dateFormat="yyyy-MM-dd"
                                  showYearDropdown
                                  showMonthDropdown
                                  scrollableMonthYearDropdown
                                  scrollableYearDropdown
                                  yearDropdownItemNumber={15}
                                />
                              )}
                            />
                          </div>
                          {errors.fromDate && (
                            <span className="error">
                              This field is required
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col className="col">
                        <div className="form-group row">
                          <div className="col-md-12">
                            <Controller
                              name="toDate"
                              id="toDate"
                              control={control}
                              defaultValue={null}
                              rules={{
                                required: true,
                                message: "This field is required",
                              }}
                              render={({ field }) => (
                                <DatePicker
                                  className="form-control"
                                  placeholderText="Select To Date"
                                  onChange={date => field.onChange(date)}
                                  selected={field.value}
                                  dateFormat="yyyy-MM-dd"
                                  showYearDropdown
                                  scrollableYearDropdown
                                  showMonthDropdown
                                  scrollableMonthYearDropdown
                                  yearDropdownItemNumber={15}
                                />
                              )}
                            />
                          </div>
                          {errors.toDate && (
                            <span className="error">
                              This field is required
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col className="col">
                        <div className="d-flex justify-content-start gap-2">
                          <button type="submit" className="btn btn-primary ">
                            <span className="d-flex">
                              <Loader loading={isLoading} />
                              {"  "}
                              <p className="m-0">Search</p>
                            </span>
                          </button>

                          <button
                            onClick={() => onReset()}
                            className="btn btn-danger "
                          >
                            <span className="d-flex">
                              <p className="m-0">Reset</p>
                            </span>
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </form>
                  <Table items={items} />
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
