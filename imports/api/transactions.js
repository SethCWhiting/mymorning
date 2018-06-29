var plaid = require('plaid');

Meteor.methods({
  'transactions.get_transactions'(owner) {
    var ACCESS_TOKEN = Accounts.findOne({"owner": owner});
    ACCESS_TOKEN = ACCESS_TOKEN.access_token;
    console.log(ACCESS_TOKEN);
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

    // Pull transactions for the Item for the last 30 days
    var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    var endDate = moment().format('YYYY-MM-DD');
    client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
      count: 250,
      offset: 0,
    }, Meteor.bindEnvironment(function(error, transactionsResponse) {
      if (error != null) {
        console.log(JSON.stringify(error));
        return error;
      }
      console.log(transactionsResponse.transactions);
      return transactionsResponse.transactions;
    }));
  }
});
