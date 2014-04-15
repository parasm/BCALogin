var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-49309931-1']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
$(function() {
	try{
		chrome.cookies.get({ url: 'https://ccahack.bergen.org/auth/perfigo_validate.jsp', name: 'sign_in' },
		function (cookie) {
		    if (cookie) {
		      cookieFound(cookie.value);
		    }
		    else{
		        cookieNotFound();
		    }
		});
	}catch(err){
		//do nothing
	}
    function cookieFound(cookie){
        $('body').append('<h1>Logging In...</h1>');
        var user_pass = cookie.split("-");
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
    function cookieNotFound(){
        $('body').append('<form method="POST" id="form"><label>Enter username<input id="username"></label><br>'+
            '<label>Enter password <input id="password" type="password">  </label> '+
            '<br><button type="submit" id="sign">Sign In</button>'+
            '</form>');
        $('#form').submit(function (event) {
            event.preventDefault();
            var username = $('#username').val();
            var password = $('#password').val();
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
            chrome.cookies.set({ url: "https://ccahack.bergen.org/auth/perfigo_validate.jsp", name: "sign_in", value: username+"-"+password , expirationDate:  (new Date().getTime()/1000)*100});
        });
    }
    function worked(){
        $('h1').remove();
        $('#form').remove();
        $('#clear').remove();
        $('body').append('<h1 class="size">SUCCESSFULLY LOGGED IN!</h1><button type="submit" id="button">Clear Saved Login</button>');
        function clear() {
            chrome.cookies.remove({ url: 'https://ccahack.bergen.org/auth/perfigo_validate.jsp', name: 'sign_in' },function(){
                $('h1').remove();
                $('#button').remove();
                $('body').append('<div class="size"><h1>Saved login cleared!</h1></div>');

            })
        }
        document.getElementById('button').onclick = clear;
    }
});