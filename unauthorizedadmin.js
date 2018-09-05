$(function(){
    $("#popModal").modal({
        backdrop: 'static',
        keyboard: true
    });
    $('#popModal').modal('show');
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

        
        setTimeout(function () {
            $('#tit').text('Success! You will be redirected in 3 seconds');
        }, 3000);
        window.location.href = "http://localhost:8081/admin.html";
    })
    .fail(function(data, result, hxr){
        let $errorMessage = data.getResponseHeader('Error');
        $('#tit').text($errorMessage);
    });
});