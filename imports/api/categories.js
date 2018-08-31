Meteor.publish('categories', function(id) {
  return Categories.find({});
});
