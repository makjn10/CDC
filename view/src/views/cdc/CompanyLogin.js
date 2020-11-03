import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  async authenticate() {
    //console.log(this.state);
    const config = {
      method: "post",
      url: `http://localhost:8000/api/cdc/login`,
      headers: {
        "Accepts": "application/json",
        "Content-Type": "application/json",
      },
      data: {
        loginEmail: this.state.loginEmail,
        password: this.state.password,
      },
    };

    let res = await axios(config);
    if (res.data.message === "Login successful") {
      this.setState({
        auth: (
          <Redirect
            push
            to={{
              pathname: "/company/home",
              state: { companyID: res.data.id, permitted: res.data.permitted,companyName : res.data.companyName }
            }}
          />
        ),
      });
    }
  }

  handleSubmit(event) {
    this.authenticate();
    event.preventDefault();
  }

  render() {
    return (
      <div className="container pt-5">
        {this.state.auth}
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <div className="card card-primary">
              <div className="card-header">
                <h5>Login</h5>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="loginEmail">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-md btn-block"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
