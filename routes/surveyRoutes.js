const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = app => {
  app.get("/api/surveys/response", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, body, subject, recipients } = req.body;
    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(",").map(email => {
        return {
          email: email
        };
      }),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Great place to send mail
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer
      .send()
      .then(() => survey.save())
      .then(() => {
        req.user.credits -= 1;
        return req.user.save();
      })
      .then(user => {
        // console.log(user);
        res.send(user);
      })
      .catch(err => {
        console.log(err);
        res.status(422).send(err);
      });

    // const mailer = new Mailer(survey, surveyTemplate(survey));
    // await mailer.send();
    // await survey.save();
    // req.user.credits -= 1;
    // const user = await req.user.save();
    // res.send(user);
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    console.log(req.body);
    res.send({});
  });
};
