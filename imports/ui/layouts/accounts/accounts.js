import './accounts.html';

Template.accounts.onCreated(function() {
  Meteor.subscribe('accounts');
});

Template.accounts.helpers({
  accounts() {
    return Accounts.find({'owner': Meteor.userId()}).fetch();
  }
});

Template.accounts.events({
  'click button'(event, instance) {
    var handler = Plaid.create({
      apiVersion: 'v2',
      clientName: 'MyMorning.money',
      env: Meteor.settings.public.PLAID_ENV,
      product: ['transactions'],
      key: Meteor.settings.public.PLAID_PUBLIC_KEY,
      onSuccess: function(public_token) {
        Meteor.call('accounts.get_access_token', public_token, function(err, res) {
          if (err) {console.log(err); return;}
        });
      },
    });
    handler.open();
  }
});
