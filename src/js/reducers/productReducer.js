import {
	PRODUCT_LIST_RESPONSE, PRODUCT_ADDED_TO_CART, UPDATE_PRODUCT_FILTER
} from '../actions/productActions';

const initialState = {
	productsList: [],
	filters: [],
	filtersSelected: [],
	cartItems: []
};


export default function reducer(state = initialState, action) {
	switch (action.type) {
	case PRODUCT_LIST_RESPONSE: {
		return {
			...state,
			productsList: action.payload.products,
			filters: action.payload.filters,
			filtersSelected: action.payload.filtersSelected,
			cartItems: action.payload.cartItems
		};
	}
	case PRODUCT_ADDED_TO_CART: {
		return {
			...state,
			cartItems: action.payload
		};
	}
	case UPDATE_PRODUCT_FILTER: {
		return {
			...state,
			filtersSelected: action.payload
		};
	}
	default: {
		return {
			...state
		};
	}
	}
}
