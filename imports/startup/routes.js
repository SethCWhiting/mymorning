import '/imports/ui/components/header/header.js';

import '/imports/ui/layouts/home/home.js';
import '/imports/ui/layouts/accounts/accounts.js';
import '/imports/ui/layouts/transactions/transactions.js';

Router.route('/', function () {
  if (Meteor.user()) {
    // TODO: if (!user.hasAccounts) redirect to accounts
    this.render('transactions', {
      data: function () {
        return Meteor.user();
      }
    });
  }
});

Router.route('/home/', {name: 'home'});
Router.route('/accounts/', {name: 'accounts'});
Router.route('/transactions/', {name: 'transactions'});

Router.onBeforeAction(function () {
  var current_route = Router.current().route.getName() ? Router.current().route.getName() : 'transactions';
  if (!Meteor.user()) {
    current_route = 'home';
    this.render('home');
  } else {
    this.next();
  }
  $('body').removeClass();
  $('body').addClass(current_route);
});
