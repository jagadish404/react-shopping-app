import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes, { element } from "prop-types";
import { Link } from "react-router-dom";

import Product from "./Product";
import NoResults from "./NoResults";

import "../../css/productsList.css";

import { fetchData, filterProductsBy } from "../reducers/productReducer";
import { selectFilter } from "../reducers/filterReducer";

class ProductsList extends Component {
  constructor() {
    super();
    this.state = {
      filters: [],
    };
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filters: nextProps.filters,
    });
  }

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  updateFilter(e) {
    const { selectFilter, filterProductsBy, filtersSelected } = this.props;
    const [type, value] = e.target.getAttribute("data-filter").split("_");
    const index = filtersSelected.findIndex((element) => element.type === type && element.value === value);

    if (index === -1) {
      filterProductsBy({ type, value });
    }
    selectFilter({ type, value });
  }

  render() {
    const { productsList, filtersSelected, filters } = this.props;
    const filteredProducts = productsList;

    console.log(`filtersSelected`, filters);
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
            <div>
              {this.state.filters.map((filter) => (
                <div className="Product-filters" key={filter.name}>
                  <div className="Product-filter-name">{filter.name}</div>
                  {filter.values.map((value) => (
                    <div className="Product-filter-value" key={`${filter.name}_${value}`}>
                      <input
                        type="checkbox"
                        data-filter={`${filter.name}_${value}`}
                        id={`${filter.name}_${value}`}
                        name={filter.name}
                        onChange={this.updateFilter}
                        checked={
                          filtersSelected.length &&
                          filtersSelected.findIndex(
                            (filterData) => filterData.type === filter.name && filterData.value === value
                          ) !== -1
                        }
                      />
                      <label htmlFor={`${filter.name}_${value}`}>{value}</label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
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
