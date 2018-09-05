import sourceData from '../../data/products.json';

export const PRODUCT_LIST_RESPONSE = 'PRODUCT_LIST_FULFILLED';
export const PRODUCT_SELECTED = 'PRODUCT_SELECTED_TO_VIEW';
export const PRODUCT_ADDED_TO_CART = 'ADD_TO_CART_SUCCESS';
export const UPDATE_PRODUCT_FILTER = 'CHANGE_PRODUCT_FILTERS';

function setLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
	if (localStorage.getItem(key) === void 0) return undefined;
	return JSON.parse(localStorage.getItem(key));
}

export function getFilteredProducts(productsList, filtersSelected) {
	return productsList.filter((product) => {
		const brandIndex = (filtersSelected.findIndex(filterData => (
			filterData.value === product.brand
		)));
		const priceIndex = (filtersSelected.findIndex((filterData) => {
			const [minPrice, maxPrice] = filterData.value.split('-');
			const { price } = product;
			return (parseFloat(price) >= parseFloat(minPrice)
		&& parseFloat(price) <= parseFloat(maxPrice));
		}));

		return (brandIndex === -1 && priceIndex === -1);
	});
}

export function fetchProducts() {
	return (dispatch) => {
		// Localstorage used to store filters selected and items in cart
		// in order to retain on page refresh
		if (getLocalStorage('filtersSelected') == void 0) {
			setLocalStorage('filtersSelected', []);
		}

		if (getLocalStorage('cartItems') == void 0) {
			setLocalStorage('cartItems', []);
		}

		const cartItems = getLocalStorage('cartItems');
		const filtersSelected = getLocalStorage('filtersSelected');
		dispatch({
			type: PRODUCT_LIST_RESPONSE,
			payload: { ...sourceData, cartItems, filtersSelected }
		});
	};
}

export function updateFilterData(filtersSelected, elem) {
	return (dispatch) => {
		const filterData = [...filtersSelected];
		const [type, value] = elem.id.split('_');
		const { checked } = elem;

		if (checked === false) {
			filterData.push({ type, value });
		} else {
			const index = filterData.findIndex(filter => (
				filter.type === type && filter.value === value
			));
			filterData.splice(index, 1);
		}

		setLocalStorage('filtersSelected', filterData);
		dispatch({ type: UPDATE_PRODUCT_FILTER, payload: filterData });
	};
}

export function addProductToCart(productData) {
	return (dispatch) => {
		const product = { ...productData };
		const cartItems = getLocalStorage('cartItems');
		const index = cartItems.findIndex(item => (
			product.name === item.name &&
			product.brand === item.brand &&
			product.measurement === item.measurement
		));

		if (index === -1) {
			product.count = 1;
			cartItems.push(product);
		} else {
			cartItems[index].count += 1;
		}

		setLocalStorage('cartItems', cartItems);
		dispatch({ type: PRODUCT_ADDED_TO_CART, payload: cartItems });
	};
}
