import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Product from "./Product";
import NoResults from "./NoResults";

import "../../css/productsList.css";

import { fetchData, filterProductsBy } from "../reducers/productReducer";
import { selectFilter } from "../reducers/filterReducer";
import FilterSection from "./FilterSection";

class ProductsList extends Component {
  constructor() {
    super();
    this.updateFilter = this.updateFilter.bind(this);
    this.getFilteredProducts = this.getFilteredProducts.bind(this);
  }

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  updateFilter(e) {
    const { selectFilter } = this.props;
    const [type, value] = e.target.getAttribute("data-filter").split("_");

    selectFilter({ type, value });
  }

  getFilteredProducts() {
    const { productsList, filtersSelected } = this.props;

    return productsList.filter(({brand, price}) => {
      const index = filtersSelected.findIndex(({type, value}) => {
        if (type === "price") {
          const [minPrice, maxPrice] = value.split("-");
          return minPrice < price && price < maxPrice;
        } else {
          return brand === value;
        }
      })

      return index !== -1;
    })
  }

  render() {
    const { filtersSelected, filters, productsList } = this.props;
    const filteredProducts = filtersSelected.length ? this.getFilteredProducts() : productsList;

    return (
      <div className="App-page">
        <div className="App-header">
          <div>
            <Link to="/CartPage">
              <button type="button" className="App-button Cart-button">
                Cart
              </button>
            </Link>
          </div>
        </div>
        <div className="App-body">
          <div className="Left-panel">
            <FilterSection filters={filters} filtersSelected={filtersSelected} onFilterChange={this.updateFilter} />
          </div>
          <div className="Products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <Product key={`${product.brand}_${product.name}_${product.price}`} {...product} productIndex={index} />
              ))
            ) : (
              <NoResults content="No results!!!!!!!" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productsList: state.products.productsList,
    filters: state.filters.items,
    filtersSelected: state.filters.selected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filterProductsBy: bindActionCreators(filterProductsBy, dispatch),
    fetchData: bindActionCreators(fetchData, dispatch),
    selectFilter: bindActionCreators(selectFilter, dispatch),
  };
}

ProductsList.propTypes = {
  // fetchAllProducts: PropTypes.func.isRequired,
  // updateFilters: PropTypes.func.isRequired,
  productsList: PropTypes.arrayOf(
    PropTypes.shape({
      brand: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
  filtersSelected: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.string.isRequired),
    })
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
