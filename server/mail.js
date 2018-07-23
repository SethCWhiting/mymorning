SSR.compileTemplate('emailText', Assets.getText('mail.html'));

Template.emailText.helpers({
  time: function() {
    return new Date().toString();
  },
  username: function() {
    return Meteor.user().profile.username;
  }
});

Meteor.methods({
  'renderEmail'() {
    var user = Meteor.user().emails[0].address;
    var seth = 'seth@mymorning.money';
    var subject = 'Your Daily Budget Insights';
    var html = SSR.render('emailText');
    console.log(html);
    Meteor.call('sendEmail', user, seth, subject, html);
  },
  'sendEmail'(to, from, subject, html) {
    // Make sure that all arguments are strings.
    check([to, from, subject, html], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    Email.send({ to, from, subject, html });
  }
});
