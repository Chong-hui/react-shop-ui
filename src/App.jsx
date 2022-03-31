import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute";
import Checkout from "./pages/Checkout";
import CheckoutComplete from "./pages/CheckoutComplete";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <ProtectedRoute path="/cart">
            <Cart />
          </ProtectedRoute>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/productlists">
            <ProductList />
          </Route>
          <ProtectedRoute exact path="/checkout" component={Checkout} />
          <ProtectedRoute path="/checkout/complete" component={CheckoutComplete} />
        </Switch>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
