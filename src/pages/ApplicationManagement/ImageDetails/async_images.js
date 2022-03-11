import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

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

    useEffect(async () => {
        var _isMounted = true;
        if (props.src) {
            const response = await viewImage(props.src);

            var data = null;
            if (response != undefined && response != null) {
                data = `data:${response?.headers['content-type']};base64,${new Buffer(response?.data).toString('base64')}`;
            } 
            _isMounted && setdata(data);

            return () => {
                _isMounted = false;
            };
        }
    }, [data]);

    if (data) {
        return (
            <div className={props.className}>
                <img src={data} onClick={() => setisFits(true)} className="img-responsive" style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
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
        );
    }

    return null;
};

AsyncImage.propTypes = {
    src: PropTypes.string,
    className: PropTypes.string,
    category: PropTypes.string,
};

export default AsyncImage;