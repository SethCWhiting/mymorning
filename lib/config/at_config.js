AccountsTemplates.configure({
  confirmPassword: false,
  lowercaseUsername: true,
  focusFirstInput: true,
  showLabels: false,
  texts: {
    button: {
      signUp: "Create Account!"
    },
    title: {
      signUp: "",
    },
  },
});

AccountsTemplates.addField({
  _id: "username",
  type: "text",
  displayName: "username",
  required: true,
  minLength: 5,
});
