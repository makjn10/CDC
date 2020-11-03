import React from "react";
import Session from "react-session-api";
import Header from "../../core/Header";
import Sidenav from "./CompanyMenu";
import Content from "./CompanyContent";
import SettingBar from "../../core/settingBar";
import { Link } from "react-router-dom";
class Home extends React.Component {
  constructor(props)
  {
      super(props);
      this.state = {
          companyID : null,
          permitted : null,
          companyName: null,
      }
  }
  componentDidMount()
  {
      this.setState({companyID : this.props.location.state.companyID});
      this.setState({permitted : this.props.location.state.permitted});
      this.setState({companyName : this.props.location.state.companyName});
      console.log(this.state);
  }
  render() {
    console.log(this.state.companyName);
    return (
      <div>
          <Header/>
          <Sidenav companyID={this.state.companyID} companyName={this.state.companyName}/>
          <Content permitted={this.state.permitted}/>
          <SettingBar/>
      </div>
    );
  }
}

export default Home;
