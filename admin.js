
$('#sign-up-user').click(function(ev){
    ev.preventDefault();
    let $username = $('#usernameclient').val();
    let $password = $('#passwordclient').val();
    let $repeatedPassword = $('#repeat-passwordclient').val();
    let $details = $('#detailsclient').val();
    let $eik = $('#eikclient').val();
    let $data = JSON.stringify({
        'userName':$username,
        'password':$password,
        'details':$details,
        'eik':$eik
    });
    let $url = 'http://localhost:8080/admin/registeruser?repeatedPassword=' + $repeatedPassword;
    let $token = localStorage.getItem("token");
    $.ajax({
        type:'POST',
        url:$url,
        headers: {
            "Authorization" : $token
        },
        dataType: 'json',
        contentType: 'application/json',
        data: $data
    })
    .done(function(data, result, hxr){
        $('#usernameclient').val('');
        $('#passwordclient').val('');
        $('#repeat-passwordclient').val('');
        $('#detailsclient').val('');
        $('#eikclient').val('');
        $('#modal-titleclient').empty();
        $('#modal-textclient').empty();
        $('#modal-titleclient').text('Successfully added new client');
        $('#modal-textclient').text(data.userName + ' added to the database');
    })
    .fail(function(data, result, hxr){
        $('#modal-titleclient').empty();
        $('#modal-textclient').empty();
        let $errorMessage = data.getResponseHeader('Error');
        $('#modal-titleclient').text(result);
        $('#modal-textclient').text($errorMessage);
    });

});
//-----------------------------------------------------------------------------------------
$('#sign-up-admin').click(function(ev){
    ev.preventDefault();
    let $username = $('#usernameadmin').val();
    let $password = $('#passwordadmin').val();
    let $repeatedPassword = $('#repeat-passwordadmin').val();
    let $email = $('#emailadmin').val();
    let $data = JSON.stringify({
        'userName':$username,
        'password':$password,
        'email': $email
    });
    let $url = 'http://localhost:8080/admin/registeradmin?repeatedPassword=' + $repeatedPassword;
    let $token = localStorage.getItem("token");
    $.ajax({
        type:'POST',
        url:$url,
        headers: {
            "Authorization" : $token
        },
        dataType: 'json',
        contentType: 'application/json',
        data: $data
    })
    .done(function(data, result, hxr){
        $('#usernameadmin').val('');
        $('#passwordadmin').val('');
        $('#repeat-passwordadmin').val('');
        $('#emailadmin').val('');
        $('#modal-titleadmin').empty();
        $('#modal-textadmin').empty();
        $('#modal-titleadmin').text('Successfully added new admin');
        $('#modal-textadmin').text(data.userName + ' added to the database');
    })
    .fail(function(data, result, hxr){
        $('#modal-titleadmin').empty();
        $('#modal-textadmin').empty();
        let $errorMessage = data.getResponseHeader('Error');
        $('#modal-titleadmin').text(result);
        $('#modal-textadmin').text($errorMessage);
    });

});
//------------------------------------------------------------------------------------------

$('#update-client').click(function(ev){
    ev.preventDefault();
    let $currentUsername = $('#usernameupdate').val();
    let $newUsername = $('#newusernameupdate').val();
    let $newPassword = $('#passwordupdate').val();
    let $newDetails = $('#detailsupdate').val();
    let $newEik = $('#eikupdate').val();
    let $newEmail = $('#emailupdate').val();
    let $newEnabled = $('#enabledupdate').val();
    if($newEnabled === ""){
        $newEnabled = 5;
    }
    if(typeof($newEik) === 'string' && $newEik !== ''){
        $('#modal-titleclient').text('Can not');
        $('#modal-textclient').text('accept a string value for EIK');
        return;
     }
    let $data = JSON.stringify({
        'userName':$newUsername,
        'password':$newPassword,
        'details':$newDetails,
        'eik':$newEik,
        'email':$newEmail,
        'enabled':$newEnabled
    });
    let $url = 'http://localhost:8080/admin/updatecreds?currentuserName=' + $currentUsername;
    let $token = localStorage.getItem("token");
    $.ajax({
        type:'POST',
        url:$url,
        headers: {
            "Authorization" : $token
        },
        dataType: 'json',
        contentType: 'application/json',
        data: $data
    })
    .done(function(data, result, hxr){
        $('#usernameupdate').val('');
        $('#newusernameupdate').val('');
        $('#passwordupdate').val('');
        $('#detailsupdate').val('');
        $('#eikupdate').val('');
        $('#emailupdate').val('');
        $('#enabledupdate').val('');
        $('#modal-titleclient').empty();
        $('#modal-textclient').empty();
        $('#modal-titleclient').text('Successful update');
        $('#modal-textclient').text('If you have changed the username new login is required');
    })
    .fail(function(data, result, hxr){
        $('#modal-titleclient').empty();
        $('#modal-textclient').empty();
        let $errorMessage = data.getResponseHeader('Error');
        $('#modal-titleclient').text(result);
        $('#modal-textclient').text($errorMessage);
    });

});