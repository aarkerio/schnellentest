import Cookies from 'universal-cookie';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shallowEqual, useDispatch, useSelector  } from "react-redux";
import * as testsActionCreators from '../actions/tests';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import history from '../libs/history';

const TestModalNewComponent: React.FC<> = () => {

  /* Validates form*/
  const validatesForm = (fields) => {
    let valid = {pass: true, message: 'Not message yet'};
    //console.log(JSON.stringify(fields));

    if ( fields['title'] == 0 ) {
      valid['pass']    = false;
      valid['message'] = 'Title not valid';
    }

    return valid;
  };

  handleChange(name: string, event: any) {
    let change = {};
    change[name] = event.target.value;
    this.setState(change);
  }

  toggleCheckbox(name: string, event: any) {
    let change = {};
    change[name] = !this.state[name];
    this.setState(change);
  }

  toggle() {
    this.setState({
      modal: !this.state.showModal
    });
  }

  return (
          <div>
           <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
           <Modal isOpen={this.state.showModal} toggle={this.toggle} className="foo">
             <ModalHeader toggle={this.toggle}>Modal Überschrift</ModalHeader>
             <ModalBody>
               <form>
                 <label htmlFor="title">Title:</label>
                 <input className="form-control" name="title" value={this.state.title} onChange={this.handleChange.bind(this, 'title')} /  >

                 <label htmlFor="description">Bezeichnung:</label>
                 <input className="form-control" name="description" value={this.state.description} onChange={this.handleChange.bind(this, 'description')} /  >

                 <label htmlFor="tags">Tags:</label>
                 <input className="form-control" name="tags" value={this.state.tags} onChange={this.handleChange.bind(this, 'tags')} /  >

                 <label htmlFor="active">Active:</label>
                 <input type="checkbox" name="active" checked={this.state.active} onChange={this.toggleCheckbox.bind(this, 'active')} /  >

                 <label htmlFor="shared">Share this test with other teachers:</label>
                 <input type="checkbox" name="shared" checked={this.state.shared} onChange={this.toggleCheckbox.bind(this, 'shared')} />
               </form>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => history.push('/tests')}>Close</Button>
              <Button onClick={this.handleSubmit.bind(this)}>Änderungen speichern</Button>
            </ModalFooter>
        </Modal>
        </div>
      );
};

export default TestModalNewComponent;
