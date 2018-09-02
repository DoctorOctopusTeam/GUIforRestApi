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
    })
    $.ajax({
        type:'POST',
        url:'http://localhost:8080/admin/registeruser',
        headers: {
            "Authorization" : localStorage.getItem("token")
        },
        dataType: 'json',
        contentType: 'application/json',
        data: $data
    })
    .done(function(data){
        $('</div>',{text:data}).appendTo($('#result-one'));
    })

})