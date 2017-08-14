
    var testsContext = require.context("../../__tests__/components", false);

    var runnable = testsContext.keys();

    runnable.forEach(testsContext);
    