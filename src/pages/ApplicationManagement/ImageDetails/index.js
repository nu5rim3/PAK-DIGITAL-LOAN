import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
} from "reactstrap";
// import FileDownload from "js-file-download";
// Local Components
import Category from "./category";
import Loader from "components/Loader";
import {
  getAllImages, exportAsPdf
} from "services/images.service";

const ImageDetails = (props) => {

  const { appraisalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  const [data, setData] = useState(null);


  const download = () => {
    window.open(data);
  }


  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.active === "10") {

        const images = await getAllImages(appraisalId);

        const result = [...images.reduce((r, { imgMasterCategory, imgSubCategory, hashIdentifier }) => {
          r.has(imgMasterCategory) || r.set(imgMasterCategory, {
            imgMasterCategory,
            images: []
          });

          r.get(imgMasterCategory).images.push({ imgSubCategory, hashIdentifier });

          return r;
        }, new Map).values()];

        setGroups(result);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [props.active]);

  const exportToPdf = async (appraisalId) => {

    const response = await exportAsPdf(appraisalId)

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${appraisalId}.pdf`;
    link.click();
  }


  return (
    <Row>
      <Loader loading={isLoading} >
        <Col lg={12}>
          <div className="page-wrapper-context">
            <div className="mt-4">
              <Category groups={groups} />
            </div>
          </div>
        </Col>
      </Loader>
      <div className="form-group mt-3 d-flex justify-content-end align-items-center">
        <button onClick={() => exportToPdf(appraisalId)} className="btn btn-success w-md me-2">

          <i className="far fa-file-pdf font-size-16 me-2" />
          Export

        </button>
      </div>
    </Row>

  );
}

ImageDetails.propTypes = {
  active: PropTypes.string,
};

export default ImageDetails;