import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { addItemToCart } from "../reducers/cartSlice";
import Header from "./Header";
import "../../css/productDetails.css";
import { RootState, useAppDispatch } from "@/store";

function ProductDetails() {
  const productsList = useSelector((state: RootState) => state.products.entities);
  const { productIndex: index } = useParams();

  if (index === undefined) {
    return <div>Product not found</div>;
  }

  const productIndex = parseInt(index);
  const dispatch = useAppDispatch();
  const productsData = productsList[productIndex];

  const addToCart = () => {
    dispatch(addItemToCart(productsList[productIndex]));
  };

  return (
    <div className="App-page">
      <Header />
      {productsData == void 0 ? (
        <div>Error fetching product details!</div>
      ) : (
        <div className="Product-details-wrapper">
          <div className="Product-name-detail">{productsData.name}</div>
          <div className="Product-row">
            <div className="Product-left-column">
              <img className="Product-icon-details" alt={productsData.image} src={`../assets/${productsData.image}`} />
            </div>
            <div className="Product-right-column">
              <div className="Product-measurement">{productsData.measurement}</div>
              <div className="Product-price">${productsData.price}</div>
              <div className="Product-desc">{productsData.desc}</div>
              <button type="button" className="Add-to-cart-button" onClick={addToCart}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
