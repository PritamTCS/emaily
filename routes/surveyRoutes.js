const _ = require("lodash");
const Path = require("path-parser").default;
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const { URL } = require("url");

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
    // res.send({});
    const events = req.body.map(event => {
      const pathname = new URL(event.url).pathname;
      const p = new Path("/api/surveys/:surveyId/:choice");
      // console.log(p.test(pathname));
      const match = p.test(pathname);
      if (match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice
        };
      }
    });
    const compactEvents = _.compact(events);
    const UniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");
    console.log(UniqueEvents);
    res.send({});
  });
};
