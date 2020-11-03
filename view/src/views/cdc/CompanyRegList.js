import React from "react";
import axios from "axios";
const $ = require("jquery");
$.DataTable = require("datatables.net");
class CompanyRegList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      changes: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    //console.log(this.props.location.state.id);
    const config = {
      method: "get",
      url: `http://localhost:8000/api/cdc/getRegs`,
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
    };
    let res = await axios(config);
    //console.log(res.data.list);
    this.setState({ list: res.data.list });
    $(document).ready(function () {
      $("#regTable").DataTable({
        responsive: true,
      });
    });
  }

  handleChange(event) {
    let changes = this.state.changes.slice();
    let found = false;
    let item;
    for (item of changes) {
      if (item.id === event.target.id) {
        item.permitted = event.target.checked;
        found = true;
        break;
      }
    }
    if (!found) {
      changes.push({ id: event.target.id, permitted: event.target.checked });
    }
    this.setState({ changes: changes });
  }

  async handleSubmit() {
    //console.log(this.state.changes);
    const config = {
      method: "post",
      url: `http://localhost:8000/api/cdc/updateReg`,
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      data: this.state.changes,
    };
    let res = await axios(config);
    if (res.data === "Success") alert("Changes saved successfully");
    else alert("Error saving changes, please try again later");
  }

  render() {
    //console.log(this.state);
    const headings = [
      "Name of the Company",
      "Company website",
      "Name",
      "Designation",
      "Contact number",
      "Email address",
      "Permitted status",
    ];
    const fields = [
      "companyName",
      "companyWebsite",
      "contactName",
      "designation",
      "contactNumber",
      "contactEmail",
      "permitted",
    ];
    const tableHeads = headings.map((key) => <th className="th-sm">{key}</th>);
    const tableData = this.state.list.map((item) => (
      <tr>
        {fields.map((field) => {
          if (field === "permitted")
            return (
              <td>
                <input
                  type="checkbox"
                  defaultChecked={item.permitted}
                  data-toggle="toggle"
                  id={item.id}
                  onChange={this.handleChange}
                />
              </td>
            );
          else return <td>{item[field]}</td>;
        })}
      </tr>
    ));
    return (
      <div>
        <table
          id="regTable"
          className="table table-striped table-bordered table-sm"
          cellSpacing="0"
          width="100%"
        >
          <thead>
            <tr>{tableHeads}</tr>
          </thead>
          <tbody>{tableData}</tbody>
          <tfoot>
            <tr>{tableHeads}</tr>
          </tfoot>
        </table>
        <button
          type="submit"
          className="btn btn-primary btn-md btn-block"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default CompanyRegList;
