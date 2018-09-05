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
    console.log('this');
  },
  'click #change-all'() {
    console.log('all');
  }
});
