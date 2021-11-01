import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Product from "./Product";
import NoResults from "./NoResults";
import { fetchData } from "../reducers/productSlice";

class CartPage extends Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { productsList } = this.props;
    return (
      <div className="App-page">
        <div className="App-header">
          <Link to="/">
            <button type="button" className="App-button Cart-button">
              Browse
            </button>
          </Link>
        </div>
        <div className="App-body">
          <div className="Products-grid">
            {productsList.length > 0 ? (
              productsList.map((product, index) => (
                <Product
                  key={`${product.brand}_${product.name}_${product.price}`}
                  product={product}
                  productIndex={index}
                />
              ))
            ) : (
              <NoResults content="No products added to cart!" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productsList: state.cart.entities,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: bindActionCreators(fetchData, dispatch),
  };
}

CartPage.propTypes = {
  fetchData: PropTypes.func.isRequired,
  productsList: PropTypes.arrayOf(
    PropTypes.shape({
      brand: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
