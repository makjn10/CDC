import React, { Suspense, Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Session from "react-session-api";
// routes config
import routes from "../../Routes";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permitted : null
    };
  }
  componentDidMount() {
      this.setState({permitted : this.props.location.state.permitted});
  }

  render() {
    const welcome = (<h4>Welcome to IIT(ISM) Dhanbad</h4>);
    const message = (
        <div>
          <h5>Your registration is pending approval from CDC</h5>
          <h6> Please check back later to fill INF/JNF</h6>
        </div>
      );
    const formLinks = (<Switch>
    {" "}
    {routes.map((route, idx) => {
      //  console.log(route.name)
      return (
        route.component && (
          <Route
            key={idx}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={(props) => <route.component {...props} />}
          />
        )
      );
    })}
  </Switch>);
    const disp = this.state.permitted ? formLinks : message;
    return (
      <div>
        <div className="main-content">
        {welcome}
        <br></br>
            {disp}
          <section className="section"></section>
        </div>
      </div>
    );
  }
}
export default withRouter(Content);
