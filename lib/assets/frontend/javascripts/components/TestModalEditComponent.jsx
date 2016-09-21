'use strict';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TestsActionCreators from '../actions/tests';
import { Button, Modal } from 'react-bootstrap';

var moment = require('moment');
var Globalize = require('globalize');

Globalize.load( 
   require("cldr-data/main/en/ca-gregorian.json"),
   require("cldr-data/main/en/numbers.json")
);

Globalize.locale('en');

var globalizeLocalizer = require('react-widgets/lib/localizers/globalize');
globalizeLocalizer(Globalize);

// import Moment from 'moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import Select from 'react-select';
require('react-select/less/default.less');
require('react-widgets/dist/css/react-widgets.css');

class TestModalEditComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal:      true, 
                   id:             0,
                   date:           moment(), 
                   pet_id:         0, 
                   owner_id:       0,
                   reminder:       false,
                   reason:         '', 
                   doctor_id:      0,
                   active:         true,
                   owner_name:     '',
                   pet_name:       '',
                   doc_name:       '',
                   owners_options: [],
                   pets_options:   [],
                   docs_options:   []
             };
  }

/**
  * Loads default data
  **/
  componentWilMount() {
    if ( ! this.props.oneTest.length ) {
      // let action = TestsActionCreators.updateForm(this.props.routeParams.id);
      // this.props.dispatch(action);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    let owner  = typeof nextProps.oneTest.appo !== typeof undefined ? true : false;
    if (owner == false)  { return; }   
    if ( nextProps.oneTest.appo.owner_id  !=  this.state.owner_id ) {
      let action = TestsActionCreators.updateForm(this.props.routeParams.id);
      this.props.dispatch(action);
      console.log('WWWW  NOT THE SAME nextPros  >>' + JSON.stringify(nextProps));
      this.setState({
                   id:        nextProps.oneTest.appo.id,
                   date:      moment(nextProps.oneTest.appo.date), 
                   pet_id:    nextProps.oneTest.appo.pet_id, 
                   owner_id:  nextProps.oneTest.appo.owner_id, 
                   reminder:  nextProps.oneTest.appo.reminder,
                   reason:    nextProps.oneTest.appo.reason, 
                   doctor_id: nextProps.oneTest.appo.doctor_id,
                   active:    nextProps.oneTest.appo.active,
                   owner_name:nextProps.oneTest.appo.owner_name,
                   pet_name:  nextProps.oneTest.appo.pet_name,
                   doc_name:  nextProps.oneTest.appo.doc_name,
                   owners_options: nextProps.oneTest.owners,
                   pets_options: nextProps.oneTest.pets,
                   docs_options: nextProps.oneTest.docs
                 });
    }
  }

/**
  * Send data to update appointment
 **/
  handleSubmit(e) {
    e.preventDefault();
    let fields = { id:        this.state.id,
                   date:      this.state.date, 
                   pet_id:    this.state.pet_id, 
                   owner_id:  this.state.owner_id, 
                   reminder:  this.state.reminder,
                   reason:    this.state.reason, 
                   doctor_id: this.state.doctor_id,
                   active:    this.state.active };
    let action = TestsActionCreators.updateTest(fields);
    this.props.dispatch(action);  // thunk middlew

    browserHistory.push('/appointments')
    // this.props.dispatch(createTest);
    console.log( ">>>>>> Sending data >>>>>>> " + JSON.stringify(fields));
  }

  handleChange(name, event) {
    let change = {};
    change[name] = event.target.value;
    this.setState(change);
  }

  handleClick(event) {
    let newvalue = this.state.ffreminder == true ? false : true;
    this.setState({reminder: newvalue});
  }

  getOwnersOptions(input, callback) {
    let self = this;
    setTimeout(function() {
        callback(null, {
            options: self.state.owners_options,
            // CAREFUL! Only set this to true when there are no more options,
            // or more specific queries will not be sent to the server.
            complete: true
        });
    }, 500);
  }
  
 /*
  * Load pets 
  */
  changeOwner(value) {
    this.setState({owner_id: value['value']});
    let action = TestsActionCreators.getPets(value['value'], true);
    this.props.dispatch(action);
  }

  getPetsOptions(input, callback) {
    let self = this;
    let action = TestsActionCreators.getPets(this.state.owner_id, true);
    this.props.dispatch(action);
    setTimeout(function() {
        callback(null, {
            options: self.state.pets_options,
            complete: true
        });
    }, 300);
  }

  changePet(value) {
    this.setState({pet_id: value['value']});
  }

  getDocsOptions(input, callback) {
    let self = this;
    let action = TestsActionCreators.getPets(this.state.doctor_id, true);
    this.props.dispatch(action);
    setTimeout(function() {
        callback(null, {
            options: self.state.docs_options,
            complete: true
        });
    }, 300);
  }

  changeDoc(value) {
    this.setState({doctor_id: value['value']});
  }
  render() {
    let rand = ()=> (Math.floor(Math.random() * 20) - 10);

    const modalStyle = {
      position: 'fixed',
      zIndex: 1040,
      top: 0, bottom: 0, left: 0, right: 0
    };

    const backdropStyle = {
      ...modalStyle,
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5
    };

    const dialogStyle = function() {
      let top = 50 + rand();
      let left = 50 + rand();

      return {
        position: 'absolute',
        width: 400,
        top: top + '%', left: left + '%',
        transform: `translate(-${top}%, -${left}%)`,
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20
      };
    };

    return (
        <div id="responsive" className="modal hide fade" tabIndex="-1" >
          <Modal aria-labelledby='modal-label'
            style={modalStyle}
            backdropStyle={backdropStyle}
            show={this.state.showModal}
          >
          <Modal.Header>
             <Modal.Title>Modal Überschrift  </Modal.Title>
          </Modal.Header>
            <Modal.Body>
           <form>        
             <label htmlFor="owner">Eigentümer:  </label>
             <Select name="owners" options={this.state.owners_options} value={this.state.owner_id} onChange={this.changeOwner.bind(this)} />
            
             <label htmlFor="pet">Kosename (haustier):</label>
				     <Select ref="petSelect" autofocus options={this.props.pets_options} name="selected-pet" value={this.state.pet_id} onChange={this.changePet.bind(this)} searchable={true} />


             <label htmlFor="doc_name">Doc:</label>
             <Select.Async name="docs" loadOptions={this.getDocsOptions.bind(this)} value={this.state.doctor_id} onChange={this.changeDoc.bind(this)} />

             <label htmlFor="reason">Vernunft:</label>
             <input className="form-control" name="reason" value={this.state.reason} onChange={this.handleChange.bind(this, 'reason')} />

             <label htmlFor="date">Datum:</label>
             <DateTimePicker value={new Date(this.state.date)} onChange={this.handleChange.bind(this, 'date')} />

             <label htmlFor="reminder">Erinner:</label>
             <input type="checkbox" name="reminder" checked={this.state.reminder} onChange={this.handleClick.bind(this, 'reminder')} />
            </form>
            </Modal.Body>
          <Modal.Footer>
             <Button onClick={() => browserHistory.push('/tests')}>Close</Button>
             <Button bsStyle="primary" onClick={this.handleSubmit.bind(this)}>Änderungen speichern</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
};

TestModalEditComponent.propTypes = {
    oneTest: PropTypes.any,
    dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
      oneTest: state.rootReducer.appo_rdcer.oneTest
  }
};

export default connect(mapStateToProps)(TestModalEditComponent);


