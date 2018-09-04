import './category-modal.html';

Template.categoryModal.helpers({
  selected_name: function() {
    return Session.get('selected_name');
  },
  selected_category: function() {
    return Session.get('selected_category');
  }
});
