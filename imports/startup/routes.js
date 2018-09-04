import '/imports/ui/components/header/header.js';

import '/imports/ui/layouts/home/home.js';
import '/imports/ui/layouts/accounts/accounts.js';
import '/imports/ui/layouts/transactions/transactions.js';
import '/imports/ui/layouts/login/login.js';

import '/imports/ui/partials/registered-modal/registered-modal.js';
import '/imports/ui/partials/category-modal/category-modal.js';

Router.route('/', function () {
  this.render('home');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/logout', function () {
  Meteor.logout();
});

Router.route('/mail/', function () {
  Meteor.call('renderEmail');
});

Router.route('/home/', {name: 'home'});
Router.route('/accounts/', {name: 'accounts'});
Router.route('/transactions/', {name: 'transactions'});

Router.onBeforeAction(function () {
  var current_route = Router.current().route.getName() ? Router.current().route.getName() : 'home';
  if (!Meteor.user() && window.location.pathname != '/' && window.location.pathname != '/login') {
    window.location = '/';
  } else {
    this.next();
  }
  $('body').removeClass();
  $('body').addClass(current_route);
});
