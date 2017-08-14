
    var testsContext = require.context("../../__tests__", false);

    var runnable = testsContext.keys();

    runnable.forEach(testsContext);
    