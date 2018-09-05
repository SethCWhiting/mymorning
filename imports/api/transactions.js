var plaid = require('plaid');

Meteor.publish('transactions', function(id) {
  return Transactions.find({'account_owner': id});
});

Meteor.methods({
  'transactions.get_transactions'(owner) {
    var tokens = Tokens.find({"owner": owner});
    tokens.forEach(function(account) {
      var ACCESS_TOKEN = account.access_token;
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
        transactionsResponse.transactions.forEach(function(transaction) {
          return Categories.update({
            "category_id": transaction.category_id
          }, {
            "category": transaction.category,
            "category_id": transaction.category_id,
            "createdAt": new Date()
          }, {
            "upsert": true
          });

          return Transactions.update({
            "transaction_id": transaction.transaction_id
          }, {
            "account_id": transaction.account_id,
            "account_owner": Meteor.userId(),
            "amount": transaction.amount,
            "category": transaction.category,
            "category_id": transaction.category_id,
            "date": transaction.date,
            "iso_currency_code": transaction.iso_currency_code,
            "location": {
              "address": transaction.location.address,
              "city": transaction.location.city,
              "lat": transaction.location.lat,
              "lon": transaction.location.lon,
              "state": transaction.location.state,
              "store_number": transaction.location.store_number,
              "zip": transaction.location.zip,
            },
            "name": transaction.name,
            "payment_meta": {
              "by_order_of": transaction.payment_meta.by_order_of,
              "payee": transaction.payment_meta.payee,
              "payer": transaction.payment_meta.payer,
              "payment_method": transaction.payment_meta.payment_method,
              "payment_processor": transaction.payment_meta.payment_processor,
              "ppd_id": transaction.payment_meta.ppd_id,
              "reason": transaction.payment_meta.reason,
              "reference_number": transaction.payment_meta.reference_number,
            },
            "pending": transaction.pending,
            "pending_transaction_id": transaction.pending_transaction_id,
            "transaction_id": transaction.transaction_id,
            "transaction_type": transaction.transaction_type,
            "unofficial_currency_code": transaction.unofficial_currency_code,
            "createdAt": new Date()
          }, {
            "upsert": true
          });
        });

      }));
    });
  },
  'transactions.daily'(owner) {
    var date = moment().subtract(1, 'days').format('YYYY-MM-DD');
    return Transactions.find({
      "account_owner": owner,
      "date": date
    });
  }
});
