import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
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

  async callAPI() {
    //console.log(this.state);
    const config = {
      method: "post",
      url: `http://localhost:8000/api/cdc/createReg`,
      headers: {
        "Accepts": "application/json",
        "Content-Type": "application/json",
      },
      data: this.state,
    };

    let res = await axios(config);
    //console.log(res.data);
    if (res.data === "Success") alert("Form submitted successfully");
    else alert("Error while submitting form, please try again later");
  }

  handleSubmit(event) {
    this.callAPI();
    this.props.history.push("/company/login");
    event.preventDefault();
  }

  render() {
    const displayHeadings = [
      "Name of the Company",
      "Company website",
      "Name",
      "Designation",
      "Contact number",
      "Email address",
      "Password",
    ];
    const fields = [
      "companyName",
      "companyWebsite",
      "contactName",
      "designation",
      "contactNumber",
      "contactEmail",
      "password",
    ];
    const fieldTypes = [
      "text",
      "email",
      "text",
      "text",
      "number",
      "email",
      "password",
    ];

    const placeholders = [
      "Company name",
      "Company website",
      "Enter your name",
      "Enter your designation",
      "Enter your contact number",
      "Enter email",
      "Password",
    ];

    const regForm = fields.map((field, index) => {
      return (
        <div className="form-group">
          <label htmlFor={field}>{displayHeadings[index]}</label>
          <input
            type={fieldTypes[index]}
            className="form-control"
            id={field}
            placeholder={placeholders[index]}
            aria-describedby={fieldTypes[index] === "email" ? "emailHelp" : null}
            onChange={this.handleChange}
          />
        </div>
      );
    });
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
                  {regForm}
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
export default withRouter(CompanyRegForm);
