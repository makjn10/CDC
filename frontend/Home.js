import React from "react";
import { Link } from "react-router-dom";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        permitted : false
    };
  }

  render() {
    return (
      <div>
        <div>Hello there</div>
        <Link to={{ pathname: "/inf", id: this.props.location.state.id }}>
          {this.props.location.state.permitted && <div>INF</div>}
        </Link>
        <Link to="/jnf">
          {this.props.location.state.permitted && <div>JNF</div>}
        </Link>
        <Link to="/login">
            <div>Logout</div>
        </Link>
      </div>
    );
  }
}

export default Home;
