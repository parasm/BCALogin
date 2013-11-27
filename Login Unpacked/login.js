$(function() {
    chrome.cookies.get({ url: 'https://www.google.com/', name: 'sign_in' },
    function (cookie) {
        if (cookie) {
          cookieFound(cookie.value);
        }
        else{
            cookieNotFound();
        }
    });
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
            '<br><button type="submit" id="button">Sign In</button>'+
            '</form><button id="clear">Clear Saved Login</button>');
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
            chrome.cookies.set({ url: "https://www.google.com/", name: "sign_in", value: username+"-"+password });
        });
    }
    function worked(){
        $('h1').remove();
        $('#form').remove();
        $('#clear').remove();
        $('body').append('<h1>Successfully Logged In!</h1>');
    }
});
