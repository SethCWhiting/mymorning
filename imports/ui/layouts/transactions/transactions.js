import './transactions.html';

Template.transactions.onCreated(function() {
  Meteor.subscribe('transactions', Meteor.userId());
});

Template.transactions.onRendered(function() {
  console.log(Transactions.find().fetch());
  if (!Transactions.find().count()) {
    Meteor.call('transactions.get_transactions', Meteor.userId(), function(err, res) {
      if (err) {console.log(err); return;}
    });
  }
  Meteor.call(
    'sendEmail',
    'Seth <sethcwhiting@gmail.com>',
    'seth@mymorning.money',
    'Hello from Meteor!',
    'This is a test of Email.send.'
  );

});

Template.transactions.helpers({
  transactions: function() {
    return Transactions.find().fetch();
  }
});
