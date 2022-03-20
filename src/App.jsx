import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";

const App = () => {
  return(
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
      </Switch>
    </div>
  </Router>
  );
};

export default App;