$('#first-query').click(function(ev){
    ev.preventDefault();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/user/payments',
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : localStorage.getItem("token")
        }
    }).done(function (data){
        console.log(data[0].id);
        console.log(data[0].amount);
        console.log(data[0].service);

        $('#first-query')
        .after($('<div/>',{class:'edno'})
        .append($('<div/>',{class: 'dve'})
        .append($('<div/>',{class:'tri',text:data[0].id}))
        .append($('<div/>',{class:'deset', text:data[0].service}))
        .append($('<div/>',{class:'4etiri', text: data[0].amount}))));
          }
                ).fail(function (xhr, status, error) {
        new Noty({
           text: 'ERROR: There was an error with your login.',
           layout: 'topCenter',
            type: 'error',
            theme: 'mint',
           timeout: 3000
       }).show();
    });
});





