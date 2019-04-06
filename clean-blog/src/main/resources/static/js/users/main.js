// DOM 加载完再执行
$(function() {
	// 用户中心
	$('#userCenter').on('click', function(){
		$("#navbarResponsive").hide();
		$("#user_navbarResponsive").show();
		alert("1111");
	});
	
	
	
	// 注册页面提交
	$('#register_submit').on('click', function(){  
		// 获取各个输入框的值
		var name = $("#name").val();
		var email = $("#email").val();
		var username = $("#username").val();
		var password = $("#password").val();
		if(name == "" || name == null){
			var msg = " Name cannot be empty, please enter and submit !";
			$("#name").focus();
			$("#nameAlert").html(msg);
		}
		if(email == "" || email == null){
			var msg = " Mailbox cannot be empty. Please enter and submit !";
			$("#email").focus();
			$("#emailAlert").html(msg);
		}
		if(username == "" || username == null){
			var msg = " User name cannot be empty. Please enter and submit !";
			$("#usernameAlert").focus();
			$("#usernameAlert").html(msg);
		}
		if(password == "" || password == null){
			var msg = " Password cannot be empty. Please enter and submit !";
			$("#password").focus();
			$("#passwordAlert").html(msg);
		}
		if(name != "" && email != "" && username != "" && password != ""){
			// 获取 CSRF Token
			var csrfToken = $("meta[name='_csrf']").attr("content");
			var csrfHeader = $("meta[name='_csrf_header']").attr("content");
			$.ajax({ 
				 url: '/register', 
				 type: 'POST', 
				 data:{
					 "name" : name,
					 "email" : email,
					 "username" : username,
					 "password" : password
				 },
				 beforeSend: function(request) {
		             request.setRequestHeader(csrfHeader, csrfToken); // 添加 CSRF
																		// Token
		         },
				 success: function(data){
					 if(data != null && data.id != null){
						 window.location.href = "login.html";
					 }else{
						 $("#errorMsg").html(" register has failed ");
					 }
				 }
			 });
		}
	}); 
});