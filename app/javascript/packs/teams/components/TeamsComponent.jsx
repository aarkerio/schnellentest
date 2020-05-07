import { connect } from 'react-redux';
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from 'react-dom';

import * as TeamsActionCreators from '../actions/calls';

class TeamsComponent extends React.Component{
  constructor(props) {
    super(props);
    if ( ! this.props.TeamsArrayProp.length ) {
      let action = TeamsActionCreators.fetchTeams();
      console.log("  ############  ACRION TCOM:  >>>> " + JSON.stringify(action));
      this.props.dispatch(action);
    }
  }

  render () {
    let rows = [];
     this.props.TeamsArrayProp.forEach(team => {
      rows.push("<p>Name: " + team.name + " Country:" + team.country + "</p>");
    });

    return (
      <div>
      { rows }
      </div>
    );
   }
}

TeamsComponent.propTypes = {
  TeamsArrayProp: PropTypes.array,
  dispatch:       PropTypes.func
};

TeamsComponent.defaultProps = {
    TeamsArrayProp:  []
};

const mapStateToProps = (state) => {
  return {
     TeamsArrayProp: state.rootReducer.teams_rdcr.TeamsArrayProp
  };
};

export default connect(mapStateToProps)(TeamsComponent);

