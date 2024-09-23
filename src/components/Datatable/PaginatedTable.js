import PropTypes from "prop-types"
import React, { useState } from "react"
import { Row, Col } from "reactstrap"

// datatable related plugins
import { MDBDataTable } from "mdbreact"
import ReactPaginate from "react-paginate"

//Import Breadcrumb
import "./datatables.scss"

const PaginatedTable = props => {
  const handlePageClick = data => {
    let selected = data.selected
    props.setPage(selected)
  }

  const pagination = () => {
    return (
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={props.tableData?.totalPages || 0}
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
          columns: props.items.columns,
          rows: props.tableData.content,
        }}
        paging={false}
      />

      <div className="d-flex flex-row-reverse">{pagination()}</div>
    </Row>
  )
}

PaginatedTable.propTypes = {
  items: PropTypes.object,
  tableData: PropTypes.object,
  setPage: PropTypes.func,
}

export default PaginatedTable
