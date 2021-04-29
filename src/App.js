import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Header from "./components/header";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app__page-container">
          <div className="app__page">
            <Switch>
              <Route path="/">
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
