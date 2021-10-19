import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductsList from './js/components/ProductsList';
import ProductDetails from './js/components/ProductDetails';
import CartPage from './js/components/CartPage';
import './css/App.css';

class App extends PureComponent {
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route exact path="/" component={ProductsList} />
						<Route exact path="/ProductDetails/:productIndex" component={ProductDetails} />
						<Route exact path="/CartPage" component={CartPage} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
