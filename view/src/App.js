import React, { Component } from "react";
import loadable from "@loadable/component";
import CompanyLogin from "./views/cdc/CompanyLogin";
import CompanyRegForm from "./views/cdc/CompanyRegForm";
import CompanyHome from "./views/cdc/CompanyHome";
import { BrowserRouter, Route, Switch } from "react-router-dom";
const Logout = loadable(() => import("./core/Logout"));
const Layout = loadable(() => import("./core/Layout"));
const FileNotFound = loadable(() => import("./core/FileNotFound"));

const loading = (
  <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only"> Please Wait, Loading... </span>{" "}
    </div>{" "}
  </div>
);
// Pages
const Login = loadable(() => import("./core/Login"));
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/company/register"
              name="Company register page"
              render={() => <CompanyRegForm />}
            />
            <Route
              exact
              path="/company/login"
              name="Company login page"
              render={() => <CompanyLogin />}
            />
            <Route
              path="/company/"
              name="Company home page"
              render={(props) => <CompanyHome {...props} />}
            />
            <Route
              exact
              path="/Logout"
              name="Logout Page"
              render={(props) => <Logout {...props} />}
            />
            <Route
              exact
              path="/"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <Layout {...props} />}
            />
            <Route path="*">
              <FileNotFound />
            </Route>{" "}
          </Switch>{" "}
        </React.Suspense>{" "}
      </BrowserRouter>
    );
  }
}

export default App;
