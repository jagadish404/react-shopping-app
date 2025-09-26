import { useSelector } from "react-redux";
import Product from "./Product";
import NoResults from "./NoResults";
import Header from "./Header";
import { RootState } from "@/store";

const CartPage = () => {
  const { entities: cartItems, count } = useSelector((state: RootState) => state.cart);

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
};

export default CartPage;
