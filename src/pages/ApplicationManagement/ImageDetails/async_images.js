import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import './buttonPDF.css'

//Lightbox
import Lightbox from "react-image-lightbox-rotate-fixed";
import "react-image-lightbox/style.css";

// APIs
import { viewImageOrPDF } from "services/images.service";
import { fontSize } from "@material-ui/system";

const AsyncImage = (props) => {

    const [data, setData] = useState(null);
    const [isFits, setisFits] = useState(false);
    const [type, setType] = useState(null);

    const openPdf = () => {
        window.open(data)
    }

    useEffect(async () => {
        var _isMounted = true;
        if (props.src) {
            const response = await viewImageOrPDF(props.src);    
           
            
            var data = null;
            var contentType = null;
            if (response != undefined && response != null) {               
                
                contentType = `data:${response?.headers['content-type']}`;                               

                if (contentType == "data:application/pdf") {
                    
                    var fileURL = URL.createObjectURL(new Blob([response?.data], { type: 'application/pdf' }));
                                      
                    // console.log(fileURL);

                    if (_isMounted) {
                        setData(fileURL);                       
                        setType('pdf')
                    }
                } else {                
                    data = `${contentType};base64,${new Buffer(response?.data).toString('base64')}`;
                    _isMounted && setData(data);
                }
            }            
            

            return () => {
                _isMounted = false;
            };
        }
    }, [data]);


    if (data && type == 'pdf') {
        return (                           
            <div>               
                <button onClick={openPdf} className='button-wrapper'>                
                    <span><i className="lar la-file-pdf" style={{ margin: '0' }}></i></span> 
                    <p style={{fontSize:"1rem"}}>Open PDF</p>
                </button>
            </div>          
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