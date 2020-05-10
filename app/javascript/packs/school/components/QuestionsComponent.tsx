import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HeaderComponent  from './HeaderComponent';
import { Alert, AlertContainer } from 'react-bs-notifier';
import * as TestsActionCreators from '../actions/tests';

interface ObjectLiteral {
  [key: string]: any
}

interface IPropTypes {
  routeParams: ObjectLiteral
  OneTestHashProp: ObjectLiteral
  QuestionsHashProp: ObjectLiteral
  dispatch: any
  router: any
}

// export for unconnected component (for mocha tests)
export class QuestionsComponent extends React.Component<IPropTypes, any> {

  public cookies: any;

  static propTypes = {
    OneTestHashProp:   PropTypes.object,
    QuestionsHashProp: PropTypes.object,
    dispatch:          PropTypes.func
  }

  constructor(props) {
    super(props);
    this.cookies = new Cookies();
    this.state = {
      questions:   [],
      test_id:     this.props.routeParams.test_id,
      showModal:   false,
      user_id:     0,    // not valid value
      question:    '',
      explanation: '',
      hint:        '',
      tags:        '',
      worth:       1,
      active:      true,
      qtype:       true,
      terms:       ''
    };

    this.openModal    = this.openModal.bind(this);
    this.newOrder     = this.newOrder.bind(this);
  }

  /**
   * Load test data and questions
   **/
  componentWillMount() {
    if ( ! this.props.OneTestHashProp.length ) {
      this.loadTest();
    }
  }

  toggle() {
    "this.state.showModal = false;"
  }

  loadTest() {
    let action = TestsActionCreators.fetchOneTest( this.props.routeParams.test_id );
    this.props.dispatch(action);
  }

  /**
   * Order tests method
   */
  orderList(field: number, order: string) {
    return field + order;
  }

  showAlert(message: string){
    <AlertContainer>
    <Alert type="info"> message </Alert>
    <Alert type="success">Oh, hai</Alert>
    </AlertContainer>
  }

  /**
   * Sends the data to create a new question
   **/
  handleSubmit(e) {
    e.preventDefault();

    let fields = {question: {
      user_id:     this.cookies.get('user_id'),
      question:    this.state.question,
      explanation: this.state.explanation,
      hint:        this.state.hint,
      tags:        this.state.tags,
      worth:       this.state.worth,
      active:      this.state.active,
      qtype:       this.state.qtype,
      test_id:     this.props.routeParams.test_id
    }};

    let isValid = this.validatesForm(fields);
    if ( !isValid['pass'] ) {
      console.log('Question not valid: ' + isValid['message']);
    }
    // save
    let action = TestsActionCreators.createQuestion(fields);
    this.props.dispatch(action);  // thunk middleware
    this.setState({showModal: false});
    this.clearForm();
    setTimeout(
      () => { this.loadTest(); },
      2000
    );
  }

  clearForm(){
    let change = {};
    let fields = { question: '',  explanation: '', hint: '', tags: '', worth: 1, active: true, qtype: true };
    Object.keys(fields).forEach(function(key) {
      change[key] = fields[key];
    });
    this.setState(change);
  }

  openModal(){
    this.setState({showModal: true});
  }

  closeModal(){
    this.setState({showModal: false});
    this.clearForm();
  }

  /* Validates form*/
  validatesForm(fields){
    let valid = {pass: true, message: 'Not message yet'};
    if ( !this.state.question.length ) {
      valid['question']  = false;
      valid['message']   = 'Question not valid';
    }

    return valid;
  }

  handleChange(name, event) {
    let change = {};
    change[name] = event.target.value;
    this.setState(change);
  }

  toggleCheckbox(name, event) {
    let obj = {};
    obj[name] = !this.state[name];
    this.setState(obj);
  }

  /**
   *  Delete Single Question
   *  Private
   */
  deleteQuestion(question_id: number) {
    let action = TestsActionCreators.deleteQuestion(question_id, this.state.test_id);
    this.props.dispatch(action);
    this.showAlert('Question removed succesfully');
    setTimeout(() => { this.loadTest(); }, 2000);
  }

  renderAnswersButton(type: string, id: number){
    if (type) {
      return (
        <div className="right_button">
          <Link to={"/answers/"+id+"/"+this.state.test_id+"/"}>
            <button type="button" className="btn btn-default btn-sm" title="Manage answers">Check</button>
          </Link>
        </div>
      );
    } else {
      return (
        <div>Open question</div>
      );
    }
  }

