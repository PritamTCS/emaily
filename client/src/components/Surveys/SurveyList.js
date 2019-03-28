import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys = () => {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card blue-grey darken-1" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>

            <div className="card-action">
              {/* <button>Yes: {survey.yes}</button>
              <button>No: {survey.no}</button> */}
              <a href="#/">Yes: {survey.yes}</a>
              <a href="#/">No: {survey.no}</a>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    surveys: state.surveys
  };
};

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
