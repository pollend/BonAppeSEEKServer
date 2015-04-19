function updateTexture(menu) {
    var option = document.createElement("option");
    option.text = "Dry";
    option.value = "Dry";
    menu.appendChild(option);

    var option2 = document.createElement("option");
    option2.text = "Liquid";
    option2.value = "Liquid";
    menu.appendChild(option2);

    var option3 = document.createElement("option");
    option3.text = "Chewy";
    option3.value = "Chewy";
    menu.appendChild(option3);

    var option4 = document.createElement("option");
    option4.text = "Crunchy";
    option4.value = "Crunchy";
    menu.appendChild(option4);

    var option5 = document.createElement("option");
    option5.text = "Mushy/Soft";
    option5.value = "Soft";
    menu.appendChild(option5);
}
function updateTaste(menu) {
    var option = document.createElement("option");
    option.text = "Sweet";
    option.value = "Sweet";
    menu.appendChild(option);

    var option2 = document.createElement("option");
    option2.text = "Sour";
    option2.value = "Sour";
    menu.appendChild(option2);

    var option3 = document.createElement("option");
    option3.text = "Salty";
    option3.value = "Salty";
    menu.appendChild(option3);

    var option4 = document.createElement("option");
    option4.text = "Bitter";
    option4.value = "Bitter";
    menu.appendChild(option4);
}

function updateColor(menu) {
    var option = document.createElement("option");
    option.text = "Red";
    option.value = "Red";
    menu.appendChild(option);

    var option2 = document.createElement("option");
    option2.text = "Orange";
    option2.value = "Orange";
    menu.appendChild(option2);

    var option3 = document.createElement("option");
    option3.text = "Yellow";
    option3.value = "Yellow";
    menu.appendChild(option3);

    var option4 = document.createElement("option");
    option4.text = "Green";
    option4.value = "Green";
    menu.appendChild(option4);

    var option5 = document.createElement("option");
    option5.text = "White";
    option5.value = "White";
    menu.appendChild(option5);

}
function alter(val) {
    var menu = document.getElementById("second");
    menu.options.length=0;
    var begin = document.createElement("option");
    begin.text = "Specifically";
    begin.value = "null";
    menu.appendChild(begin);

    if (val === "Texture") {
        updateTexture(menu);
    }

    else if (val === "Taste") {
        updateTaste(menu);
    }

    else if (val === "Color") {
        updateColor(menu);
    }
    else {
        
    }
}