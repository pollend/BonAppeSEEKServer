function generatePage() {
    var title = localStorage.getItem("clickedFood");
    $('#help').append(title);
    
        $(document).ready(function() {
        $.ajax({
            url: "http://rest-service.guides.spring.io/greeting"
        }).then(function(data) {
            var nutrition = '', foodImage= '<br>';
            
            // Must get food image and nutrition dynamic from data
            nutrition += "<img src=\"img/test.jpg\" id='inner'/>";
            
            $('#help').append(foodImage);
            $('#image').append(nutrition);
        });
    });   
}