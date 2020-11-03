import React from "react";
import { Link, withRouter } from "react-router-dom";
import Session from "react-session-api";
let photo = "";
const isActive = (path) => {
  if (window.location.pathname === path) {
    //  alert(window.location.pathname);
    return true;
  } else {
    return false;
  }
};
const Menu = (props) => (
  <div>
    {
      (photo = Session.get("photopath")
        ? Session.get("photopath")
        : "/assets/img/user.jpg")
    }
    <div className="main-sidebar sidebar-style-2">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <Link to="/company/home">
            {" "}
            <img
              alt="image"
              src={window.location.origin + "/logo.png"}
              className="header-logo"
            />{" "}
            <span className="logo-name">IIT(ISM)</span>
          </Link>
        </div>
        <div className="sidebar-user">
          <div className="sidebar-user-picture">
            <img alt="image" src={window.location.origin + photo} />
          </div>
          <div className="sidebar-user-details">
            <div className="user-name">{props.companyName}</div>
            <div className="user-role">{Session.get("company_name")}</div>
            <div className="sidebar-userpic-btn">
              <a href="profile.html" data-toggle="tooltip" title="Profile">
                <i data-feather="user"></i>
              </a>
              <a href="email_inbox.html" data-toggle="tooltip" title="Mail">
                <i data-feather="mail"></i>
              </a>
              <a href="chat.html" data-toggle="tooltip" title="Chat">
                <i data-feather="message-square"></i>
              </a>
              <Link to="/Logout" data-toggle="tooltip">
                <i data-feather="log-out"></i>
              </Link>
            </div>
          </div>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-header">Main</li>
          <li className={isActive("/home") ? "active dropdown" : "dropdown"}>
            <Link to="/home" className="nav-link">
              <i data-feather="monitor"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="dropdown">
            <a href="#" className="menu-toggle nav-link has-dropdown">
              <i data-feather="briefcase"></i>
              <span>Forms</span>
            </a>
            <ul className="dropdown-menu">
              <li className={isActive("/company/inf") ? "active" : ""}>
                <Link
                  className="nav-link"
                  to={{
                    pathname: "/company/inf",
                    companyID: props.companyID
                  }}
                >
                  <span>INF Form</span>
                </Link>
              </li>
              <li className={isActive("/company/jnf") ? "active" : ""}>
                <Link
                  className="nav-link"
                  to={{
                    pathname: "/company/jnf",
                    companyID: props.companyID
                  }}
                >
                  <span>JNF Form</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  </div>
);
export default withRouter(Menu);
