import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import Landing from "./Landing";

import Header from "./Header";
import Dashboard from "./Dashboard";
import SurveyNew from "./Surveys/SurveyNew";
// const Dashboard = () => <h2>Dashboard</h2>;
// const SurveyNew = () => <h2>SurveyNew</h2>;
// const Landing = () => <h2>Landing</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </Router>

        {/* <a href="/auth/google">Sign in with Google</a> */}
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }

export default connect(
  null,
  actions
)(App);
