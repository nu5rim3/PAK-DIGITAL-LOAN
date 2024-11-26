import { useForm, Controller } from "react-hook-form"
import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, FormGroup, Button, Form } from "reactstrap"
import Loader from "components/SyncLoader"
import DatePicker from "react-datepicker"
import moment from "moment"

const Search = ({
  searchTags,
  loading,
  onSubmitSearch,
  onReset,
  status,
  extraStatus,
  isDateFilter,
}) => {
  const [searchType, setSearchType] = useState("TEXT")
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    if (searchType === "DATE") {
      delete data.search
      if (extraStatus === undefined) delete data.status
      onSubmitSearch({
        ...data,
        fromDate: moment(data.fromDate).format("YYYY-MM-DD") ?? "",
        toDate: moment(data.toDate).format("YYYY-MM-DD") ?? "",
      })
    } else if (searchType === "TEXT") {
      if (isDateFilter === undefined) {
        delete data.fromDate
        delete data.toDate
      }
      if (extraStatus === undefined) {
        delete data.status
      }
      onSubmitSearch(data)
    } else if (searchType === "SELECT") {
      delete data.fromDate
      delete data.toDate
      delete data.search
      onSubmitSearch(data)
    }
  }

  const searchTag = watch("searchFeild")
  const search = watch("search")

  function getTypeByValue(value) {
    const tag = searchTags.find(tag => tag.value === value)
    return tag ? tag.type : null
  }

  useEffect(() => {
    setSearchType(getTypeByValue(searchTag))

    return () => {
      setSearchType("TEXT")
    }
  }, [searchTag, search])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {extraStatus && extraStatus.length > 0 && (
          <Col className="col-2 pe-0">
            <FormGroup>
              <select className="form-select" {...register("status")}>
                {extraStatus.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </FormGroup>
          </Col>
        )}

        <Col className="col-2">
          <FormGroup>
            <select className="form-select" {...register("searchFeild")}>
              {searchTags.map((item, index) => (
                <option key={item.key}>{item.value}</option>
              ))}
            </select>
          </FormGroup>
        </Col>
        <Col className="col-3 p-0">
          <FormGroup>
            {searchType === "TEXT" && (
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                {...register("search")}
              />
            )}
            {searchType === "DATE" && (
              <Row>
                <Col className="pe-0">
                  <Controller
                    name="fromDate"
                    id="fromDate"
                    control={control}
                    defaultValue={""}
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
                </Col>
                <Col className="">
                  <Controller
                    name="toDate"
                    id="toDate"
                    control={control}
                    defaultValue={""}
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
                </Col>
              </Row>
            )}

            {searchType === "SELECT" && (
              <select className="form-select" {...register("status")}>
                {status.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            )}
          </FormGroup>
        </Col>
        {isDateFilter && (
          <Col className="col-3">
            <Row>
              <Col className="pe-0">
                <Controller
                  name="fromDate"
                  id="fromDate"
                  control={control}
                  defaultValue={""}
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
              </Col>
              <Col className="pe-0">
                <Controller
                  name="toDate"
                  id="toDate"
                  control={control}
                  defaultValue={""}
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
              </Col>
            </Row>
          </Col>
        )}

        <Col>
          <Button type="submit" color="primary">
            <Loader loading={loading} />
            {!loading && <i className="fas fa-search"></i>}
          </Button>
          <Button
            type="reset"
            color="danger"
            className="mx-1"
            onClick={() => {
              // console.log("[reset]")
              reset()
              onReset(true)
              onSubmitSearch({})
            }}
          >
            <i className="fas fa-sync " />
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

Search.propTypes = {
  searchTags: PropTypes.array,
  status: PropTypes.array,
  loading: PropTypes.bool,
  onSubmitSearch: PropTypes.func,
  onReset: PropTypes.func,
  extraStatus: PropTypes.array,
  isDateFilter: PropTypes.bool,
}

export default Search
