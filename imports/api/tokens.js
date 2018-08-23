Meteor.publish('tokens', function() {
  return Tokens.find({});
});
