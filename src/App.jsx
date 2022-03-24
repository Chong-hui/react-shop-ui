import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AuthOnly from "./pages/AuthOnly";
import ProtectedRoute from "./auth/ProtectedRoute";
import Checkout from "./pages/Checkout";
import CheckoutComplete from "./pages/CheckoutComplete";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route exact path="/">
          <Redirect to="/home" />
          <Home />
        </Route> */}
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/productlists">
            <ProductList />
          </Route>
          <Route exact path="/checkout" component={Checkout} />
          <Route path="/checkout/complete" component={CheckoutComplete} />
          <ProtectedRoute path="/authOnly" component={AuthOnly} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
