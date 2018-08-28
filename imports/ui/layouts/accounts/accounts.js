import './accounts.html';

Template.accounts.onCreated(function() {
  Meteor.subscribe('accounts');
  Meteor.subscribe('institutions');
});

Template.accounts.onRendered(function() {
  if (Session.get('showRegisteredModal')) {
    $('#registered-modal').modal('show').on('hide.bs.modal', function (e) {
      Session.set('showRegisteredModal', false);
    });
  }
});

Template.accounts.helpers({
  allAccounts() {
    return Accounts.find({'account_owner': Meteor.userId()}).fetch();
  },
  institution(item_id) {
    var institution = Institutions.findOne({'item_id': item_id});
    return institution && institution.institution && institution.institution.name;
  }
});

Template.accounts.events({
  'click #accounts-plaid-link-account'(event, instance) {
    event.preventDefault();
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
