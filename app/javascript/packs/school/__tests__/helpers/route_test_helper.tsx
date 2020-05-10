// import { Router, Route, browserHistory, IndexRoute, withRouter } from 'react-router';
// import { Provider } from 'react-redux';
// import rootReducer from '../../reducers/index';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';

// const middlewares = [thunk]; // add your middlewares like `redux-thunk`

// const mockStore = configureStore(rootReducer);

// const initialState = {TestsArrayProp: [], OneTestArrayProp: {}, OneQuestionArrayProp: {}, AnswersArrayProp: [], QuestionsArrayProp:   [] };

// const store = mockStore(initialState);

// // const history  = syncHistoryWithStore(browserHistory, store);   // mix redux and route

// // const history = createMemoryHistory("/questions/1");

// // Setup routes configuration.
// // JSX would also work, but this way it's more convenient to specify custom route properties (excludes, localized labels, etc..).
// const routes = [{
//         path: "/tests/",
//         component: React.createClass({ render() { return <div>{this.props.children}</div>; }}),
//         childRoutes: [{
//              path: "/questions/:test_id",
//              component: React.createClass({
//                             // Render your component with contextual route props or anything else you need
//                             // If you need to test different combinations of properties, then setup a separate route configuration.
//                             render() { return <QuestionsComponent routes={this.props.routes} />; }
//              })
//         }]
// }];


