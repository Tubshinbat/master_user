import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// Components
import PageTitle from "../../Components/PageTitle";
import { useCookies } from "react-cookie";

// Actions
import { tokenCheck } from "../../redux/actions/tokenActions";
import { getMember } from "../../redux/actions/memberActions";

const Dashboard = (props) => {
  const init = () => {};
  const clear = () => {};

  const [cookies] = useCookies(["nodetoken", "language"]);

  useEffect(() => {
    if (cookies.nodetoken) {
      const token = cookies.nodetoken;
      props.checkToken(token);
    }
  }, cookies);

  // UseEffect's
  const [role, setRole] = useState("user");
  const [user, setUser] = useState(null);
  useEffect(() => {
    init();

    return () => {
      clear();
    };
  }, []);

  useEffect(() => {
    props.role && setRole(() => props.role);
  }, [props.role]);

  useEffect(() => {
    props.userId && props.getMember(props.userId);
  }, [props.userId]);

  useEffect(() => {
    console.log(props.user);
    props.user && setUser(props.user);
  }, [props.user]);

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Хянах самбар" />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {props.userId && (
                <div className="col-lg-3 col-6">
                  <a href={`/members/edit/${props.userId}`}>
                    <div className="count-box bg-info">
                      <div className="inner">
                        <h3></h3>
                        <p>Хувийн мэдээлэл засварлах</p>
                      </div>
                      <div className="icon">
                        <i className="fa fa-question"></i>
                      </div>
                    </div>
                  </a>
                </div>
              )}
              {role == "partner" && (
                <>
                  <div className="col-lg-3 col-6">
                    <a href={`/members`}>
                      <div className="count-box tile-green">
                        <div className="inner">
                          <h3></h3>
                          <p>Гишүүдийн мэдээлэл</p>
                        </div>
                        <div className="icon">
                          <i className="fa fa-users"></i>
                        </div>
                      </div>
                    </a>
                  </div>
                  {user.partner && (
                    <div className="col-lg-3 col-6">
                      <a href={`/partners/edit/${user.partner._id}`}>
                        <div className="count-box tile-green">
                          <div className="inner">
                            <h3></h3>
                            <p>Байгууллагын мэдээлэл</p>
                          </div>
                          <div className="icon">
                            <i className="fa fa-build"></i>
                          </div>
                        </div>
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.tokenReducer.role,
    userId: state.tokenReducer.userId,
    user: state.memberReducer.member,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    checkToken: (token) => dispatch(tokenCheck(token)),
    getMember: (id) => dispatch(getMember(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Dashboard);
