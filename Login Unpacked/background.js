chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name == 'BCA') {
        chrome.cookies.get({ url: 'https://ccahack.bergen.org/auth/perfigo_validate.jsp', name: 'sign_in' },
	    function (cookie) {
	        if (cookie) {
	        	var user_pass = cookie.value.split("-");
        		var username = user_pass[0];
        		var password = user_pass[1];
        		var url = "https://ccahack.bergen.org/auth/perfigo_weblogin.jsp?cm=ws32vklm&uri=https%3A%2F%2Fccahack.bergen.org%2F";
		        $.ajax({
		            type : 'GET',
		            url: url,
		            success: function(data){
		                var form = $(data);
		                var ip = form.find("input[name='userip']").val();
		                login(ip);
		            }
		        });
		        function login(ip){
		            $.ajax({
		                type : 'POST',
		                url : 'https://ccahack.bergen.org/auth/perfigo_validate.jsp',
		                data : {
		                    reqFrom: 'perfigo_simple_login.jsp',
		                    uri: 'https://ccahack.bergen.org/',
		                    cm: 'ws32vklm',
		                    userip: ip,
		                    os: 'MAC_OSX',
		                    index: '4',
		                    username: username,
		                    password: password,
		                    provider: 'BCA',
		                    login_submt: 'Continue'
		                },
		                success : worked
		            });
		        }
	        }
	        else{
	            alert("Please click on extension and enter login information");
	        }
	    });
    }
});

chrome.alarms.create('BCA', {
    periodInMinutes: 55
});
