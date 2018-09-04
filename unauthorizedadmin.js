$(function(){
    $("#popModal").modal({
        backdrop: 'static',
        keyboard: true
    });
    $('#popModal').modal('show');
    // $('#tit').text('REMEMBER');
    // $('#tex').text('TO CHANGE YOUR PASSWORD OFTEN');
    // $('#change-password-btn').click(function(ev){
    //     ev.preventDefault();
    // });
});


$('#change-password-btn').click(function(ev){
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
        window.location.href = "http://localhost:8081/admin.html";
    })
    .fail(function(data, result, hxr){
        let $errorMessage = data.getResponseHeader('Error');
        $('#tit').text($errorMessage);
    });
});