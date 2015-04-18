function populateTable() {
    var typeSearch = localStorage.getItem("type");
    var featureSearch = localStorage.getItem("feature");
    
    ////
    /// will need to alter data[i] depending on name in table
    ///
    $(document).ready(function() {
        $.ajax({
            url: "http://rest-service.guides.spring.io/greeting"
        }).then(function(data) {
            var toAdd = '';
            for (var i = 0; i < data.length; i++)
                toAdd += "<tr><td onclick='clickedRow("+data[i]+");'>" + data[i] + "</td><td onclick='addToBoard("+data[i]+");'></td></tr>";
            
            toAdd += "<tr><td onclick=\"window.location.href='index.html'\"> ADDED THROUGH DYNAMIC </td><td onclick=\"window.location.href='criteria.html'\">+</td></tr>";
            $('#food').append(toAdd);
        });
    });   
    createTitle();
}

function clickedRow(id) {
    alert(id);
    localStorage.setItem("clickedFood", id); 
    window.location.href = "nutrition.html";
}

function addToBoard(id) {
    // Add into the local storage array of pec board foods
    if (localStorage.getItem("pecboard") === null)
        localStorage.setItem("pecboard", JSON.stringify(['', '', '', '']));
    
    var items = JSON.parse(localStorage.getItem("pecboard"));
    var found = false;
    for (var i = 0; i < items.length; i++) {
        if (items[i] === '') {
            items[i] = id;
            found = true;
            break;
        } 
    }     
    
    localStorage.setItem("pecboard", JSON.stringify(items));
    
    if (!found) {
        // There is no room in the array, put an error
    }
    else {
        // confirmation message 
    }
}

function createTitle() {
    var toAdd = '';
    var type = localStorage.getItem("type");
    var feature = localStorage.getItem("feature");
    var first = localStorage.getItem("first");
    
    if (first === 'Texture')
       toAdd += feature + ' Textured'; 
    else if (first === 'Color')
        toAdd += feature + ' Colored';
    else if (first === 'Taste')
        toAdd += feature + ' Tasting';
    toAdd += ' Food';
    
    if (type !== null)
        toAdd += ' (' + type + ')';
    
    $('#help').append(toAdd);
}