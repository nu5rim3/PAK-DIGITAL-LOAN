import PropTypes from "prop-types";
import React, { useState } from "react";
import { Row, Col } from "reactstrap";

// datatable related plugins
import { MDBDataTable } from "mdbreact"
import ReactPaginate from 'react-paginate';

//Import Breadcrumb
import "./datatables.scss"

const Table = (props) => {

  const [page, setPage] = useState(0);

  const handlePageClick = (data) => {
    let selected = data.selected;
    setPage(0);
    setPage(selected);
    onLoadData(date, selected);
  }

  const pagination = () => {
    return (
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={page}
        marginPagesDisplayed={2}
        pageRangeDisplayed={4}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        activeClassName="active"
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
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
        data={props.items}
        paging={true}
      />

      <div className="d-flex flex-row-reverse">
        {/* {pagination()} */}
      </div>
    </Row>
  )
}

Table.propTypes = {
  items: PropTypes.object,
};

export default Table;
