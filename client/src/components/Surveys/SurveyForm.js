// SurveyForm shows a form for a user to add inputs

import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";

class SurveyForm extends Component {
  renderFields = () => {
    const FIELDS = [
      { label: "Survey Title", name: "Title" },
      { label: "Subject Line", name: "subject" },
      { label: "Email Body", name: "body" },
      { label: "Recipient List", name: "emails" }
    ];
    return FIELDS.map((field, index) => {
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
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {/* <Field type="text" name="surveyTitle" component="input" /> */}
          {this.renderFields()}

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyForm);
