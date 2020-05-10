import Cookies from 'universal-cookie';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as testsActionCreators from '../actions/tests';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import history from '../libs/history';

class TestModalNewComponent extends React.Component<any, any> {
  static propTypes = {
    backdropStyle: PropTypes.string,
    dispatch:      PropTypes.func,
    cookies:       PropTypes.object,
    fade:          PropTypes.bool,
    backdropClassName: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = { showModal:   true,
                   user_id:     0,
                   description: 'Brief description',
                   tags:        'France, Revolution, History',
                   title:       'Some title',
                   active:      true,
                   shared:      false
                 };
    this.toggle = this.toggle.bind(this);
  }

/**
 * Sends the data to create a new test
 **/
  handleSubmit(e) {
    e.preventDefault();

    let fields = {
         user_id:     this.state.user_id,
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
    let action = testsActionCreators.createOrUpdateTest(fields, 'create');
    this.props.dispatch(action);  // thunk middleware
    window.location.href='/tests';
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
  render() {
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
  }
}

// binding React-Redux
export default connect()(TestModalNewComponent);
