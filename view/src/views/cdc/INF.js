import React from "react";
import axios from "axios";
class INF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyID: props.location.companyID,
      responses: {},
      branches: {},
      cgpa: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBranch = this.handleChangeBranch.bind(this);
    this.handleChangeCgpa = this.handleChangeCgpa.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createBranchField = this.createBranchField.bind(this);
    this.createCgpaField = this.createCgpaField.bind(this);
  }

  async componentDidMount() {
    console.log(this.props.location.companyID);
    const config = {
      method: "post",
      url: `http://localhost:8000/api/cdc/getINF`,
      headers: {
        "Accepts": "application/json",
        "Content-Type": "application/json",
      },
      data: { companyID: this.props.location.companyID },
    };
    const res = await axios(config);
    console.log("INF received from backend");
    this.setState({ responses: res.data.responses });
    this.setState({ branches: res.data.branches });
    this.setState({ cgpa: res.data.cgpa });
  }

  handleChange(event) {
    let responses_copy = { ...this.state.responses };
    responses_copy[event.target.id] = event.target.value;
    this.setState({ responses: responses_copy });
  }

  handleChangeBranch(event) {
    let branches_copy = { ...this.state.branches };
    branches_copy[event.target.id] = event.target.checked;
    this.setState({ branches: branches_copy });
  }

  handleChangeCgpa(event) {
    //console.log(event.target.value);
    let cgpa_copy = { ...this.state.cgpa };
    cgpa_copy[event.target.id] = event.target.value===''?null:event.target.value;
    this.setState({ cgpa: cgpa_copy });
  }

  async makeRequest() {
    //console.log(this.state);
    const config = {
      method: "post",
      url: `http://localhost:8000/api/cdc/updateINF`,
      headers: {
        "Accepts": "application/json",
        "Content-Type": "application/json",
      },
      data: {
        companyID: this.state.companyID,
        responses: this.state.responses,
        branches: this.state.branches,
        cgpa: this.state.cgpa,
      },
    };

    await axios(config);
    //console.log(res.data);
  }

  handleSubmit(event) {
    alert("Changes submitted successfully");
    let responses_copy = { ...this.state.responses };
    responses_copy["submitted"] = true;
    this.setState({ responses: responses_copy }, () => {
      this.makeRequest();
    });
    event.preventDefault();
  }

  handleSave(event) {
    alert("Changes saved successfully");
    event.preventDefault();
    this.makeRequest();
  }

  createBranchField() {
    const branchNames = Object.keys(this.state.branches);
    const tableHeads = [
      <th className="th-sm">Branch name</th>,
      <th className="th-sm">Eligibility</th>,
    ];
    const tableData = branchNames.map((branch) => (
      <tr>
        <td>{branch}</td>
        <td>
          <input
            type="checkbox"
            defaultChecked={this.state.branches[branch]}
            data-toggle="toggle"
            id={branch}
            onChange={this.handleChangeBranch}
          />
        </td>
      </tr>
    ));
    const branchField = (
      <table
        className="table table-striped table-bordered table-sm"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>{tableHeads}</tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    );
    return branchField;
  }

  createCgpaField() {
    const courses = Object.keys(this.state.cgpa);
    const tableHeads = [
      <th className="th-sm">Course name</th>,
      <th className="th-sm">Minimum CGPA</th>,
    ];
    const tableData = courses.map((course) => (
      <tr>
        <td>{course}</td>
        <td>
          <input
            type="number"
            defaultValue={this.state.cgpa[course]}
            id={course}
            onChange={this.handleChangeCgpa}
          />
        </td>
      </tr>
    ));
    const cgpaField = (
      <table
        className="table table-striped table-bordered table-sm"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>{tableHeads}</tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    );
    return cgpaField;
  }

  render() {
    //console.log(this.state);
    let message ;
    if(this.state.responses.approved)
     message = <h5>This INF has been approved</h5>;
    else 
     message = <h5>This INF is pending approval from CDC, please check back later</h5>
    const displayFields = [
      "Name of the Company",
      "Category of the company",
      "Company Website",
      "Job designation",
      "Place of posting",
      "Eligible branches",
      "CGPA criteria",
      "Test procedure",
      "Salary"
    ];
    const fields = [
      "companyName",
      "companyCategory",
      "companyWebsite",
      "jobDesignation",
      "place",
      "branches",
      "cgpa",
      "test",
      "salary",
    ];
    const fieldTypes = [
      "text",
      "text",
      "email",
      "text",
      "text",
      "table",
      "table",
      "text",
      "number"
    ];
    const placeholders = [
      "Company name",
      "Company category",
      "Company website",
      "Enter the job designation",
      "Enter the place of posting",
      "Eligible branches",
      "CGPA criteria",
      "Describe the shortlisting procedure",
      "Provide details of CTC"
    ];

    const branchField = this.createBranchField();
    const cgpaField = this.createCgpaField();
    const infForm = displayFields.map((col, index) => {
      if (fields[index] === "branches") return <div>{branchField}</div>;
      else if (fields[index] === "cgpa") return <div>{cgpaField}</div>;
      else
        return (
          <div className="form-group">
            <label htmlFor={fields[index]}>{col}</label>
            <input
              type={fieldTypes[index]}
              className="form-control"
              id={fields[index]}
              placeholder={placeholders[index]}
              aria-describedby={
                fieldTypes[index] === "email" ? "emailHelp" : null
              }
              defaultValue={this.state.responses[fields[index]]}
              onChange={this.handleChange}
            />
          </div>
        );
    });
    const save = (
      <div className="form-group" onClick={this.handleSave}>
        <button type="submit" className="btn btn-primary btn-md btn-block">
          Save as draft
        </button>
      </div>
    );
    const submit = (
      <div className="form-group" onClick={this.handleSubmit}>
        <button type="submit" className="btn btn-primary btn-md btn-block">
          Submit
        </button>
      </div>
    );
    return (
      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
            <div className="card card-primary">
              <div className="card-header">
                <h5>Internship Notification Form</h5>
              </div>
              <div className="card-body">
                <form>
                  {infForm}
                  {!this.state.responses.submitted && save}
                  {!this.state.responses.submitted && submit}
                </form>
              </div>
            </div>
          </div>
        </div>
        {this.state.responses.submitted && message}
      </div>
    );
  }
}
export default INF;
