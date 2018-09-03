//1 get subscriber info
$('#btn-info').click(function(ev){
    ev.preventDefault();
    $(".result").html("");
    var subscriber = $("#phone-info").val();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/info/'+subscriber,
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("token")
        }
    }).done(function (data){
        $('.result')
        .append($('<div>Details for Subscriber with Phone nomer:' + data['Phone number'] + '</div>'))
        .append($('<div>First name:' + data['First name'] + '</div>'))
        .append($('<div>Last name:' + data['Last name'] + '</div>'))
        .append($('<div>EGN:' + data['EGN'] + '</div>'));
       })
       $("#phone-info").val('');
       
});

//2 get subcriber services
$('#btn-services').click(function(ev){
    ev.preventDefault();
    $(".result").html("");
    var subscriber = $("#phone-services").val();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/services/'+subscriber,
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("token")
        }
    }).done(function (data){
        $('.result')
        .append($('<div>Details for used services by Subscriber with Phone nomer:' + subscriber + '</div>'))
        .append($('<div>' + data + '</div>'))
       })
       $("#phone-services").val('');
});

//3 get max payments
$('#btn-max').click(function(ev){
    ev.preventDefault();
    $(".result").html("");
    var subscriber = $("#phone-max").val();
    var start = $("#max-start-date").val();
    var end = $("#max-end-date").val();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/reports/max/'+subscriber + '/' + start + '/' + end,
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("token")
        }
    }).done(function (data){
        $('.result')
        .append($('<div>The biggest amout paid for service by subscriber with phone number:' + subscriber + '</div>'))
        .append($('<div>For period: from ' + start + ' to ' + end + '</div>'))
        .append($('<div>Service: ' + data['service'] + '</div>'))
        .append($('<div>Amount: ' + data['amount'] + ' BGN</div>'));
       })
       $("#phone-max").val('');
});

//4 get average of payments
$('#btn-average').click(function(ev){
    ev.preventDefault();
    $(".result").html("");
    var subscriber = $("#phone-average").val();
    var start = $("#average-start-date").val();
    var end = $("#average-end-date").val();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/reports/average/'+subscriber + '/' + start + '/' + end,
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("token")
        }
    }).done(function (data){
        $('.result')
        .append($('<div>The average amout paid for services by subscriber with phone number:' + subscriber + '</div>'))
        .append($('<div>For period: from ' + start + ' to ' + end + '</div>'))
        .append($('<div>Amount: ' + data['Average sum'] + ' BGN</div>'));
       })
       $("#phone-average").val('');
});

//5 get history of payments
$('#btn-history').click(function(ev){
    ev.preventDefault();
    $(".result").html("");

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/payments',
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("token")
        }
    }).done(function (response){
            var toAppend = '';
           $.each(response,function(i,o){
           toAppend += '<div> Bill ID:'+o.id+ ', Service:' + o.service + ', PayDate:' + o.payDate + ', Amount: ' + o.amount + 
         ' ' + o.currency + ', Name: ' + o.subscriber.firstName + ' ' + o.subscriber.lastName + ', Phone number: ' + 
           o.subscriber.phoneNumber + '</div>';
          });

         $('.result').append(toAppend);
        })
    
});

//6 get top 10 subscribers by biggest bills paid
$('#btn-top-ten').click(function(ev){
    ev.preventDefault();
    $(".result").html("");

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/user/reports/10biggest-amounts',
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("token")
        }
    }).done(function (response){
            var toAppend = '';
           $.each(response,function(i,o){
           toAppend += '<div>Amount: ' + o.amount + 
         ' BGN' + ', Name: ' + o.firstName + ' ' + o.lastName + ', Phone number: ' + 
           o.phoneNumber + '</div>';
          });

         $('.result').append(toAppend);
        })
    
});

//7 pay bill
$('#btn-pay').click(function(ev){
    ev.preventDefault();
    $(".result").html("");
    var id = $("#bill-id").val();

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/user/pay/' + id,
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("token")
        },
        data: JSON.stringify({
            "id": id
        })
    }).done(function() {
            
         $('.result').append('Bill with ID: ' + id + ' was paid!');
        })
    
});

