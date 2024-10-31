import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Badge,
  Button,
} from "reactstrap"

//APIs
import { getAllGoldsmiths } from "services/goldsmith.service"
import { getAllBranches } from "services/common.service"

import PaginatedTable from "components/Datatable/PaginatedTable"
import RegisterGoldSmith from "./RegisterGoldsmith"
import Breadcrumbs from "components/Common/Breadcrumb"
import UpdateGoldsmith from "./UpdateGoldsmith"
import Deactivate from "./DeactivateGoldsmith"
import ActivateGoldsmith from "./ActivateGoldsmith"
import Search from "components/Search/Search"

const searchTags = [
  { key: "branch", value: "Branch", type: "TEXT" },
  { key: "shop", value: "Shop", type: "TEXT" },
  { key: "owner", value: "Owner", type: "TEXT" },
  { key: "updatedDate", value: "Updated Date", type: "DATE" },
  { key: "status", value: "Status", type: "SELECT" },
]

const searchStatus = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
]

const IndexGoldSmith = props => {
  const [goldsmith, setGoldsmith] = useState([])
  const [isMounted, setIsMounted] = useState(false)
  const [searchData, setSearchData] = useState({})
  const [goldsmithTableData, setGoldsmithTableData] = useState([])
  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const [isDeactivate, setIsDecivate] = useState(false)
  const [isOpenActivate, setIsOpenActivate] = useState(false)
  const [data, setData] = useState(null)
  const [page, setPage] = useState(0)
  const SIZE = 7
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [searchTriggered, setSearchTriggered] = useState(false)

  const toggelCreateModal = () => {
    setIsOpenCreate(!isOpenCreate)
  }

  const toggelUpdateModal = data => {
    setData(data)
    setIsOpenUpdate(!isOpenUpdate)
  }

  const toggelDeactivateModal = data => {
    setData(data)
    setIsDecivate(!isDeactivate)
  }

  const toggelActivateModal = data => {
    setData(data)
    setIsOpenActivate(!isOpenActivate)
  }

  const getLabel = item => {
    item.branchName = item.branchName
    item.shopName = item.shopName
    item.ownerName = item.ownerName
    item.lastModifiedDate = item.lastModifiedDate
    if (item.goldsmithStatus === "A") {
      {
        item.goldsmithStatus = "ACTIVE"
      }
      return item
    } else {
      {
        item.goldsmithStatus = "INACTIVE"
      }
      return item
    }
  }

  const getActions = item => {
    if (item.goldsmithStatus === "ACTIVE") {
      item.actions = (
        <Row>
          <Col>
            <div className="d-flex">
              <button
                className="btn btn-warning btn-sm d-flex align-items-space-around m-1"
                onClick={() => toggelUpdateModal(item)}
              >
                <i className="bx bxs-edit font-size-18"></i>
                <p className="m-0">Update</p>
              </button>
            </div>
          </Col>
          <Col>
            <div className="d-flex">
              <button
                className="btn btn-danger btn-sm d-flex align-items-space-around m-1"
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
                className="btn btn-success btn-sm d-flex align-items-space-around m-1"
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
        field: "branchName",
        label: "Branch",
        sort: "asc",
      },

      {
        field: "shopName",
        label: "Shop Name",
        sort: "asc",
      },
      {
        field: "ownerName",
        label: "Owner Name",
        sort: "asc",
      },
      {
        field: "goldsmithStatus",
        label: "Status",
        sort: "asc",
      },
      {
        field: "lastModifiedDate",
        label: "Updated Date",
        sort: "asc",
      },
      {
        field: "actions",
        label: "Action",
        sort: "asc",
      },
    ],
    rows: goldsmith,
  }

  const modernization = item => {
    item = getLabel(item)
    item = getActions(item)
    return item
  }

  console.log("[searchData] - ", searchData)

  const fetchData = async () => {
    setIsMounted(true)
    setIsLoading(true)

    const shop = searchData?.searchFeild === "Shop" ? searchData.search : ""
    const owner = searchData?.searchFeild === "Owner" ? searchData.search : ""
    const branch = searchData?.searchFeild === "Branch" ? searchData.search : ""
    const fromDate =
      searchData?.searchFeild === "Updated Date" ? searchData.fromDate : ""
    const toDate =
      searchData?.searchFeild === "Updated Date" ? searchData.toDate : ""
    const status = searchData?.searchFeild === "Status" ? searchData.status : ""

    const goldsmithResponse = await getAllGoldsmiths(
      isReset ? 0 : page,
      SIZE,
      shop,
      owner,
      branch,
      fromDate,
      toDate,
      status
    )

    setGoldsmithTableData(goldsmithResponse)
    setIsLoading(false)
    setIsReset(false)
    setSearchTriggered(false)
    if (goldsmithResponse !== undefined) {
      var data = goldsmithResponse.content.map(item => modernization(item))
      setGoldsmith(data)
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
          <Breadcrumbs
            title={"Gold Loan Details"}
            breadcrumbItem={"Goldsmiths"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Goldsmiths</CardTitle>

                  <div className="d-flex justify-content-between mb-4">
                    <p className="card-title-desc">
                      Goldsmiths are jewellers who come to the branch to
                      evaluate gold assets.
                    </p>

                    <Button
                      color="primary"
                      size="sm"
                      className="d-flex justify-content-between align-items-center"
                      onClick={() => toggelCreateModal(true)}
                    >
                      <i className="bx bxs-plus-square font-size-16 me-1" />
                      <p className="m-0">Register Goldsmith</p>
                    </Button>
                  </div>
                  {/* advance search */}
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
                    totalPages={goldsmithTableData?.totalPages ?? 0}
                  />
                </CardBody>
              </Card>
            </Col>

            <RegisterGoldSmith
              toggel={toggelCreateModal}
              isOpen={isOpenCreate}
            />
            <UpdateGoldsmith
              toggel={toggelUpdateModal}
              isOpen={isOpenUpdate}
              data={data}
              onSuccessfulUpdate={() => console.log("Data Feteched")}
            />
            <Deactivate
              toggel={toggelDeactivateModal}
              isOpen={isDeactivate}
              data={data}
              onSuccessfulDeactivate={() => console.log("Data Feteched")}
            />
            <ActivateGoldsmith
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

export default IndexGoldSmith
