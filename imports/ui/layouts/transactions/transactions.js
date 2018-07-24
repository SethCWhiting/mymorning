import './transactions.html';

Template.transactions.onCreated(function() {
  Meteor.subscribe('transactions', Meteor.userId());
});

Template.transactions.onRendered(function() {
  if (!Transactions.find().count()) {
    Meteor.call('transactions.get_transactions', Meteor.userId(), function(err, res) {
      if (err) {console.log(err); return;}
    });
  }
});

Template.transactions.helpers({
  transactions: function() {
    return Transactions.find().fetch();
  }
});
