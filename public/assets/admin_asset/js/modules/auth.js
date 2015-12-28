// #################### event bindings ##########################
$(document).ready( function () {
	$( "#loginBtn" ).click(function() {
		$.login();
	});

	$( "#showForgot" ).click(function() {
		showHideForgot(1);
	});

	$( "#hide_forgot_link" ).click(function() {
		showHideForgot(0);
	});

	$('#login_form').keypress(function (e) {
	 var key = e.which;
	 if(key == 13)  // the enter key code
	  {
		$.login();
	  }
	});   

});

// #################### actual functions ##########################

var showHideForgot = function(show) {
	if(show)
	{
		$('#login_container, #showForgot').toggle();
		$('#forgot_container, #hide_forgot_link').fadeToggle();		
	}
	else
	{
		$('#forgot_container, #hide_forgot_link').toggle();		
		$('#login_container, #showForgot').fadeToggle();
	}
}

$.login = function() {
	var check = true;
	var email = $.trim($('#email').val());
	var password = $.trim($('#password').val());	
	check = validateText('#email', email, check);
	check = validateText('#password', password, check);

	if(check)
	{
		var requestData = {"email":email, "password":password}
		var request = ajaxExec('auth/login', requestData, 'POST', '#response_msg');
		request.done(function(data) {
			if(data.status == 'success')
			{
				$.msgShow('#response_msg', data.message, 'success');
				$.redirect(appConfig.adminUrl + 'dashboard/', 1000);
			}
			else
			{
				$.msgShow('#response_msg', data.message, 'error');
			}
		});
	}
};

