import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Badge,
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
import Loader from "components/SyncLoader"
import Search from "components/Search/Search"

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
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)

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

  const fetchData = async () => {
    setIsMounted(true)
    setIsLoading(true)
    const shop = searchData?.searchFeild === "Shop" ? searchData.search : ""
    const owner = searchData?.searchFeild === "Owner" ? searchData.search : ""
    const branch = searchData?.searchFeild === "Branch" ? searchData.search : ""
    if (isReset) {
    }

    const goldsmithResponse = await getAllGoldsmiths(
      searchData.search === "" && isReset ? 0 : page,
      shop,
      owner,
      branch
    )

    setGoldsmithTableData(goldsmithResponse)
    setIsLoading(false)
    setIsReset(false)
    if (isMounted && goldsmithResponse !== undefined) {
      var data = goldsmithResponse.content.map(item => modernization(item))
      setGoldsmith(data)
    }
  }

  useEffect(() => {
    fetchData()

    return () => {
      setIsMounted(false)
    }
  }, [page, searchData, isReset])

  useEffect(() => {
    setPage(0)
  }, [isReset])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={"Gold Loan Details"}
            breadcrumbItem={"Goldsmith"}
          />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Registered Goldsmiths</CardTitle>

                  <div className="d-flex justify-content-between mb-4">
                    <p className="card-title-desc">
                      Here the all registered Goldsmith Details.
                    </p>

                    <button
                      className="btn btn-primary d-flex justify-content-between align-items-center"
                      onClick={() => toggelCreateModal(true)}
                    >
                      <i className="bx bxs-plus-square font-size-18 me-1"></i>
                      <p className="m-0">Register Goldsmith</p>
                    </button>
                  </div>

                  <Search
                    searchItems={["Branch", "Shop", "Owner"]}
                    setSearchData={setSearchData}
                    isLoading={isLoading}
                    setRest={setIsReset}
                  />
                  <PaginatedTable
                    items={items}
                    tableData={goldsmithTableData}
                    setPage={setPage}
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
