//router-test-helper
var Router = require('react-router'),
    Route = Router.Route,
    TestLocation = require('react-router/lib/locations/TestLocation');

module.exports = function(React){
    TestUtils = React.addons.TestUtils;
    return {
        getRouterComponent: function(targetComponent, mockProps) {
            var component,
                div = document.createElement('div'),
                routes = [
                    React.createFactory(Route)({
                        name: '/',
                        handler: targetComponent
                    })
                ];

            location = new TestLocation('/');
            Router.run(routes, location, function (Handler) {
                var mainComponent = React.render(React.createFactory(Handler)(mockProps), div);
                component = TestUtils.findRenderedComponentWithType(mainComponent, targetComponent);
            });
            return component;
        }
    };
};



