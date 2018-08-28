Meteor.subscribe('tokens.ofUser', Meteor.userId());

Template.registerHelper('hasToken', () => {
  return Tokens.find().count() > 0;
});
