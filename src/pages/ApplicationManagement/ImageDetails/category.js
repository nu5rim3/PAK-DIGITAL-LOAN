import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
  CardTitle,
  Card,
  CardBody,
  CardText,
  Collapse,
  Table
} from "reactstrap";

import classnames from "classnames";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";

import AsyncImage from "./async_images";

const Category = (props) => {

  const [images, setImages] = useState([]);

  const removeUnderscore = (str) => {
    return str.replace(/_/g, " ");
  }

  const loadThumbnails = (images) => {
    return images.map((image, index) => {
      return <AsyncImage className="col-md-4 col-sm-6"
        key={index}
        src={image.hashIdentifier} 
        category={removeUnderscore(image.imgSubCategory)} />
    })
  }

  const renderCard = () => {
    var cardList = [];

    for (var i = 0; i < images.length; i++) {
      var card = <div key={i} className="row category-wrapper mb-5">
        <div className="img-category-header">
          <h6>{removeUnderscore(images[i].imgMasterCategory)}</h6>
        </div>
        {loadThumbnails(images[i].images)}
      </div>

      cardList.push(card);
    };

    return cardList;
  }

  useEffect(() => {
    var _isMounted = true;

    const fetchData = async () => {
      setImages(props.groups)
    };

    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [props.groups]);

  return (
    <Row>
      {renderCard()}
    </Row>
  );
}

Category.propTypes = {
  groups: PropTypes.array
};

export default Category;