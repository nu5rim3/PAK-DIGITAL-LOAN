import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FileViewer } from "react-file-viewer";
import {
  Row,
  Col,  
  Card,
  CardBody,
  Container
} from "reactstrap";

//Lightbox
import Lightbox from "react-image-lightbox-rotate-fixed";
import "react-image-lightbox/style.css";

// APIs
import {
    viewImage,
} from "services/images.service";

const AsyncImage = (props) => {

    const [data, setdata] = useState(null);
    const [isFits, setisFits] = useState(false);
    const [type, setType] = useState(null);

    useEffect(async () => {
        var _isMounted = true;
        if (props.src) {
            const response = await viewImage(props.src); 
            // console.log(response);
            
            var data = null;
            var contentType = null;
            if (response != undefined && response != null) {  
                
                contentType = `data:${response?.headers['content-type']}`;
                //console.log(contentType);

                if (contentType == "application/pdf") {
                    data = `${contentType};base64,${new Buffer(response?.data).toString('base64')}`;

                    var fileURL = URL.createObjectURL(data);
                    window.open(fileURL);

                    if (_isMounted) {
                        setdata(fileURL);
                        setType('pdf');
                    }
                } else {                
                    data = `${contentType};base64,${new Buffer(response?.data).toString('base64')}`;
                    _isMounted && setdata(data);
                }
            }            
            

            return () => {
                _isMounted = false;
            };
        }
    }, [data]);


    if (data && type == 'pdf') {
        return (                           
            <Container fluid>
                <Row>
                    <Col lg={12}>
                    <Card>
                        <CardBody>
                            <div key={1} className="document-wrapper">
                                { <FileViewer
                                fileType={type}
                                filePath={data}
                                />}
                            </div>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </Container>          
        )
    } else {
        return (                           
            <div className={props.className}>
                <img src={data} onClick={() => setisFits(true)} className="img-responsive" style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "fill",
                }}/>
                <p>{props.category}</p>
                {isFits ? (
                    <Lightbox
                        mainSrc={data}
                        enableZoom={true}
                        imageCaption={
                            props.category
                        }
                        onCloseRequest={() => {
                            setisFits(!isFits);
                        }}
                    />
                ) : null}
            </div>              
        )
    }

    return null;
};

AsyncImage.propTypes = {
    src: PropTypes.string,
    className: PropTypes.string,
    category: PropTypes.string,
};

export default AsyncImage;