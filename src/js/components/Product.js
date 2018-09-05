import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as productActions from '../actions/productActions';

import '../../css/productsList.css';

class Product extends Component {
	constructor() {
		super();
		this.addToCart = this.addToCart.bind(this);
	}

	addToCart() {
		const { addProductToCart, productsList, productIndex } = this.props;
		addProductToCart(productsList[productIndex]);
	}

	render() {
		const {
			productIndex, image, name, price, count
		} = this.props;

		return (
			<div className="Product-card">
				<Link to={`/ProductDetails/${productIndex}`}>
					<img className="Product-icon" alt={image} src={`./assets/${image}`} />
				</Link>
				<span className="Product-name">{name}</span>
				<span className="Product-price">${price}</span>
				<button type="button" className="App-button Add-to-cart" onClick={this.addToCart}>Add To Cart {count > 0 ? `(${count})` : ''}</button>
			</div>
		);
	}
}

Product.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	count: PropTypes.number,
	productIndex: PropTypes.number.isRequired,
	addProductToCart: PropTypes.func.isRequired,
	productsList: PropTypes.arrayOf(PropTypes.shape({
		brand: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.string.isRequired
	})).isRequired
};

Product.defaultProps = {
	count: 0
};

function mapStateToProps(state) {
	return {
		productsList: state.productsData.productsList
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addProductToCart: bindActionCreators(productActions.addProductToCart, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
