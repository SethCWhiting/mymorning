import './category-modal.html';

Template.categoryModal.onCreated(function() {
  Meteor.subscribe('transactions', Meteor.userId());
  Meteor.subscribe('categories');
});

Template.categoryModal.helpers({
  selected_name: function() {
    var trans = Transactions.findOne({'transaction_id': Session.get('selected_transaction')});
    if (trans) {
      return trans.name;
    }
  },
  selected_category: function() {
    var cat = Categories.findOne({'category_id': Session.get('selected_category')});
    if (cat) {
      return cat.category.join(' > ');
    }
  }
});

Template.categoryModal.events({
  'click #change-this'() {
    Meteor.call('transactions.updateCategory', Session.get('selected_transaction'), Session.get('selected_category'), function(err, res) {
      if (err) {console.log(err);}
      $('#category-modal').modal('hide');
    });
  },
  'click #change-all'() {
    var name = Transactions.findOne({'transaction_id': Session.get('selected_transaction')}).name;
    Meteor.call('transactions.updateCategories', name, Session.get('selected_category'), function(err, res) {
      if (err) {console.log(err);}
      $('#category-modal').modal('hide');
    });
  }
});
