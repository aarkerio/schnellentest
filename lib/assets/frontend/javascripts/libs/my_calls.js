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
	$('#edit_annal_7').submit(function(){
		// $('#email_availability_result').fadeIn().html(checking_html);
		update_annal();
	});
});

//function to check username availability
function update_annal(){

  //get the username
	let text_area = $('#annal_json').val();
  let url       = $('#edit_annal_7').attr('action');
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
      if (data['available'] === true) {
			  ear.html('El correo ' + email + ' está disponible').toggleClass('formOk');
      } else {
        ear.html('El correo ' + email + ' ya existe').toggleClass('formError');
      }
    },
    error: function (xhr) {
      console.log(' Error:  >>>> ' + JSON.stringify(xhr));
    }
  });
}
