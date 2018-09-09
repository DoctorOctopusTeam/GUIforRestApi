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
        let $seconds = 5;
        setInterval(function () {   
            $('#tit').text('Success! You will be redirected in ' + $seconds);
            $seconds--;
            if($seconds < 1){
                clearInterval();
                window.location.href = "http://localhost:8081/adminmodule/admin.html";
            }
        }, 1000);       
    })
    .fail(function(data, result, hxr){
        let $errorMessage = data.getResponseHeader('Error');
        $('#tit').text($errorMessage);
    });
});