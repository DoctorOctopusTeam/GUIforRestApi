
$('#login-button').click(function (ev) {
    ev.preventDefault();
    var userName = $('#username').val();
    var password = $('#password').val();

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/login',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "userName": userName,
            "password": password
        })
    }).done(function (body, t, xhr) {
        var token = xhr.getResponseHeader('Authorization');
        var role = xhr.getResponseHeader('Role');
            localStorage.setItem("token", token);
            if (role === "ROLE_USER") {
                window.location.href = "http://localhost:8081/usermodule/user.html";
                
            }if(role === "ROLE_UNAUTHORIZEDADMIN") {
                window.location.href = "http://localhost:8081/unauthorizedadmin.html";
            } else if(role === "ROLE_ADMIN") {
                window.location.href = "http://localhost:8081/adminmodule/admin.html";
            }
        
    })
    .fail(function(){
        $('#invalid').show();
    })
    $('#username').val('');
    $('#password').val('');
});

