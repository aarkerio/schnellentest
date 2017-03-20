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
	//when button is clicked
	  $('#ajax_button').click(function(){
      $('#ajax_div').toggle();
      update_annal();
	});
});

//function to check username availability
function update_annal(){
  //get the username
	let text_area = $('#annal_json').val();
  let url       = $('#annal_form').attr('action');

  $.ajax({
    beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
    },
    contentType: 'application/json',
    type: 'PATCH',
    url: url,
    processData: false,
    dataType:'json',
    contentType :  'application/json',
    data: JSON.stringify({ annal: { json: text_area } }),
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function (data) {
      //show that the username is available
      $('#ajax_div').toggle();
    },
    error: function (xhr) {
      console.log(' Error:  >>>> ' + JSON.stringify(xhr));
    }
  });
}
