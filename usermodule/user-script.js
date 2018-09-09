//get subscriber info  
$('#btn-info').click(function (ev) {
    ev.preventDefault();
    $(".result").html("");
    var subscriber = $("#phone-info").val();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/info/' + subscriber,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    }).done(function (data) {
        if (data['phoneNumber'] == subscriber) {
            $('.result').append('<table><tr><th>Phone number</th><th>First Name</th><th>Last Name</th><th>EGN</th></tr>');
            var ee = '<tr><td>' + data.phoneNumber + '</td><td>' + data.firstName + '</td><td>' + data.lastName + '</td><td>'
                + data.egn + '</td></tr>';
            $('.result table').append(ee);
        } else {
            modal.style.display = "block";
            $('#myModal p').text('Invalid phone number!');
        }
    })      
        .fail(function () {
            modal.style.display = "block";
            $('#myModal p').text('Error occured!');
        });
    $("#phone-info").val('');
});

//get subcriber services 
$('#btn-services').click(function (ev) {
    ev.preventDefault();
    $(".result").html("");
    var subscriber = $("#phone-services").val();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/services/' + subscriber,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    }).done(function (data) {
        if (!jQuery.isEmptyObject(data)) {
            $('.result')
                .append($('<table><tr><th>Used services by subscriber - phone number: ' + subscriber + '</th></tr>'));
            $.each(data, function (i, o) {
                $('.result table')
                    .append($('<tr><td>' + data[i] + '</td></tr>'));;
            });
        } else {                
            modal.style.display = "block";
            $('#myModal p').text('Invalid action. Enter valid phone number!');
        }
    })
        .fail(function () {
            modal.style.display = "block";
            $('#myModal p').text('Error occured!');
        });
    $("#phone-services").val('');
});

//get max bill paid by subscriber for period  
$('#btn-max').click(function (ev) {
    ev.preventDefault();
    $(".result").html("");
    var subscriber = $("#phone-max").val();
    var start = $("#max-start-date").val();
    var end = $("#max-end-date").val();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/reports/max/' + subscriber + '/' + start + '/' + end,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    }).done(function (data) {
        if (!jQuery.isEmptyObject(data)) {
            $('.result')
                .append($('<table><tr><th>Largest amount</th><th>For service</th><th>Time period</th><th>Phone number</th></tr></table>'));
            var vv = '<tr><td>' + data.amount + ' BGN</td><td>' + data.service + '</td><td>' +
                start + ' - ' + end + '</td><td>' + subscriber + '</td>';
            $('.result table')
                .append(vv);
        } else {                
            modal.style.display = "block";
            $('#myModal p').text('No records for this period!');
        }
    })
        .fail(function (data) {
            if (data.getResponseHeader('Error') === 'Not valid phone number') {
                modal.style.display = "block";
                $('#myModal p').text('Not valid phone number!');
            } else if (data.getResponseHeader('Error') === 'No payment records for this period') {
                modal.style.display = "block";
                $('#myModal p').text('No payment records for this period');
            } else {
                modal.style.display = "block";
                $('#myModal p').text('Invalid action! Enter valid time period!');
            }
        });
    $("#phone-max").val('');
    $("#max-start-date").val('');
    $("#max-end-date").val('');
});

//get average of payments 
$('#btn-average').click(function (ev) {
    ev.preventDefault();
    $(".result").html("");
    var subscriber = $("#phone-average").val();
    var start = $("#average-start-date").val();
    var end = $("#average-end-date").val();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/reports/average/' + subscriber + '/' + start + '/' + end,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    }).done(function (data) {
        if (!jQuery.isEmptyObject(data)) {
            $('.result')
                .append($('<table><tr><th>Average amount</th><th>Time period</th><th>Phone number</th></tr></table>'));
            var vv = '<tr><td>' + data['Average sum'] + ' BGN</td><td>' +
                start + ' - ' + end + '</td><td>' + subscriber + '</td>';
            $('.result table')
                .append(vv);
        } else {                    
            $('.result')
                .append($('<div>No records for this period!</div>'));
        }
    })
        .fail(function (data) {
            if (data.getResponseHeader('Error') === 'Not valid phone number') {
                modal.style.display = "block";
                $('#myModal p').text('Not valid phone number!');
            } else if (data.getResponseHeader('Error') === 'No payment records for this period') {
                modal.style.display = "block";
                $('#myModal p').text('No payment records for this period');
            } else {
                modal.style.display = "block";
                $('#myModal p').text('Invalid action! Enter valid time period!');
            }
        });
    $("#phone-average").val('');
    $("#average-start-date").val('');
    $("#average-end-date").val('');
});

