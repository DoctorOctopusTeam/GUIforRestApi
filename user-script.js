// get subscriber info
$('#btn-info').click(function(ev){
    ev.preventDefault();
    var subscriber = $("#phone-info").val();
    console.log(subscriber);
    $.ajax({

        type: 'GET',

        url: 'http://localhost:8080/user/info/'+subscriber,

        headers: {
            "Content-Type" : "application/json",

            "Authorization" : localStorage.getItem("token")

        }
    }).done(function (data){
    
        $('.result')
        .append($('<div/> First name:' + data['First name']  ));
        

       })
   
});