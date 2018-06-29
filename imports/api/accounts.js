var plaid = require('plaid');

Meteor.methods({
  'accounts.get_access_token'(PUBLIC_TOKEN) {
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

    client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
      if (error != null) {
        var msg = 'Could not exchange public_token!';
        console.log(msg + '\n' + JSON.stringify(error));
        return msg + '\n' + JSON.stringify(error);
      }
      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
      console.log('Access Token: ' + ACCESS_TOKEN);
      console.log('Item ID: ' + ITEM_ID);
      return 'ACCESS_TOKEN';
    });
  }

});
