function generatePage() {
    var title = localStorage.getItem("clickedFood");
    $('#help').append(title);
    
        $(document).ready(function() {
        $.ajax({
            url: "http://rest-service.guides.spring.io/greeting"
        }).then(function(data) {
            var toAdd = '';
            toAdd += "<img src=\"img/test.jpg\"/ id='inner'>";

            $('#image').append(toAdd);
        });
    });   
}