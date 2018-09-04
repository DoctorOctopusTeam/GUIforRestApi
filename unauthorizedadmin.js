$('#popModal').click(function(ev){
    ev.preventDefault();
    let $pass = $('#initialpass').val();
    let $repeatPass = $('#repeatinitialpass').val();
    let $url = 'http://localhost:8080/admin/changepassword?newPassword=' + $pass + '&repeatNewPassword=' + $repeatPass;
    let $token = localStorage.getItem("token");
    $.ajax({
        type:'POST',
        url:$url,
        headers: {
            "Authorization" : $token
        },
        dataType: 'json',
        contentType: 'application/json'
    })
    .done(function(data, result, hxr){
        $('#tit').text('Success!');
    })
    .fail(function(data, result, hxr){
        $('#tit').text('Fail!');
    });
});