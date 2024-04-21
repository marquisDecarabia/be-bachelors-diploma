module.exports = {
  prompt: ({ prompter }) =>
    prompter.prompt({
      type: 'input',
      name: 'modulePath',
      message: 'Specify module direction',
    }),
};
