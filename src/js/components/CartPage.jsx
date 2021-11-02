import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Product from "./Product";
import NoResults from "./NoResults";
import Header from "./Header";

function CartPage() {
  const { entities: cartItems, count } = useSelector((state) => state.cart);
  return (
    <div className="App-page">
      <Header />
      <div className="App-body">
        <div className="Right-panel">
          <h3>My Cart({count})</h3>
          <div className="Products-grid cart-page">
            {count > 0 ? (
              cartItems.map((product, index) => (
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
    </div>
  );
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

export default CartPage;
