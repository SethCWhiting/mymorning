SSR.compileTemplate('emailText', Assets.getText('mail.html'));

Meteor.methods({
  'renderEmails'() {
    var users = Meteor.users.find();
    users.forEach(function(user) {
      var to = user.emails[0].address;
      var from = 'MyMorning.money<seth@mymorning.money>';
      var subject = 'Your Daily Budget Insights';
      var date = moment().subtract(1, 'days').format('YYYY-MM-DD');
      var transactions = Transactions.find({
        "account_owner": user._id,
        "date": date
      });
      var html = SSR.render('emailText', {
        username: user.profile.username,
        time: new Date().toString(),
        transactions: transactions
      });
      Meteor.call('sendEmail', to, from, subject, html);
    });
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
