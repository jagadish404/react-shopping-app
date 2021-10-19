import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../css/productDetails.css";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    const { addItemToCart, productsList } = this.props;
    const { productIndex } = this.props.match.params;
    addItemToCart(productsList[productIndex]);
  }

  render() {
    const { productIndex } = this.props.match.params;
    const { productsList } = this.props;
    const productsData = productsList[productIndex];
    if (productsData === void 0) return null;

    return (
      <div className="App-page">
        <div className="App-header">
          <Link to="/">
            <button type="button" className="App-button Browse-button">
              Browse
            </button>
          </Link>
          <Link to="/CartPage">
            <button type="button" className="App-button Cart-button">
              Cart
            </button>
          </Link>
        </div>
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
              <button type="button" className="Add-to-cart-button" onClick={this.addToCart}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productsList: state.productsData.productsList,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

ProductDetails.propTypes = {
  productIndex: PropTypes.number,
  productsList: PropTypes.arrayOf(
    PropTypes.shape({
      brand: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

ProductDetails.defaultProps = {
  productIndex: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