//get history of payments
$('#btn-history').click(function (ev) {
    ev.preventDefault();
    $(".result").html("");

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/payments',
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    }).done(function (response) {
        if (!jQuery.isEmptyObject(response)) {
            $('#nextValue').show();
            $('#PreeValue').show();
            var max_size = response.length;
            var sta = 0;
            var elements_per_page = 10;
            var limit = elements_per_page;
            goFun(sta, limit);

            function goFun(sta, limit) {
                $('.result').append('<table><tr><th>Bill ID</th><th>Service</th><th>Pay Date</th><th>Amount</th><th>Subscriber</th><th>Phone number</th></tr>');
                for (var i = sta; i < limit; i++) {

                    var $nr = $('<tr><td>' + response[i]['id'] + '</td><td>' + response[i]['service'] +
                        '</td><td>' + response[i]['payDate'] + '</td><td>' + response[i]['amount'] + ' ' + response[i]['currency'] +
                        '</td><td>' + response[i]['subscriber']['firstName'] + ' ' + response[i]['subscriber']['lastName'] +
                        '</td><td>' + response[i]['subscriber']['phoneNumber'] + '</td></tr>');
                    $('.result table').append($nr);
                }
            }

            $('#nextValue').click(function () {

                var next = limit;
                if (max_size >= next) {
                    limit = limit + elements_per_page;
                    $('.result').empty();
                    goFun(next, limit);
                }
            });
            $('#PreeValue').click(function () {
                var pre = limit - (2 * elements_per_page);
                if (pre >= 0) {
                    limit = limit - elements_per_page;
                    $('.result').empty();
                    goFun(pre, limit);
                }
            });
        } else {
            modal.style.display = "block";
            $('#myModal p').text('No subscribers for this user!');
        }
    })

        .fail(function () {
            modal.style.display = "block";
            $('#myModal p').text('Error ');
        });

});

//get top 10 subscribers by biggest amount /for all bills/ paid 
$('#btn-top-ten').click(function (ev) {
    ev.preventDefault();
    $(".result").html("");

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/reports/10biggest-amounts',
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    }).done(function (response) {
        if (!jQuery.isEmptyObject(Response)) {
            var toAppend = '<table><tr><th>Amount paid</th><th>First Name</th><th>Last Name</th><th>Phone Number</th></tr>';
            $.each(response, function (i, o) {
                toAppend += '<tr><td>' + o.amount + ' BGN</td><td>' + o.firstName + '</td><td>' + o.lastName + '</td><td>'
                    + o.phoneNumber + '</td></tr>';
            });
            $('.result').append(toAppend);

        } else {
            modal.style.display = "block";
            $('#myModal p').text('No payment records for this period');
        }
    })
        .fail(function () {
            modal.style.display = "block";
            $('#myModal p').text('Error occured!');
        });
});

//pay bill 
$('#btn-pay').click(function (ev) {
    ev.preventDefault();
    $(".result").html("");
    var id = $("#bill-id").val();

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/user/pay/' + id,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        data: JSON.stringify({
            "id": id
        })
    }).done(function (data) {
        if (data['payDate'] != null) {
            $('.result')
                .append($('<table><tr><th>Bill ID</th><th>Amount paid</th><th>Pay date</th><th>Phone number</th></tr></table>'));
            var pp = '<tr><td>' + data.id + '</td><td>' + data.amount + ' ' + data.currency + '</td><td>Just now</td><td>' + data.subscriber.phoneNumber + '</td>';
            $('.result table').append(pp);
            modal.style.display = "block";
            $('#myModal p').text('You have just paid a bill with ID ' + id + '!');
        } else {
            modal.style.display = "block";
            $('#myModal p').text('Not valid bill ID!');
        }
    })
        .fail(function () {
            modal.style.display = "block";
            $('#myModal p').text('Error occured!');
        });
    $("#bill-id").val('');
});

//get list of all unpaid bills of subscriber
$('#btn-unpaid').click(function (ev) {
    ev.preventDefault();
    $(".result").html("");
    var phone = $('#unpaid-phone').val();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/unpaid/' + phone,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    }).done(function (response) {
        if (response.length != 0) {
            var toAppend = '<table><tr><th>Unpaid Bill ID</th><th>For service</th><th>Amount to pay</th><th>First Name</th><th>Last Name</th><th>Phone Number</th></tr>';
            $.each(response, function (i, o) {
                toAppend += '<tr><td>' + response[i]['id'] + '</td><td>' + response[i]['service'] + '</td><td>' + response[i]['amount'] + ' '
                    + response[i]['currency'] + '</td><td>' + response[i]['subscriber']['firstName'] + '</td><td>'
                    + response[i]['subscriber']['lastName'] + '</td><td>' + phone + '</td></tr>';

            });
            $('.result')
                .append(toAppend);
        } else {
            modal.style.display = "block";
            $('#myModal p').text('No unpaid bill for this subscriber!');
        }
    })
        .fail(function (data) {
            if (data.getResponseHeader('Error') === 'Not valid phone number') {
                modal.style.display = "block";
                $('#myModal p').text('Not valid phone number!');
            }
        });
    $("#unpaid-phone").val('');
});

$('#btn-info, #btn-services, #btn-max, #btn-average, #btn-top-ten, #btn-pay, #btn-unpaid').click(
    function () {
        $('#nextValue').hide();
        $('#PreeValue').hide();
    }
)

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
}



