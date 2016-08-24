
var context = require.context('./', true, /__tests__\*.js$/);  //make sure you have your directory and regex test set correctly!

context.keys().forEach(context);
module.exports = context;



