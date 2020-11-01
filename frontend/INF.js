import React from "react";
import axios from "axios";
class INF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyID: props.location.id,
      responses: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    //console.log(this.props.location.id);
    const config = {
      method: "post",
      url: `http://localhost:8000/api/getINF`,
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      data: { id: this.props.location.id },
    };
    const res = await axios(config);
    console.log(res.data.responses);
    this.setState({ responses: res.data.responses });
  }

  handleChange(event) {
    let responses_copy = { ...this.state.responses };
    responses_copy[event.target.id] = event.target.value;
    this.setState({ responses: responses_copy });
  }

  async makeRequest() {
    console.log(this.state);
    const config = {
      method: "post",
      url: `http://localhost:8000/api/updateINF`,
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      data: { id: this.state.companyID, responses: this.state.responses },
    };

    let res = await axios(config);
    console.log(res.data);
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

  render() {
    console.log(this.state);
    let fields = ["companyName", "companyWebsite", "companyType"];
    let names = ["Name of the company", "Company Website", "Company Type"];
    let output = fields.map((field, index) => (
      <div class="form-group">
        <label for={field}>{names[index]}</label>
        <input
          type="text"
          class="form-control"
          id={field}
          onChange={this.handleChange}
          defaultValue={this.state.responses[field]}
        />
      </div>
    ));
    const save = (
      <div class="form-group" onClick={this.handleSave}>
        <button type="submit" class="btn btn-primary btn-md btn-block">
          Save as draft
        </button>
      </div>
    );
    const submit = (
      <div class="form-group" onClick={this.handleSubmit}>
        <button type="submit" class="btn btn-primary btn-md btn-block">
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
                  {output}
                  {!this.state.responses.submitted && save}
                  {!this.state.responses.submitted && submit}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default INF;
