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
    }).done(function (body, status, xhr) {
        var token = xhr.getResponseHeader('Authorization');
        var role = xhr.getResponseHeader('Role');
        localStorage.setItem("token", token);
        if(role === "ROLE_USER") {
            window.location.href = "http://localhost:8081/one.html";
        } else {
            window.location.href = "http://localhost:8081/two.html";
        }
    });
});