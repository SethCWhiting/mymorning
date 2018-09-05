import './transactions.html';

Template.transactions.onCreated(function() {
  Meteor.subscribe('transactions', Meteor.userId());
  Meteor.subscribe('categories');
});

Template.transactions.onRendered(function() {
  if (!Transactions.find().count()) {
    Meteor.call('transactions.get_transactions', Meteor.userId(), function(err, res) {
      if (err) {console.log(err); return;}
    });
  }
});

Template.transactions.helpers({
  transactions: function() {
    return Transactions.find().fetch();
  },
  categories: function() {
    return Categories.find().fetch();
  },
  selected_id: function(outer_id, inner_id) {
    if (outer_id == inner_id) {
      return true;
    }
  },
  cleanCategory: function(array) {
    return array.join(' > ');
  }
});

Template.transactions.events({
  'change select'(e) {
    Session.set('selected_transaction', this.transaction_id);
    Session.set('selected_category', e.currentTarget.value);
    $('#category-modal').modal('show').on('hide.bs.modal', function (e) {
      Session.set('selected_transaction', null);
      Session.set('selected_category', null);
    });;
  }
});
