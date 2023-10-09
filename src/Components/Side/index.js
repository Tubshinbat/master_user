import axios from "../../axios-base";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import base from "../../base";

// Actions
import * as actions from "../../redux/actions/loginActions";

const Side = (props) => {
  const [role, setRole] = useState("operator");
  const [count, setCount] = useState(0);
  useEffect(() => {
    setRole(props.role);
  }, [props]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/orders/todaycount");
      if (result.data) {
        setCount(result.data.count);
      }
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" className="brand-link">
        <span className="brand-text font-weight-light"> Админ удирдлага</span>
      </a>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            {props.avatar ? (
              <img
                src={`${base.cdnUrl}150x150/${props.avatar}`}
                className="img-circle elevation-2"
                alt="User avatar"
              />
            ) : (
              <img
                src={`/assets/img/no-avatar.jpg`}
                className="img-circle elevation-2"
                alt="User "
              />
            )}
          </div>
          <div className="info">
            <a href="/" className="d-block">
              {props.name}
            </a>
            <div className="user-control">
              <a href="/logout" className="user-tools">
                <i className="fas fa-sign-out-alt"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column nav-legacy"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item ">
              <NavLink
                to="/"
                className="nav-link"
                exact
                activeClassName="active"
              >
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Хянах самбар</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.loginReducer.token,
    userId: state.tokenReducer.userId,
    name: state.tokenReducer.name,
    avatar: state.tokenReducer.avatar,
    role: state.loginReducer.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Side));
