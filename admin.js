$('#sign-up-user').click(function(ev){
    ev.preventDefault();
    let $username = $('#username').val();
    let $password = $('#password').val();
    let $details = $('#details').val();
    let $eik = $('#eik').val();
    let $data = JSON.stringify({
        'userName':$username,
        'password':$password,
        'details':$details,
        'eik':$eik
    });
    let $token = localStorage.getItem("token");
    $.ajax({
        type:'POST',
        url:'http://localhost:8080/admin/registeruser',
        headers: {
            "Authorization" : $token
        },
        dataType: 'json',
        contentType: 'application/json',
        data: $data
    })
    .done(function(data){
        console.log(data.userName);
        $('#result-one').append($('<h1>',{text:data.userName + "successfully added"}));
    });

});

// $('#sign-up-user').click(function(ev){
//     $('#result-one').append($('<h1>',{text:'AAAAA'}));
// });