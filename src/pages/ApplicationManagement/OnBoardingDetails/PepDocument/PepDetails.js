import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Row,
  Col,
} from "reactstrap";

import Loader from "components/Loader";

// APIs
import {
  getVerificationDetails
} from "services/on_board.service";

const PepDetails = () => {

  const { id } = useParams();
  const [msas, setMsas] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    var _isMounted = true;

    setLoading(true);
    const fetchData = async () => {
      const verificationResponse = await getVerificationDetails(id);

      if (_isMounted) {
        setMsas(verificationResponse?.msasDetailsDto);

        setLoading(false);
      }
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, []);

  return (
    <div className="p-3">
      <Loader loading={loading}>

        <Row>
          <div className="text-muted d-flex">
            <Col md={12}>
              <table className="table mb-4">
                <thead>
                  <tr>
                    <th>Date Of Birth</th>
                    <th>Occuptation</th>
                    <th>Address</th>
                    <th>Country</th>
                    <th>CNIC</th>
                    <th>Place  of Birth</th>
                    <th>Father Name/Husband Name</th>
                    <th>Entity</th>

                  </tr>
                </thead>
                <tbody>

                  {

                    msas?.objPepName != null && JSON.parse(msas?.objPepName).data?.map((pepNameObj, index) => {

                      return <tr key={index}>
                        <td>{pepNameObj.dateofbirth ? pepNameObj.dateofbirth : "-"}</td>
                        <td>{pepNameObj.occuptation ? pepNameObj.occuptation : "-"}</td>
                        <td>{pepNameObj.address ? pepNameObj.address : "-"}</td>
                        <td>{pepNameObj.country ? pepNameObj.country : "-"}</td>
                        <td>{pepNameObj.nicnumber ? pepNameObj.nicnumber : "-"}</td>
                        <td>{pepNameObj.placeofbirth ? pepNameObj.placeofbirth : "-"}</td>
                        <td>{pepNameObj.father ? pepNameObj.father : "-"}</td>
                        <td>{pepNameObj.entity ? pepNameObj.entity : "-"}</td>
                      </tr>

                    })}
                </tbody>
              </table>
            </Col>


          </div>
        </Row>
      </Loader>
    </div>
  );
}

export default PepDetails;