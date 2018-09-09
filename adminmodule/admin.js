// toggles the create client panel
$('#createclient').click(function () {
    let x = $('#cube1');
    if (x.css('display') == 'none') {
        x.css('display', 'inline-block');
    } else {
        x.css('display', 'none');
    }
});
// toggles the create admin panel
$('#createadmin').click(function () {
    let x = $('#cube2');
    if (x.css('display') == 'none') {
        x.css('display', 'inline-block');
    } else {
        x.css('display', 'none');
    }
});
// toggles the update credentials panel
$('#updatecredentials').click(function () {
    let x = $('#cube3');
    if (x.css('display') == 'none') {
        x.css('display', 'inline-block');
    } else {
        x.css('display', 'none');
    }
});
//toggles the delete panel
$('#deleteuser').click(function () {
    let x = $('#cube4');
    if (x.css('display') == 'none') {
        x.css('display', 'inline-block');
    } else {
        x.css('display', 'none');
    }
});
//toggles issue nw bill panel
$('#issuebill').click(function () {
    let x = $('#cube5');
    if (x.css('display') == 'none') {
        x.css('display', 'inline-block');
    } else {
        x.css('display', 'none');
    }
});
// signs up client
$('#sign-up-user').click(function (ev) {
    ev.preventDefault();
    let $username = $('#usernameclient').val();
    let $password = $('#passwordclient').val();
    let $repeatedPassword = $('#repeat-passwordclient').val();
    let $details = $('#detailsclient').val();
    let $eik = $('#eikclient').val();
    let $data = JSON.stringify({
        'userName': $username,
        'password': $password,
        'details': $details,
        'eik': $eik
    });
    let $url = 'http://localhost:8080/admin/registeruser?repeatedPassword=' + $repeatedPassword;
    let $token = localStorage.getItem("token");
    $.ajax({
            type: 'POST',
            url: $url,
            headers: {
                "Authorization": $token
            },
            dataType: 'json',
            contentType: 'application/json',
            data: $data
        })
        .done(function (data, result, hxr) {
            $('#usernameclient').val('');
            $('#passwordclient').val('');
            $('#repeat-passwordclient').val('');
            $('#detailsclient').val('');
            $('#eikclient').val('');
            $('#modal-titleclient').empty();
            $('#modal-textclient').empty();
            $('#clientModal').modal('show');
            $('#modal-titleclient').text('Successfully added new client');
            $('#modal-textclient').text(data.userName + ' added to the database');
        })
        .fail(function (data, result, hxr) {
            $('#modal-titleclient').empty();
            $('#modal-textclient').empty();
            let $errorMessage = data.getResponseHeader('Error');
            $('#clientModal').modal('show');
            $('#modal-titleclient').text(result);
            $('#modal-textclient').text($errorMessage);
        });

});
//signs up admin
$('#sign-up-admin').click(function (ev) {
    ev.preventDefault();
    let $username = $('#usernameadmin').val();
    let $password = $('#passwordadmin').val();
    let $repeatedPassword = $('#repeat-passwordadmin').val();
    let $email = $('#emailadmin').val();
    let $data = JSON.stringify({
        'userName': $username,
        'password': $password,
        'email': $email
    });
    let $url = 'http://localhost:8080/admin/registeradmin?repeatedPassword=' + $repeatedPassword;
    let $token = localStorage.getItem("token");
    $.ajax({
            type: 'POST',
            url: $url,
            headers: {
                "Authorization": $token
            },
            dataType: 'json',
            contentType: 'application/json',
            data: $data
        })
        .done(function (data, result, hxr) {
            $('#usernameadmin').val('');
            $('#passwordadmin').val('');
            $('#repeat-passwordadmin').val('');
            $('#emailadmin').val('');
            $('#modal-titleadmin').empty();
            $('#modal-textadmin').empty();
            $('#adminModal').modal('show');
            $('#modal-titleadmin').text('Successfully added new admin');
            $('#modal-textadmin').text(data.userName + ' added to the database');
        })
        .fail(function (data, result, hxr) {
            $('#modal-titleadmin').empty();
            $('#modal-textadmin').empty();
            let $errorMessage = data.getResponseHeader('Error');
            $('#adminModal').modal('show');
            $('#modal-titleadmin').text(result);
            $('#modal-textadmin').text($errorMessage);
        });

});
//updates credentials
$('#update-client').click(function (ev) {
    ev.preventDefault();
    let $currentUsername = $('#usernameupdate').val();
    let $newUsername = $('#newusernameupdate').val();
    let $newPassword = $('#passwordupdate').val();
    let $newDetails = $('#detailsupdate').val();
    let $newEik = $('#eikupdate').val();
    let $newEmail = $('#emailupdate').val();
    let $newEnabled = $('#enabledupdate').val();
    if ($newEnabled === "") {
        $newEnabled = 5;
    }
    if (typeof ($newEik) === 'string' && $newEik !== '') {
        $('#clientModal').modal('show');
        $('#modal-titleclient').text('Can not');
        $('#modal-textclient').text('accept a string value for EIK');
        return;
    }
    let $data = JSON.stringify({
        'userName': $newUsername,
        'password': $newPassword,
        'details': $newDetails,
        'eik': $newEik,
        'email': $newEmail,
        'enabled': $newEnabled
    });
    let $url = 'http://localhost:8080/admin/updatecreds?currentuserName=' + $currentUsername;
    let $token = localStorage.getItem("token");
    $.ajax({
            type: 'POST',
            url: $url,
            headers: {
                "Authorization": $token
            },
            dataType: 'json',
            contentType: 'application/json',
            data: $data
        })
        .done(function (data, result, hxr) {
            $('#usernameupdate').val('');
            $('#newusernameupdate').val('');
            $('#passwordupdate').val('');
            $('#detailsupdate').val('');
            $('#eikupdate').val('');
            $('#emailupdate').val('');
            $('#enabledupdate').val('');
            $('#modal-titleclient').empty();
            $('#modal-textclient').empty();
            $('#clientModal').modal('show');
            $('#modal-titleclient').text('Successful update');
            $('#modal-textclient').text('If you have changed the username new login is required');
        })
        .fail(function (data, result, hxr) {
            $('#modal-titleclient').empty();
            $('#modal-textclient').empty();
            let $errorMessage = data.getResponseHeader('Error');
            $('#clientModal').modal('show');
            $('#modal-titleclient').text(result);
            $('#modal-textclient').text($errorMessage);
        });

});
//delete user
$('#delete-user').click(function (ev) {
    ev.preventDefault();
    let $username = $('#usernamedelete').val();
    let $repeatUsername = $('#usernamedeleterepeat').val();
    if ($username !== $repeatUsername) {
        $('#modal-titledel').empty();
        $('#modal-textdel').empty();
        $('#delModal').modal('show');
        $('#modal-titledel').text('Be sure to match');
        $('#modal-textdel').text('both firedls!');
        return;
    }
    let $url = 'http://localhost:8080/admin/delete?nameOfBank=' + $username;
    let $token = localStorage.getItem("token");
    $.ajax({
            type: 'POST',
            url: $url,
            headers: {
                "Authorization": $token
            },
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (data, result, hxr) {
            $('#modal-titledel').empty();
            $('#modal-textdel').empty();
            $('#delModal').modal('show');
            $('#modal-titledel').text('Entry deleted').css('color', 'red');
            $('#modal-textdel').text('of ' + data.userName + ' entry');
        })
        .fail(function (data, result, hxr) {
            $('#modal-titledel').css('color', 'black').empty();
            $('#modal-textdel').empty();
            let $errorMessage = data.getResponseHeader('Error');
            $('#delModal').modal('show');
            $('#modal-titledel').text(result);
            $('#modal-textdel').text($errorMessage);
        });
});
//issue new bill
$('#newbill').click(function (ev) {
    ev.preventDefault();
    let $service = $('#service').val();
    let $startDate = $('#datepicker1').val();
    let $endDate = $('#datepicker2').val();
    let $phoneNumber = $('#cur1').val();
    let $amount = $('#amount').val();
    let $currency = $('#currency').val();
    if ($service === undefined || $startDate === "" || $endDate === "" || $phoneNumber === undefined) {
        $('#modal-titlebill').empty();
        $('#modal-textbill').empty();
        $('#billModal').modal('show');
        $('#modal-titlebill').text('Error');
        $('#modal-textbill').text('Make sure all the dropdown fields are populated!');
        return;
    }
    let $url = 'http://localhost:8080/admin/issuebill?subscriber=' + $phoneNumber;
    let $token = localStorage.getItem("token");
    let $data = JSON.stringify({
        'service': $service,
        'startDate': $startDate,
        'endDate': $endDate,
        'amount': $amount,
        'currency': $currency
    });
    $.ajax({
            type: 'POST',
            url: $url,
            headers: {
                "Authorization": $token
            },
            dataType: 'json',
            contentType: 'application/json',
            data: $data
        })
        .done(function (data, result, hxr) {
            $('#service').val('');
            $('#datepicker1').val('');
            $('#datepicker2').val('');
            $('#cur1').val('');
            $('#amount').val('');
            $('#currency').val('');
            $('#modal-titlebill').empty();
            $('#modal-textbill').empty();
            $('#billModal').modal('show');
            $('#modal-titlebill').text('Success');
            $('#modal-textbill').text('bill with ID ' + data.id + ' created!');
        })
        .fail(function (data, result, hxr) {
            $('#modal-titlebill').empty();
            $('#modal-textbill').empty();
            let $errorMessage = data.getResponseHeader('Error');
            $('#billModal').modal('show');
            $('#modal-titlebill').text(result);
            $('#modal-textbill').text($errorMessage);
        });
});
//POPULATE PHONENUMBER FIELD
$('#issuebill').click(function (ev) {
    ev.preventDefault();
    let $url = 'http://localhost:8080/admin/subscribers'
    let $token = localStorage.getItem("token");
    $.ajax({
            type: 'GET',
            url: $url,
            headers: {
                "Authorization": $token
            },
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (data, result, hxr) {
            let $controlvariable = data[3].phoneNumber;
            $.each(data, function (key, value) {
                let $phone = data[key].phoneNumber;
                $('#cur1').append($('<option>', {
                    text: $phone
                }))
            })
        })
        .fail(function (data, result, hxr) {
            $('#billModal').modal('show');
            $('#modal-titlebill').text('Check if you are admin!');
        });
    $('#datepicker1').datepicker({
        uiLibrary: 'bootstrap',
        format: "yyyy-mm-dd",
        changeMonth: true,
        changeYear: true
    });
    $('#datepicker2').datepicker({
        uiLibrary: 'bootstrap',
        format: "yyyy-mm-dd",
        changeMonth: true,
        changeYear: true
    });
});
//connect the button admins
$('#listadmins').click(function (ev) {
    ev.preventDefault();
    $('#typeofreports').text('');
    $('#res').bootstrapTable(
        'destroy'
    );
    $('#typeofreports').text('ADMINISTRATORS');
    $('#result').css('display', 'block');
    let $role = 'admin';
    listAll($role);
});
// //connect the button clients
$('#listclients').click(function (ev) {
    ev.preventDefault();
    $('#typeofreports').text('');
    $('#res').bootstrapTable(
        'destroy'
    );
    $('#typeofreports').text('CLIENTS');
    $('#result').css('display', 'block');
    let $role = 'user';
    listAll($role);
});
//clear reports
$('#clearreports').click(function (ev) {
    ev.preventDefault();
    $('#result').css('display', 'none');
});
$('#logout').click(function(ev){
    ev.preventDefault();
    localStorage.clear();
    window.location.href = 'http://localhost:8081/logout.html';
});
//function to list users
function listAll(role) {
    let $url = 'http://localhost:8080/admin/listall/' + role;
    let $token = localStorage.getItem("token");
    $.ajax({
            type: 'GET',
            url: $url,
            headers: {
                "Authorization": $token
            },
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (data1) {
            //$('#res').bootstrapTable('load', data1);
            $('#res').bootstrapTable({
                data: data1
            });
            // $('#qtex').empty();
            // $('#querymodal').modal('show');
            // $('#result-one').append($('<tr>'))
            //     .append($('<th>', {
            //         text: 'Username'
            //     }))
            //     .append($('<th>', {
            //         text: 'Is user enabled'
            //     }))
            //     .append($('<th>', {
            //         text: 'Details'
            //     }))
            //     .append($('<th>', {
            //         text: 'Email'
            //     }))
            //     .append($('<br>'));

            // $.each(data, function (key, value) {
            //     $('#result-two').append($('<tr>'))
            //         .append($('<td>', {
            //             text: data[key].userName
            //         }))
            //         .append($('<td>', {
            //             text: data[key].enabled
            //         }))
            //         .append($('<td>', {
            //             text: data[key].details
            //         }))
            //         .append($('<td>', {
            //             text: data[key].email
            //         }));
            // })          
        })
        .fail(function (data, result, hxr) {
            $('#qtex').empty();
            $('#querymodal').modal('show');
            $('#qtex').text('Oh fuck!');
        });
}