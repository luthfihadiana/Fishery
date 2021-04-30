import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import AddCommodity from "./pages/addCommodity";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="app__page-container">
          <div className="app__page">
            <Switch>
              <Route path="/tambah-komoditas">
                <AddCommodity />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
