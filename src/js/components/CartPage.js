import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Product from './Product';
import NoResults from './NoResults';
import { fetchProducts } from '../actions/productActions';

class CartPage extends Component {

	componentWillMount() {
		const { fetchAllProducts } = this.props;
		fetchAllProducts();
	}

	render() {
		const { productsList } = this.props;
		// productsList = productsList.filter(product => product.isAddedToCart);
		return (
			<div className="App-page">
				<div className="App-header">
					<Link to="/">
						<button type="button" className="App-button Cart-button">Browse</button>
					</Link>
				</div>
				<div className="App-body">
					<div className="Products-grid">
						{
							(productsList.length > 0)
								?	productsList.map((product, index) => (
									<Product key={`${product.brand}_${product.name}_${product.price}`} {...product} productIndex={index} />
								))
								: <NoResults content="No products added to cart!!!!!!!" />
						}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		productsList: state.productsData.cartItems
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchAllProducts: bindActionCreators(fetchProducts, dispatch)
	};
}

CartPage.propTypes = {
	fetchAllProducts: PropTypes.func.isRequired,
	productsList: PropTypes.arrayOf(PropTypes.shape({
		brand: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.string.isRequired
	})).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
