// var PLAID_CLIENT_ID = Meteor.settings.private.PLAID_CLIENT_ID;
// var PLAID_SECRET = Meteor.settings.private.PLAID_SECRET;
// var PLAID_PUBLIC_KEY = Meteor.settings.private.PLAID_PUBLIC_KEY;
// var PLAID_ENV = Meteor.settings.private.PLAID_ENV;
//
// // We store the access_token in memory - in production, store it in a secure
// // persistent data store
// var ACCESS_TOKEN = null;
// var PUBLIC_TOKEN = null;
// var ITEM_ID = null;
//
// // Initialize the Plaid client
// var client = new plaid.Client(
//   PLAID_CLIENT_ID,
//   PLAID_SECRET,
//   PLAID_PUBLIC_KEY,
//   plaid.environments[PLAID_ENV]
// );
//
// Meteor.publish('/transactions', function(request, response, next) {
//   // Pull transactions for the Item for the last 30 days
//   var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
//   var endDate = moment().format('YYYY-MM-DD');
//   client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
//     count: 250,
//     offset: 0,
//   }, function(error, transactionsResponse) {
//     if (error != null) {
//       console.log(JSON.stringify(error));
//       return response.json({
//         error: error
//       });
//     }
//     console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');
//     return transactionsResponse;
//   });
// });
