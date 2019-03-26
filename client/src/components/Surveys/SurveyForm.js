// SurveyForm shows a form for a user to add inputs

import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

// const FIELDS = [
//   {
//     label: "Survey Title",
//     name: "title",
//     noValueError: "Please provide survey title"
//   },
//   {
//     label: "Subject Line",
//     name: "subject",
//     noValueError: "Please provide subject"
//   },
//   {
//     label: "Email Body",
//     name: "body",
//     noValueError: "Please provide email body"
//   },
//   {
//     label: "Recipient List",
//     name: "emails",
//     noValueError: "Please provide recipient email"
//   }
// ];

class SurveyForm extends Component {
  renderFields = () => {
    return formFields.map((field, index) => {
      return (
        <div key={field.name}>
          <Field
            type="text"
            component={SurveyField}
            name={field.name}
            label={field.label}
          />
        </div>
      );
    });
    // <div>
    //   <Field
    //     type="text"
    //     name="Title"
    //     label="Survey Title"
    //     component={SurveyField}
    //   />
    //   <Field
    //     type="text"
    //     name="subject"
    //     label="Subject line"
    //     component={SurveyField}
    //   />

    //   <Field
    //     type="text"
    //     name="body"
    //     label="Email Body"
    //     component={SurveyField}
    //   />

    //   <Field
    //     type="text"
    //     name="emails"
    //     label="Recipient List"
    //     component={SurveyField}
    //   />
    // </div>
  };
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {/* <Field type="text" name="surveyTitle" component="input" /> */}
          {this.renderFields()}
          <Link className="red btn-flat white-text" to="/surveys">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  // if (!values.title) {
  //   errors.title = "You must provide a title";
  // }

  // if (!values.subject) {
  //   errors.subject = "You must provide a subject";
  // }

  // if (!values.body) {
  //   errors.body = "You must provide a body";
  // }

  errors.recipients = validateEmails(values.recipients || "");
  formFields.forEach((field, index) => {
    if (!values[field.name]) {
      errors[field.name] = field.noValueError;
    }
  });

  return errors;
};

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
