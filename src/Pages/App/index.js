import { useEffect } from "react";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useCookies, CookiesProvider } from "react-cookie";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";
import Cookies from "js-cookie";

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

// Import components
import Header from "../../Components/Header";
import Side from "../../Components/Side";

// Import page

//Faq
import Faq from "../Faq";
import FaqAdd from "../Faq/Add";
import FaqEdit from "../Faq/Edit";
//Gallery
import Gallery from "../Gallery";
import GalleryAdd from "../Gallery/Add";
import GalleryEdit from "../Gallery/Edit";

//MENU
import Menus from "../Menus";
import FooterMenu from "../Menus/footer";
//NEWS
import News from "../News";
import NewsAdd from "../News/Add";
import NewsEdit from "../News/Edit";
import NewsCategories from "../News/News_categories";

// Page
import PageAdd from "../Page/Add";
import PageEdit from "../Page/Edit";
import Page from "../Page";
//Partner
import Partner from "../Partner";
import PartnerAdd from "../Partner/Add";
import PartnerEdit from "../Partner/Edit";

//Services
import Service from "../Service";
import ServiceAdd from "../Service/Add";
import ServiceEdit from "../Service/Edit";

//User
import User from "../Users";
import UserAdd from "../Users/Add";
import UserEdit from "../Users/Edit";

// MEMBERS
import Member from "../Member";
import MemberAdd from "../Member/Add";
import MemberEdit from "../Member/Edit";
//Member categories
import MemberCategory from "../Member/Member_categories";
import MemberRates from "../MemberRate";

// WEBSETTINGS
import WebSettings from "../WebSettings";
import Socials from "../WebSettings/socials";
import Banner from "../WebSettings/banner";
import BannerAdd from "../WebSettings/banner/Add";
import BannerEdit from "../WebSettings/banner/Edit";
import Logout from "../Logout";
import LoginPage from "../Login";
import Dashboard from "../Dashboard";

// Actions
import { tokenCheck } from "../../redux/actions/tokenActions";

function App(props) {
  const validateMessages = {
    required: "Заавал бөглөнө үү!",
  };

  const [cookies] = useCookies(["nodetoken", "language"]);

  useEffect(() => {
    if (cookies.nodetoken) {
      const token = cookies.nodetoken;
      props.checkToken(token);
    }
  }, cookies);

  useEffect(() => {
    if (props.tokenError) {
      Cookies.remove("nodetoken");
      document.location.href = "/login";
    }
  }, props.tokenError);

  return (
    <>
      {cookies.nodetoken ? (
        <ConfigProvider form={{ validateMessages }}>
          <CookiesProvider>
            <Header />
            <Side />
            <Switch>
              <Route path="/" exact component={Dashboard} />
              // Partner
              <Route path={"/partners/edit/:id"} component={PartnerEdit} />
              //users
              <Route path="/members/add" exact component={MemberAdd} />
              <Route path="/members/edit/:id" exact component={MemberEdit} />
              <Route path="/members" exact component={Member} />
              // Member categories
              <Route path="/logout" component={Logout} />
              <Redirect to="/" />
            </Switch>
          </CookiesProvider>
        </ConfigProvider>
      ) : (
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Redirect to="/login" />
        </Switch>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tokenError: state.tokenReducer.error,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    checkToken: (token) => dispatch(tokenCheck(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
