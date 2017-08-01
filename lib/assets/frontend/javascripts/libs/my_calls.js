'use strict'

function removeAlert() {
  $(document).ready(function () {
    window.setTimeout(function() {
      $(".alert").fadeTo(1000, 0).slideUp(1000, function(){
        $(this).remove();
      });
    }, 4000)
  })
}

exports.removeAlert = removeAlert

$(document).ready(function() {
	  //when save button is clicked
	  $('#save_ajax_button').click(function(){
      $('#ajax_div').toggle();
      send_annal('save');
	  });

    //Add JSON template
	  $('#add_question_select').click(function(){
      var zahlenwert =  $(this).val();
      console.log('this.props.: zahlenwert  >>>> ' + JSON.stringify(zahlenwert));
      insertText(zahlenwert);
      return true;
	  });

    //when save button is clicked
	  $('#test_ajax_button').click(function(){
      $('#ajax_div').toggle();
      send_annal('test');
	  });

    //when export button is clicked
	  $('#export_ajax_button').click(function(){
      $('#ajax_div').toggle();
      send_annal('export');
	  });
    //when download button is clicked
	  $('#download_ajax_button').click(function(){
      $('#ajax_div').toggle();
      download_annal($(this).data('arg1'));
	  });
});

//function to save or export a JSON
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
        $('#ajax_div').toggle();
        $('#msg_div').text(data['message']);
        if (action == 'exportt'){
            $('#export_ajax_button').attr('disabled',true);
        }
    },
    error: function (xhr) {
      console.log(' Error:  >>>> ' + JSON.stringify(xhr));
    }
  });
}

function insertText(zahlenwert) {
    console.log('this.props.:  >>>> inserttext' );
    let question = "{ \n \
            \"status\": \"1\", \n \
            \"hint\" : \"\",   \n \
            \"explanation\": \"\", \n \
            \"question\": \"\", \n \ ";
    if (zahlenwert == 1) {
      question += " \"qtype\" : \"1\", \n \
                   \"answers\": [  \n \
                       { \"answer\": \"One\", \"correct\": \"false\" }, \n \
                       { \"answer\": \"Two\", \"correct\": \"false\" }  \n \
                 ] } ";
    } else if(zahlenwert == 2) {
      question +=  " \"qtype\" : \"5\", \n \
                     \"answers\": [  \n \
                       { first_column: \"México\",  second_column: \"\", name_column: \"A\", correct_column: \"B\" }, \n \
                       { first_column: \"Argentina\",  second_column: \"\", name_column: \"B\", correct_column: \"A\" }, \n \
                 ] } ";
    } else if(zahlenwert == 3) {
      question +=  " \"qtype\" : \"3\" \n \
                  } ";
    }
    let $textbox = $("#annal_json");
    let textStr  = $textbox.val();
    let startPos = $textbox[0].selectionStart;
    let endPos   = $textbox[0].selectionEnd;

    // If set to true, the selection will NOT be replaced.
    // Instead, the text will be inserted before the first highlighted character.
    if (true) {
      endPos = startPos;
    }

    let beforeStr = textStr.substr(0, startPos);
    let afterStr  = textStr.substr(endPos, textStr.length);

    textStr = beforeStr + question + afterStr;
    $textbox.val(textStr);
    return textStr;
}

//function to download a file
function download_annal(annal_id) {
  let url       = '/annals/' + annal_id + '/download_file';
  $.ajax({
    type: 'GET',
    url: url,
    processData: false,
    success: function (data) {
        $('#ajax_div').toggle();
        window.location = url;
    },
    error: function (xhr) {
      console.log(' Error:  >>>> ' + JSON.stringify(xhr));
    }
  })
}
