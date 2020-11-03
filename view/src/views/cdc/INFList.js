import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const $ = require("jquery");
$.DataTable = require("datatables.net");
class INFList extends React.Component {
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
    const config = {
      method: "get",
      url: `http://localhost:8000/api/cdc/getinflist`,
      headers: {
        "Accepts": "application/json",
        "Content-Type": "application/json",
      },
    };
    let res = await axios(config);
    //console.log(res.data.list);
    this.setState({ list: res.data.list });
    $(document).ready(function () {
      $("#infTable").DataTable({
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
        item.approved = event.target.checked;
        found = true;
        break;
      }
    }
    if (!found) {
      changes.push({
        companyID: event.target.id,
        approved: event.target.checked,
      });
    }
    this.setState({ changes: changes });
  }

  async handleSubmit() {
    alert("Approvals saved successfully");
    //console.log(this.state.changes);
    const config = {
      method: "post",
      url: `http://localhost:8000/api/cdc/updateinflist`,
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      data: this.state.changes,
    };
    await axios(config);
  }

  render() {
    //console.log(this.state);
    const columns = ["Name of the Company", "Approved status"];
    const fields = ["companyName", "companyID", "approved"];
    const tableHeads = columns.map((key) => <th className="th-sm">{key}</th>);
    const tableData = this.state.list.map((item) => (
      <tr>
        {fields.map((k) => {
          if (k === "companyID") return null;
          else if (k === "approved")
            return (
              <td>
                <input
                  type="checkbox"
                  defaultChecked={item.approved}
                  data-toggle="toggle"
                  id={item.companyID}
                  onChange={this.handleChange}
                />
              </td>
            );
          else
            return (
              <td>
                <Link to={{ pathname: "/inf", companyID: item.companyID }}>
                  {item[k]}
                </Link>
              </td>
            );
        })}
      </tr>
    ));
    return (
      <div>
        <table
          id="infTable"
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

export default INFList;
