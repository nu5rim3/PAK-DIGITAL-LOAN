import { useForm } from "react-hook-form"
import PropTypes from "prop-types"
import React from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Badge,
} from "reactstrap"
import Loader from "components/SyncLoader"
const Search = props => {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = data => {
    props.setSearchData(data)
  }

  return (
    <Row className="my-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex">
          <Col className="col-1">
            <select className="form-select" {...register("searchFeild")}>
              {props.searchItems.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </Col>
          <Col className="col-4">
            <Row className="p-0">
              <Col className="pl-1">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  {...register("search")}
                />
              </Col>
              <Col className="p-0">
                <button type="submit" className="btn btn-primary">
                  <Row className="">
                    <Col>Search</Col>
                    {props.isLoading === true && (
                      <Col className="py-1">
                        <Loader loading={props.isLoading} />
                      </Col>
                    )}
                  </Row>
                </button>
                <button
                  type="submit"
                  className="btn btn-danger mx-1"
                  onClick={() => {
                    reset()
                    props.setRest(true)
                  }}
                >
                  Reset
                </button>
              </Col>
            </Row>
          </Col>
        </div>
      </form>
    </Row>
  )
}

Search.propTypes = {
  searchItems: PropTypes.array,
  setSearchData: PropTypes.func,
  isLoading: PropTypes.bool,
  setRest: PropTypes.func,
}

export default Search
