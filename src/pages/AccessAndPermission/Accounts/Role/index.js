import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

// APIs
import { getfilterRoles } from "services/role.service"

import PaginatedTable from "components/Datatable/PaginatedTable"
import Search from "components/Search/Search"

const searchTags = [
  { key: "code", value: "Code", type: "TEXT" },
  { key: "description", value: "Description", type: "TEXT" },
  { key: "status", value: "Status", type: "SELECT" },
]

const searchStatus = [
  { label: "Active", value: "A" },
  { label: "Inactive", value: "I" },
]

const Role = props => {
  const [roles, setRoles] = useState([])
  const [page, setPage] = useState(0)

  const SIZE = 7

  const [searchData, setSearchData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [tableData, setTableData] = useState([])
  const [searchTriggered, setSearchTriggered] = useState(false)

  const modernization = item => {
    if (item.status === "A") {
      item.status = "Active"
      return item
    } else {
      item.status = "Inactive"
      return item
    }
  }

  const items = {
    columns: [
      {
        field: "code",
        label: "Code",
        sort: "asc",
      },
      {
        field: "description",
        label: "Description",
        sort: "asc",
      },
      {
        field: "status",
        label: "Status",
        sort: "asc",
      },
    ],
    rows: roles,
  }

  const fetchData = async () => {
    setIsLoading(true)
    const code = searchData?.searchFeild === "Code" ? searchData.search : ""
    const description =
      searchData?.searchFeild === "Description" ? searchData.search : ""
    const status = searchData?.searchFeild === "Status" ? searchData.status : ""

    const tableResponse = await getfilterRoles(
      status,
      code,
      description,
      page,
      SIZE
    )

    setTableData(tableResponse)
    setIsLoading(false)
    setSearchTriggered(false)
    if (tableResponse !== undefined) {
      var data = tableResponse.content?.map(item => modernization(item))
      setRoles(data)
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
          <Breadcrumbs title={"Access & Permission"} breadcrumbItem={"Roles"} />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Roles</CardTitle>
                  <p className="card-title-desc">
                    Role-based access control, also known as role-based
                    security, is a method of limiting system access to
                    authorized users.
                  </p>

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
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Role.propTypes = {
  t: PropTypes.any,
}

export default Role
