function generatePage() {
    if (localStorage.getItem("pecboard") === null)
        localStorage.setItem("pecboard", JSON.stringify(['', '', '', '']));
    var items = JSON.parse(localStorage.getItem("pecboard"));
    var imgAdd = '';
    for (var i = 0; i < 4; i++) {
        if (items[i] !== '')
            imgAdd += "<img src=\"img/apple.png\" id=\"single\"/>"
        else
            imgAdd += "<img src=\"img/cork.jpg\" id=\"single\"/style='opacity:0'>";
        if (i === 1)
            imgAdd += '<br>';
    }
    /*
    // testing here
    imgAdd += "<img src=\"img/apple.png\" id=\"single\"/>" ; 
    imgAdd += "<img src=\"img/apple.png\" id=\"single\"/>"  ;
    imgAdd+= "<br>";
    imgAdd += "<img src=\"img/cork.jpg\" id=\"single\"/style='opacity:0'>";
    imgAdd += "<img src=\"img/cork.jpg\" id=\"single\"/style='opacity:0'>";
    */
    $('#images').append(imgAdd);
}