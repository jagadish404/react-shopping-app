import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { addItemToCart } from "../reducers/cartSlice";
import Header from "./Header";
import "../../css/productDetails.css";

function ProductDetails() {
  const productsList = useSelector((state) => state.products.entities);
  const { productIndex } = useParams();
  const dispatch = useDispatch();
  const productsData = productsList[productIndex];

  const addToCart = () => {
    dispatch(addItemToCart(productsList[productIndex]));
  };

  if (productsData == void 0) return null;
  return (
    <div className="App-page">
      <Header />
      <div className="Product-details-wrapper">
        <div className="Product-name-detail">{productsData.name}</div>
        <div className="Product-row">
          <div className="Product-left-column">
            <img className="Product-icon-details" alt={productsData.image} src={`../assets/${productsData.image}`} />
          </div>
          <div className="Product-right-column">
            <div className="Product-measurement">{productsData.measurement}</div>
            <div className="Product-price">${productsData.price}</div>
            <div className="Product-desc">{productsData.desc}</div>
            <button type="button" className="Add-to-cart-button" onClick={addToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  productIndex: PropTypes.number,
};

ProductDetails.defaultProps = {
  productIndex: 0,
};

export default ProductDetails;
