Meteor.publish('tokens', function() {
  return Tokens.find({});
});

Meteor.publish('tokens.ofUser', function(owner) {
  return Tokens.find({'owner': owner});
});
