import './transactions.html';

Template.transactions.onCreated(function() {
  Meteor.call('transactions.get_transactions', Meteor.userId(), function(err, res) {
    if (err) {console.log(err); return;}
    console.log(res);
  });
});
