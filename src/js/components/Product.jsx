import PropTypes from "prop-types";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../reducers/cartSlice";

import "../../css/productsList.css";

class Product extends Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    const { addItemToCart, product } = this.props;
    addItemToCart(product);
  }

  render() {
    const {
      productIndex,
      product: { image, name, price, count },
    } = this.props;

    return (
      <div className="Product-card">
        <Link to={`/ProductDetails/${productIndex}`}>
          <img data-testid="product-image" className="Product-icon" alt={image} src={`./assets/${image}`} />
        </Link>
        <span className="Product-name">{name}</span>
        <span className="Product-price">${price}</span>
        <button type="button" className="App-button Add-to-cart" onClick={this.addToCart}>
          Add To Cart {count > 0 ? `(${count})` : ""}
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    brand: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }),
  count: PropTypes.number,
  productIndex: PropTypes.number.isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

Product.defaultProps = {
  count: 0,
};

function mapDispatchToProps(dispatch) {
  return {
    addItemToCart: bindActionCreators(addItemToCart, dispatch),
  };
}

export default connect(undefined, mapDispatchToProps)(Product);
