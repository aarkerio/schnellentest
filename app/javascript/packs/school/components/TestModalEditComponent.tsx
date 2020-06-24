import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector  } from "react-redux";
import * as testsActionCreators from '../actions/tests';
import { Button, Modal } from 'react-bootstrap';

const TestModalEditComponent: React.FC<> = () => {

  let rand = ()=> (Math.floor(Math.random() * 20) - 10);
    const modalStyle = { position: 'fixed', zIndex: 1040, top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#000', opacity: 0.5 };
    const backdropStyle = { ...modalStyle };

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
        <div id="responsive" className="modal hide fade" tabIndex={-1} >
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
             <input type="checkbox" name="active" checked={this.state.active} onChange={this.toggleCheckbox.bind(this, 'active')} />

             <label htmlFor="shared">Share:</label>
             <input type="checkbox" name="shared" checked={this.state.shared} onChange={this.toggleCheckbox.bind(this, 'shared')} />

            </form>
            </Modal.Body>
          <Modal.Footer>
             <Button onClick={() => window.location.href='/tests'}>Close</Button>
             <Button onClick={this.handleSubmit.bind(this)}>Änderungen speichern</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
};

export default TestModalEditComponent;

