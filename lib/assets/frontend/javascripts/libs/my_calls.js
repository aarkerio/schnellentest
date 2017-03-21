'use strict';

function removeAlert() {
  $(document).ready(function () {
    window.setTimeout(function() {
      $(".alert").fadeTo(1000, 0).slideUp(1000, function(){
        $(this).remove();
      });
    }, 4000);
  });
}

exports.removeAlert = removeAlert;

$(document).ready(function() {
	  //when save button is clicked
	  $('#save_ajax_button').click(function(){
      $('#ajax_div').toggle();
      send_annal('save');
	  });
    //when save button is clicked
	  $('#test_ajax_button').click(function(){
      $('#ajax_div').toggle();
      send_annal('test');
	  });
    //when save button is clicked
	  $('#export_ajax_button').click(function(){
      $('#ajax_div').toggle();
      send_annal('export');
	});
});

//function to check username availability
function send_annal(action){
  //get the username
	let text_area = $('#annal_json').val();
  let id        = $('#annal_id').val();
  let url       = '/annals/'+id;
  let method    = '';
  switch (action) {
    case 'save':
      method = 'PATCH'
      break;
    case 'test':
      method = 'POST';
      url = url + '/test';
      break;
    case 'export':
      method = 'POST';
      url = url + '/export';
  };
  $.ajax({
    beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
    },
    contentType: 'application/json',
    type: method,
    url: url,
    processData: false,
    dataType:'json',
    contentType :  'application/json',
    data: JSON.stringify({ annal: { json: text_area } }),
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function (data) {
        let json = JSON.stringify(data);
        console.log('data:  >>>> ' + JSON.stringify(data));
        $('#ajax_div').toggle();
        if (action != 'save') {
          $('#msg_div').text(json['status']);
        }

    },
    error: function (xhr) {
      console.log(' Error:  >>>> ' + JSON.stringify(xhr));
    }
  });
}
