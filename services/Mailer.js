const sendGrid = require("sendgrid");
const helper = sendGrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
  constructor(survey, content) {
    super();
    this.sgApi = sendGrid(keys.sendGridKey);
    this.from_email = new helper.Email("no-reply@email.com");
    this.subject = survey.subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(survey.recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(recipient => {
      return new helper.Email(recipient.email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });

    return this.sgApi
      .API(request)
      .then(res => {
        return res;
      })
      .catch(err => console.log(err));
  }
}
module.exports = Mailer;
