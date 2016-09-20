// Chipotle Software (c) 2016  MIT License

class DataList extends Component {
  constructor(props) {
    super(props);
    this.state   = { showModal: true,
                     childSelectValue: undefined,
                     getOptions: [],
                     url: '/appointments/get_data',
                     owner: '',
                     options: []
      }
    },
  
    changeList: function(e) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>In changeList');
      var tmp = this.getData(e);
      this.forceUpdate();
    },
    getData: function(e) {
      e.preventDefault();
      ovalue = e.target.value
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
    },
    setOptions: function(data) {
      var tempo = [];
      for (var i = 0; i < data.length; i++) {
        var option = data[i];
        var tmp = <option key={i} value={option.name} id={option.value}>{option.name}</option>;
        tempo.push(tmp);
     }
     console.log( ">>>>>> 170 TEMPO data >>>>>>>"+JSON.stringify(tempo.props));
     this.setState({options: tempo});
    },
    getDefaultProps: function() {
        return {
            value: ''
        };
    },
    changeHandler: function(e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value);
        }
    },
    render: function() {
        return (
          <span>
            <input type="text" onChange={this.changeList} list="slist" id="owner_id" name="owner_id" />
            <datalist id="slist">{this.state.options}</datalist>
          </span>
        )
    }
}

DataList.propTypes: {
      value:      React.PropTypes.string,
      onChange:   React.PropTypes.func
    }

 DataList.defaultProps = {
      apposArrayProp:  []
 };

const mapStateToProps = (state) => {
  return {
    appo: state.rootReducer.appointments_rdcer.apposArrayProp
  }
};

export default connect(mapStateToProps)(DataListComponent);


