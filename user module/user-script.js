//get subscriber info DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE 
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
            $('.result')
                .append($('<div>Details for Subscriber with Phone nomer:' + data['phoneNumber'] + '</div>'))
                .append($('<div>First name:' + data['firstName'] + '</div>'))
                .append($('<div>Last name:' + data['lastName'] + '</div>'))
                .append($('<div>EGN:' + data['egn'] + '</div>'));
        } else {
            $('.result')
                .append($('<div>Invalid subscriber phone number!</div>'));
        }
    })

        .fail(function () {
            $('.result')
                .append($('<div>Error accured!</div>'));
        });
    $("#phone-info").val('');

});

//get subcriber services DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE 
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
                .append($('<div>Details for used services by Subscriber with Phone nomer:' + subscriber + '</div>'))
                .append($('<div>' + data + '</div>'))
        } else {
            $('.result')
                .append($('<div>Invalid action. Enter valid phone number!</div>'));
        }
    })
        .fail(function () {
            $('.result')
                .append($('<div>Error accured!</div>'));
        });
    $("#phone-services").val('');
});

//get max bill paid by subscriber for period  DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE
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
                .append($('<div>The biggest amout paid for service by subscriber with phone number:' + subscriber + '</div>'))
                .append($('<div>For period: from ' + start + ' to ' + end + '</div>'))
                .append($('<div>Service: ' + data['service'] + '</div>'))
                .append($('<div>Amount: ' + data['amount'] + ' BGN</div>'));
        } else {
            $('.result')
                .append($('<div>Invalid action. Enter valid phone number!</div>'));
        }
    })
        .fail(function () {
            $('.result')
                .append($('<div>Invalid action. Enter parameters!</div>'));
        });
    $("#phone-max").val('');
    $("#max-start-date").val('');
    $("#max-end-date").val('');
});

//get average of payments DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE
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
        $('.result')
            .append($('<div>The average amout paid for services by subscriber with phone number:' + subscriber + '</div>'))
            .append($('<div>For period: from ' + start + ' to ' + end + '</div>'))
            .append($('<div>Amount: ' + data['Average sum'] + ' BGN</div>'));

    })
        .fail(function () {
            $('.result')
                .append($('<div>Invalid subscriber phone number or time period!</div>'));
        });
    $("#phone-average").val('');
    $("#average-start-date").val('');
    $("#average-end-date").val('');
});

//get history of payments DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE
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
                for (var i = sta; i < limit; i++) {

                    var $nr = $('<div>Bill ID: ' + response[i]['id'] + ', Service: ' + response[i]['service'] + 
                    ', PayDate: ' + response[i]['payDate'] + ', Amount: ' + response[i]['amount'] + ' ' + response[i]['currency'] + 
                    ' Subscriber:' + response[i]['subscriber']['firstName'] + ' ' + response[i]['subscriber']['lastName']+ 
                    ', Phone number: ' + response[i]['subscriber']['phoneNumber'] +'</div>');
                    $('.result').append($nr);
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
            $('.result')
                .append($('<div>No payment records available!</div>'));
        }
    })

        .fail(function () {
            $('.result')
                .append($('<div>Error accured!</div>'));
        });
    
});

//get top 10 subscribers by biggest amount /for all bills/ paid DONE DONE DONE DONE DONE DONE DONE DONE
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
            var toAppend = '';
            $.each(response, function (i, o) {
                toAppend += '<div>Amount: ' + o.amount +
                    ' BGN' + ', Name: ' + o.firstName + ' ' + o.lastName + ', Phone number: ' +
                    o.phoneNumber + '</div>';
            });

        } else {
            $('.result')
                .append($('<div>No payment records available!</div>'));
        }

        $('.result').append(toAppend);
    })
        .fail(function () {
            $('.result')
                .append($('<div>Error accured!</div>'));
        });
});

//pay bill DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE DONE
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
        if (data === 'Paid') {
            $('.result').append('Bill with ID: ' + id + ' was paid!');
        } else if (data === 'Already paid') {
            $('.result').append('Bill with ID: ' + id + ' is already paid.');
        } else if (jQuery.isEmptyObject(data)) {
            $('.result').append('Invalid action. Enter valid Bill ID!');
        }

    })
        .fail(function () {
            $('.result')
                .append($('<div>Error accured! Enter valid parameters!</div>'));
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
        if (!jQuery.isEmptyObject(response) && response) {
            var toAppend = '';
            $.each(response, function (i, o) {
                toAppend += '<div> Bill ID:' + o.id + ', Service:' + o.service + ', Amount: ' + o.amount +
                    ' ' + o.currency + ', Name: ' + o.subscriber.firstName + ' ' + o.subscriber.lastName + ', Phone number: ' +
                    o.subscriber.phoneNumber + '</div>';
            });
        } else {
            $('.result')
                .append($('<div>No unpaid bills for this subscriber.</div>'));
        }
        $('.result').append(toAppend);
    })
        .fail(function () {
            $('.result')
                .append($('<div>Error accured! Enter valid parameters!</div>'));
        });
    $("#unpaid-phone").val('');
});

