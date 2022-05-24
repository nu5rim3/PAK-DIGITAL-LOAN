import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
} from "reactstrap";

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

  useEffect(() => {
    var _isMounted = true;

    setIsLoading(true);

    const fetchData = async () => {
      if (props.active === "9") {

        const images = await getAllImages(appraisalId);

        const result = [...images.reduce((r, { imgMasterCategory, imgSubCategory, imgPath }) => {
          r.has(imgMasterCategory) || r.set(imgMasterCategory, {
            imgMasterCategory,
            images: []
          });

          r.get(imgMasterCategory).images.push({ imgSubCategory, imgPath });

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

  const exportAsPdf = (appraisalId) => {
    // setDownloading(true);
    const pdf = exportAsPdf(appraisalId)
    // .then((status) => {
    //   if (status) {
    //     setDownloading(false);
    //   }
    // })
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
        <button onClick={() => exportAsPdf(appraisalId)} className="btn btn-success w-md me-2">

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