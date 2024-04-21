module.exports = {
  prompt: ({ prompter }) =>
    prompter.prompt([
      {
        type: 'input',
        name: 'modulePath',
        message: 'Specify module direction',
      },
      {
        type: 'input',
        name: 'entityName',
        message: 'Specify entity name (kebab-case)',
      },
    ]),
};
