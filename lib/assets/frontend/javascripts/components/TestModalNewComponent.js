'use strict';
import cookie from 'react-cookie';
import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as testsActionCreators from '../actions/tests';
import { Button, Modal } from 'react-bootstrap';

import Moment from 'moment';

var Globalize = require('globalize');

class TestModalNewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal:      true, 
                   user_id:        0,    // not valid values 
                   description:    'Brief description',
                   tags:           '',
                   title:          'Some title', 
                   active:         true,
                   shared:         false
             };
  }

/**
 * Sends the data to create a new appointment
 **/
  handleSubmit(e) {
    e.preventDefault();

    let fields = {
         user_id:     cookie.load('user_id'),
         title:       this.state.title,
         description: this.state.description,
         tags:        this.state.tags, 
         active:      this.state.active,
         shared:      this.state.shared
    };
    
    let isValid = this.validatesForm(fields);

    if ( !isValid['pass'] ) {
      console.log('Field not valid: ' + isValid['message']);
    }
    let action = testsActionCreators.createTest(fields);
    this.props.dispatch(action);  // thunk middleware
    window.location='/tests';
  }

  /* Validates form*/
  validatesForm(fields){
    let valid = {pass: true, message: 'Not message yet'};
    //console.log(JSON.stringify(fields));

    if ( fields['title'] == 0 ) {
      valid['pass']    = false;
      valid['message'] = 'Title not valid';
    }

    return valid;    
  }

  handleChange(name, event) 
  {
    let change = {};
    change[name] = event.target.value;
    this.setState(change);
  }

  toggleCheckbox(name, event) {
    let change = !this.state[name];
    this.setState({name: change});
  }

  changeTitle(value) {
    this.setState({title: value['value']});
  }

  changeDescription(value) {
    this.setState({description: value['value']});
  }

  render() {
    let rand = ()=> (Math.floor(Math.random() * 20) - 10);
    const modalStyle = {  position: 'fixed',  zIndex: 1040,   top: 0, bottom: 0, left: 0, right: 0 };

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
        <Modal
          aria-labelledby='modal-label'
          backdropStyle={backdropStyle}
          show={this.state.showModal}
        >
          <Modal.Header>
             <Modal.Title> Modal Überschrift </Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <form>
             <label htmlFor="title">Title:</label>
             <input className="form-control" name="title" value={this.state.title} onChange={this.handleChange.bind(this, 'title')} />

             <label htmlFor="description">Bezeichnung:</label>
             <input className="form-control" name="description" value={this.state.description} onChange={this.handleChange.bind(this, 'description')} />

             <label htmlFor="tags">Tags:</label>
             <input className="form-control" name="tags" value={this.state.tags} onChange={this.handleChange.bind(this, 'tags')} />
          
             <label htmlFor="active">Active:</label>
             <input type="checkbox" name="active" defaultChecked={this.state.active} onChange={this.toggleCheckbox.bind(this, 'active')} />
             
             <label htmlFor="shared">Share:</label>
             <input type="checkbox" name="shared" defaultChecked={this.state.shared} onChange={this.toggleCheckbox.bind(this, 'shared')} />
             
            </form>
            </Modal.Body>
          <Modal.Footer>
             <Button onClick={() => browserHistory.push('/tests')}>Close</Button>
             <Button onClick={this.handleSubmit.bind(this)}>Änderungen speichern</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
};

TestModalNewComponent.propTypes = {
    backdropStyle: PropTypes.string,
    dispatch: PropTypes.func
};


// binding React-Redux
export default connect()(TestModalNewComponent);

