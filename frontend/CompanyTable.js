import React from "react";
import axios from "axios";
class CompanyList extends React.Component {
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
      url: `http://localhost:8000/api/getRegs`,
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
    };
    let res = await axios(config);
    console.log(res.data.list);
    this.setState({ list: res.data.list });
  }

  handleChange(event) {
    console.log(event.target.checked);
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
    console.log(this.state.changes);
    const config = {
      method: "post",
      url: `http://localhost:8000/api/updateReg`,
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      data: this.state.changes,
    };
    let res = await axios(config);
    alert("Changes saved successfully");
  }

  render() {
    console.log(this.state);
    const columns = [
      "Name",
      "Email address",
      "Designation",
      "Name of the Company",
      "Company website",
      "Contact number",
      "Permitted status",
    ];
    const fields = [
      "contactName",
      "contactEmail",
      "designation",
      "companyName",
      "companyWebsite",
      "contactNumber",
      "permitted"
    ];
    const tableHeads = columns.map((key) => <th class="th-sm">{key}</th>);
    const tableData = this.state.list.map((item) => (
      <tr>
        {fields.map((k) => {
          if (k == "permitted")
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
          else return <td>{item[k]}</td>;
        })}
      </tr>
    ));
    return (
      <div>
        <table
          id="dtBasicExample"
          class="table table-striped table-bordered table-sm"
          cellspacing="0"
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
          class="btn btn-primary btn-md btn-block"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default CompanyList;
