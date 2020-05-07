// Chipotle Software (c) 2016-2020
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class DataList extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: true,
                     childSelectValue: undefined,
                     getOptions: [],
                     url: '/appointments/get_data',
                     owner: '',
                     options: []
                 };
    }
    changeList(e) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>In changeList');
      var tmp = this.getData(e);
      this.forceUpdate();
    }
    getData(e) {
      e.preventDefault();
      ovalue = e.target.valu;e
      this.setState({owner: ovalue});
      link = {url: this.state.url, ovalue: ovalue};
      $.ajax({
        type: 'POST',
        data: link,
        url: this.state.url,
        headers: {'X-CSRFToken': Cookies.get('csrf-token')},
        cache: false,
        dataType: 'json',
        success: function(data) {
          if (data != undefined) {
            console.log( ">>>>>> 154 data >>>>>>>"+JSON.stringify(data));
            this.setOptions(data);
          }
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.state.url, status, err.toString());
        }.bind(this)
      });
    }
    setOptions(data) {
      var tempo = [];
      for (var i = 0; i < data.length; i++) {
        var option = data[i];
        var tmp = <option key={i} value={option.name} id={option.value}>{option.name}</option>;
        tempo.push(tmp);
     }
     console.log( ">>>>>> 51 TEMPO data >>>>>>>"+JSON.stringify(tempo.props));
     this.setState({options: tempo});
    }
    getDefaultProps() {
        return {
            value: ''
        };
    }
    changeHandler(e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value);
        }
    }
    render() {
        return (
          <span>
            <input type="text" onChange={this.changeList} list="slist" id="owner_id" name="owner_id" />
            <datalist id="slist">{this.state.options}</datalist>
          </span>
        );
    }
}

DataList.propTypes = {
  value:      PropTypes.string,
  onChange:   PropTypes.func
};

DataList.defaultProps = {
  apposArrayProp:  []
};

const mapStateToProps = (state) => {
  return {
    appo: state.rootReducer.appointments_rdcer.apposArrayProp
  };
}
;
export default connect(mapStateToProps)(DataListComponent);

