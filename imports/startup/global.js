Meteor.subscribe('tokens.ofUser', Meteor.userId());

Template.registerHelper('hasToken', () => {
  return Tokens.find().count() > 0;
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM/DD/YY');
});

Template.registerHelper('formatMoney', function(money) {
  if (money >= 0) {
    return '$' + money.toFixed(2);
  } else {
    return '-$' + (money * -1).toFixed(2);
  }
});