  newOrder(id: number, way: string){
    let action = TestsActionCreators.reorderQuestion(this.state.test_id, id, way);
    this.props.dispatch(action);
    this.showAlert('Question resorted succesfully');
    setTimeout(() => { this.loadTest(); }, 2000);
  }

  renderReorderButton(id, i, up){
    if (i == 0 && up){ return null}
    if (this.props.QuestionsHashProp.length == (i+1) && !up){ return null}
    let title = up ? 'up' : 'down';
    return (<div className="right_button">
      <button type="button" onClick={() => {this.newOrder(id, title);}} className="btn btn-default btn-sm" title={"Move question "+title}>
        {title}
      </button>
    </div>
    );
  }
  /**
   * Sends the data to create a new appointment
   **/
  submitSearch(e) {
    e.preventDefault();
    this.props.router.replace('/search/'+ this.state.test_id + '/' + this.state.terms);
  }

  render() {
    return (
      <div className="container_div">
        <HeaderComponent />
        <h1> {this.props.OneTestHashProp.title} </h1>
        <div>
          <button type="button" onClick={this.openModal} className="btn btn-default btn-sm" title="Frage hinzüfugen"> Add </button>
          <form>
            <label htmlFor="terms">Search:</label>
            <input className="form-control" name="terms" value={this.state.terms} onChange={this.handleChange.bind(this, 'terms')} />
            <Button onClick={this.submitSearch.bind(this)}>Search</Button>
          </form>
        </div>
        <div>
          {this.props.QuestionsHashProp.map((q, i) =>
            <div key={i} className="questions_div">
              <div><b>{i+1}.- Question</b>: {q.question} -- {q.id} </div>
              <div><b>Explanation</b>: {q.explanation}</div>
              <div><b>Hint</b>: {q.hint}</div>
              <div><b>Worth</b>: {q.worth}</div>
              <div><b>Active</b>: { q.active ? 'Enabled' : 'Disabled'} </div>
              <div><b>Type</b>: { q.qtype  ?  'Multiple Option' : 'Open question' } </div>
              <div className="right_button">
                <Link to={"/questionedit/"+q.id+"/"}>
                  <button type="button" className="btn btn-default btn-sm" title="Edit question">Edit </button>
                </Link>
              </div>

              { this.renderAnswersButton(q.qtype, q.id)  }
              { this.renderReorderButton(q.id, i, true)  }
              { this.renderReorderButton(q.id, i, false) }
              <div className="right_button">
                <button type="button" onClick={() => {if(confirm('Delete the question?')) {this.deleteQuestion(q.id)};}} className="btn btn-default btn-sm" title="Delete question">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
        { this.props.children }
        <div id="questionform" className="modal hide fade">
          <Modal isOpen={this.state.showModal} toggle={this.toggle} className="foo">
            <ModalHeader>Modal Überschrift  </ModalHeader>
            <ModalBody>
              <form>
                <label htmlFor="question">Question:</label>
                <input className="form-control" name="question" value={this.state.question} onChange={this.handleChange.bind(this, 'question')} />

                <label htmlFor="explanation">Explanation:</label>
                <textarea className="form-control" name="explanation" value={this.state.explanation} onChange={this.handleChange.bind(this, 'explanation')}  />

                <label htmlFor="hint">Hint:</label>
                <input className="form-control" name="hint" value={this.state.hint} onChange={this.handleChange.bind(this, 'hint')} />

                <label htmlFor="tags">Tags:</label>
                <input className="form-control" name="tags" value={this.state.tags} onChange={this.handleChange.bind(this, 'tags')} />

                <label htmlFor="worth">Worth:</label>
                <select className="form-control" name="worth" value={this.state.worth} onChange={this.handleChange.bind(this, 'worth')}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <div>
                  <label htmlFor="active">Active:</label>
                  <input type="checkbox" name="active" value={this.state.active} checked={this.state.active} onChange={this.toggleCheckbox.bind(this, 'active')} />
                </div>
                <div>
                  <label htmlFor="qtype">Multiple choice question:</label>
                  <input type="checkbox" name="qtype" value={this.state.qtype} checked={this.state.qtype} onChange={this.toggleCheckbox.bind(this, 'qtype')} />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.closeModal.bind(this)}>Cancel</Button>
              <Button onClick={this.handleSubmit.bind(this)}>Änderungen speichern</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    OneTestHashProp: state.rootReducer.tests_rdcr.OneTestHashProp,
    QuestionsHashProp: state.rootReducer.tests_rdcr.QuestionsHashProp
  };
};

export default withRouter(connect(mapStateToProps)(QuestionsComponent));
