import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../reducers/cartSlice";

import "../../css/productsList.css";

// Define the product interface
interface ProductData {
  brand: string;
  name: string;
  price: string;
  image: string;
  desc?: string;
  measurement?: string;
  count?: number;
}

// Define the component props interface
interface ProductProps {
  product: ProductData;
  productIndex: number;
  count?: number;
}

const Product: React.FC<ProductProps> = ({ product, productIndex, count = 0 }) => {
  const dispatch = useDispatch();

  const { image, name, price } = product;

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="Product-card">
      <Link to={`/ProductDetails/${productIndex}`}>
        <img data-testid="product-image" className="Product-icon" alt={image} src={`./assets/${image}`} />
      </Link>
      <span className="Product-name">{name}</span>
      <span className="Product-price">${price}</span>
      <button type="button" className="App-button Add-to-cart" onClick={handleAddToCart}>
        Add To Cart {count > 0 ? `(${count})` : ""}
      </button>
    </div>
  );
};

export default Product;
export type { ProductData, ProductProps };
