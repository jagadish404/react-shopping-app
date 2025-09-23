import React, { PureComponent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsList from "./js/components/ProductsList";
import ProductDetails from "./js/components/ProductDetails";
import CartPage from "./js/components/CartPage";
import "./css/App.css";

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/ProductDetails/:productIndex" element={<ProductDetails />} />
            <Route path="/CartPage" element={<CartPage />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
