import { Routes, Route } from "react-router-dom";
import ProductsList from "./js/components/ProductsList";
import ProductDetails from "./js/components/ProductDetails";
import CartPage from "./js/components/CartPage";
import Layout from "./js/components/Layout";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductsList />} />
        <Route path="/ProductDetails/:productIndex" element={<ProductDetails />} />
        <Route path="/CartPage" element={<CartPage />} />
      </Route>
    </Routes>
  );
};

export default App;
