Meteor.methods({
  'getUser'() {
    return Meteor.user();
  }
});
SyncedCron.add({
  name: 'Send Insights Email',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('at 6:00 am');
  },
  job: function() {
    var user = Meteor.call('getUser');
    var renderEmail = Meteor.call('renderEmails', user);
    return renderEmail;
  }
});

SyncedCron.start();
