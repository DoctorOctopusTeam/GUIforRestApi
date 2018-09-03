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
    .done(function(data, result, hxr){
        console.log(data.userName);
        // let $color = $('.cube').css('background-color');
        // $('#result-one').css('background-color', $color).append($('<h2>',
        // {text:data.userName + ' successfully added to the database',
        //  class: 'tobedeleted'}));

        $('#modal-title').text(data.userName);
        $('#modal-text').text('successfully added to the database');

    });

});
