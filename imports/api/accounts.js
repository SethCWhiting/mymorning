var plaid = require('plaid');
var PLAID_CLIENT_ID = Meteor.settings.private.PLAID_CLIENT_ID;
var PLAID_SECRET = Meteor.settings.private.PLAID_SECRET;
var PLAID_PUBLIC_KEY = Meteor.settings.public.PLAID_PUBLIC_KEY;
var PLAID_ENV = Meteor.settings.public.PLAID_ENV;

var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);


Meteor.publish('accounts', function() {
  return Accounts.find({});
});

Meteor.methods({
  'accounts.get_access_token'(PUBLIC_TOKEN) {
    client.exchangePublicToken(PUBLIC_TOKEN, Meteor.bindEnvironment(function(error, tokenResponse) {
      if (error != null) {
        var msg = 'Could not exchange public_token!';
        console.log(msg + '\n' + JSON.stringify(error));
        return msg + '\n' + JSON.stringify(error);
      }
      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
      Tokens.insert({
        "owner": Meteor.userId(),
        "access_token": ACCESS_TOKEN,
        "item_id": ITEM_ID,
        "createdAt": new Date()
      });
      Meteor.call('accounts.get_account', ACCESS_TOKEN, function(err, res) {
        if (err) { console.log(err); return; }
      });
      return;
    }));
  },
  'accounts.get_account'() {
    client.getAuth(ACCESS_TOKEN, Meteor.bindEnvironment(function(error, authResponse) {
      if (error != null) {
        var msg = 'Unable to pull accounts from the Plaid API.';
        console.log(msg + '\n' + JSON.stringify(error));
        return;
      }
      Accounts.insert({
        "account_owner": Meteor.userId(),
        "accounts": authResponse.accounts,
        "item": authResponse.item,
        "numbers": authResponse.numbers,
        "createdAt": new Date()
      });
      Meteor.call('accounts.get_institution', authResponse.item.institution_id, function(err, res) {
        if (err) { console.log(err); return; }
      });
    }));
    return;
  },
  'accounts.get_institution'(institution_id) {
    console.log(institution_id);
    client.getInstitutionById(institution_id, Meteor.bindEnvironment(function(error, instRes) {
      if (error != null) {
        console.log(JSON.stringify(error));
        return;
      }
      Institutions.insert({
        "account_owner": Meteor.userId(),
        "institution": instRes.institution,
        "item_id": ITEM_ID,
        "createdAt": new Date()
      });
    }));
    return;
  }

});
