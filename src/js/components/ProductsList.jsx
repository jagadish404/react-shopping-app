import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Product from "./Product";
import NoResults from "./NoResults";

import "../../css/productsList.css";

import { fetchData, filterProductsBy } from "../reducers/productSlice";
import { selectFilter } from "../reducers/filterSlice";
import FilterSection from "./FilterSection";
import Header from "./Header";

class ProductsList extends Component {
  constructor() {
    super();
    this.updateFilter = this.updateFilter.bind(this);
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
    const {
      productsList,
      filtersSelected: { price: priceFilter, brand: brandFilter },
    } = this.props;
    console.log('productsList', productsList)

    if (priceFilter?.length === 0 && brandFilter?.length === 0) {
      return productsList;
    }

    return productsList.filter(({ brand, price }) => {
      const index = priceFilter.findIndex((value) => {
        const [minPrice, maxPrice] = value.split("-");
        return minPrice < price && price < maxPrice;
      });
      const includesPrice = priceFilter?.length > 0 && index !== -1;

      return (
        (priceFilter?.length === 0 || includesPrice) && (brandFilter?.length === 0 || brandFilter?.includes(brand))
      );
    });
  }

  render() {
    const { filtersSelected, filters, fetchStatus } = this.props;
    const filteredProducts = this.getFilteredProducts();
    console.log('fetchStatus', fetchStatus)

    return (
      <div className="App-page">
        <Header />
        <div className="App-body">
          <div className="Left-panel">
            <FilterSection filters={filters} filtersSelected={filtersSelected} onFilterChange={this.updateFilter} />
          </div>
          <div className="Right-panel">
            <h4>Products List</h4>
            {fetchStatus === "pending" && <div>Loading products..</div>}
            {fetchStatus === "fulfilled" && (
              <div className="Products-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <Product
                      key={`${product.brand}_${product.name}_${product.price}`}
                      product={product}
                      productIndex={index}
                    />
                  ))
                ) : (
                  <NoResults content="No products!" />
                )}
              </div>
            )}
            {fetchStatus === "failed" && <div>Error while fetching data!!</div>}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productsList: state.products.entities,
    fetchStatus: state.products.status,
    filters: state.filters.entities,
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
  productsList: PropTypes.arrayOf(
    PropTypes.shape({
      brand: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
  filtersSelected: PropTypes.shape({
    [PropTypes.string]: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.string.isRequired),
    })
  ).isRequired,
  fetchStatus: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
