import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const itemsCount = useSelector((state) => state.cart.count);
  return (
    <div className="App-header">
      <h2 className="App-title">React Store</h2>
      <div>
        <Link to="/CartPage">
          <button type="button" className="App-button Cart-button" data-testid="cart-button">
            Cart ({itemsCount})
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
