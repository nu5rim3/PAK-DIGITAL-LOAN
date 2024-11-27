import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col } from "reactstrap"

// datatable related plugins
import { MDBDataTable } from "mdbreact"
import ReactPaginate from "react-paginate"

//Import Breadcrumb
import "./datatables.scss"

const PaginatedTable = ({
  totalPages,
  page,
  items,
  setPage,
  totalElements,
}) => {
  const handlePageClick = data => {
    let selected = data.selected
    setPage(selected)
  }

  const pagination = () => {
    return (
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages || 0}
        marginPagesDisplayed={2}
        pageRangeDisplayed={4}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName="active"
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        onPageChange={handlePageClick}
        forcePage={page}
      />
    )
  }

  return (
    <Row>
      <MDBDataTable
        responsive
        striped
        bordered
        noBottomColumns
        data={{
          columns: items?.columns,
          rows: items?.rows ?? [],
        }}
        paging={false}
        searching={false}
      />
      {/* {totalElements > 0 && ( */}
      <div className="d-flex justify-content-between">
        <span className="py-2">
          Showing Total Records - {totalElements ?? 0}{" "}
        </span>{" "}
        {pagination()}
      </div>
      {/* )} */}
    </Row>
  )
}

PaginatedTable.propTypes = {
  items: PropTypes.object,
  page: PropTypes.number,
  setPage: PropTypes.func,
  totalPages: PropTypes.number,
  totalElements: PropTypes.number,
}

export default PaginatedTable
