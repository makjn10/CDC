import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
class CompanyRegForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  async makeRequest() {
    console.log(this.state);
    const config = {
      method: "post",
      url: `http://localhost:8000/api/createReg`,
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      data: this.state,
    };

    let res = await axios(config);
    console.log(res.data);
  }

  handleSubmit(event) {
    alert("Form submitted successfully");
    this.makeRequest();
    this.props.history.push('/login'); 
    event.preventDefault();
  }

  render() {
    return (
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
            <div className="card card-primary">
              <div className="card-header">
                <h5>Register</h5>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group">
                    <label for="contactName">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="contactName"
                      placeholder="Enter your name"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="contactEmail">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="contactEmail"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="designation">Designation</label>
                    <input
                      type="text"
                      class="form-control"
                      id="designation"
                      placeholder="Enter your designation"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="companyName">Name of the Company</label>
                    <input
                      type="text"
                      class="form-control"
                      id="companyName"
                      placeholder="Company name"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="companyWebsite">Company website</label>
                    <input
                      type="text"
                      class="form-control"
                      id="companyWebsite"
                      placeholder="Company website"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="contactNumber">Contact number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="contactNumber"
                      placeholder="Enter your contact number"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group">
                  <button type="submit" class="btn btn-primary btn-md btn-block">Submit</button>
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
export default withRouter(CompanyRegForm);
