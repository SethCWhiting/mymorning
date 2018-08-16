import '/imports/ui/components/header/header.js';

import '/imports/ui/layouts/home/home.js';
import '/imports/ui/layouts/accounts/accounts.js';
import '/imports/ui/layouts/transactions/transactions.js';

Router.route('/', function () {
  this.render('home');
});

Router.route('/mail/', function () {
  Meteor.call('renderEmail');
});

Router.route('/home/', {name: 'home'});
Router.route('/accounts/', {name: 'accounts'});
Router.route('/transactions/', {name: 'transactions'});

Router.onBeforeAction(function () {
  var current_route = Router.current().route.getName() ? Router.current().route.getName() : 'transactions';
  if (!Meteor.user() && window.location.pathname != '/') {
    window.location = '/';
  } else {
    this.next();
  }
  $('body').removeClass();
  $('body').addClass(current_route);
});
