import './home.html';

Template.home.onCreated(function() {
  Meteor.subscribe('accounts');
});

Template.home.helpers({
  hasAccount() {
    return Accounts.find({'owner': Meteor.userId()}).count();
  }
});

Template.home.events({
  'click #at-signIn'() {
    window.location = '/login';
  },
  'click #home-plaid-link-account'(event, instance) {
    var handler = Plaid.create({
      apiVersion: 'v2',
      clientName: 'MyMorning.money',
      env: Meteor.settings.public.PLAID_ENV,
      product: ['transactions'],
      key: Meteor.settings.public.PLAID_PUBLIC_KEY,
      onSuccess: function(public_token) {
        Meteor.call('accounts.get_access_token', public_token, function(err, res) {
          if (err) {console.log(err); return;}
          Session.set('showRegisteredModal', true);
        });
      },
    });
    handler.open();
  }
});
