function updateTexture(menu) {
    var option = document.createElement("option");
    option.text = "dry";
    option.value = "dry";
    menu.appendChild(option);

    var option2 = document.createElement("option");
    option2.text = "liquid";
    option2.value = "liquid";
    menu.appendChild(option2);

    var option3 = document.createElement("option");
    option3.text = "chewy";
    option3.value = "chewy";
    menu.appendChild(option3);

    var option4 = document.createElement("option");
    option4.text = "crunchy";
    option4.value = "crunchy";
    menu.appendChild(option4);

    var option5 = document.createElement("option");
    option5.text = "Mushy/Soft";
    option5.value = "soft";
    menu.appendChild(option5);
}
function updateTaste(menu) {
    var option = document.createElement("option");
    option.text = "sweet";
    option.value = "sweet";
    menu.appendChild(option);

    var option2 = document.createElement("option");
    option2.text = "sour";
    option2.value = "sour";
    menu.appendChild(option2);

    var option3 = document.createElement("option");
    option3.text = "salty";
    option3.value = "salty";
    menu.appendChild(option3);

    var option4 = document.createElement("option");
    option4.text = "bitter";
    option4.value = "bitter";
    menu.appendChild(option4);
}

function updateColor(menu) {
    var option = document.createElement("option");
    option.text = "red";
    option.value = "red";
    menu.appendChild(option);

    var option2 = document.createElement("option");
    option2.text = "orange";
    option2.value = "orange";
    menu.appendChild(option2);

    var option3 = document.createElement("option");
    option3.text = "yellow";
    option3.value = "yellow";
    menu.appendChild(option3);

    var option4 = document.createElement("option");
    option4.text = "green";
    option4.value = "green";
    menu.appendChild(option4);

    var option5 = document.createElement("option");
    option5.text = "white";
    option5.value = "white";
    menu.appendChild(option5);

}
function alter(val) {
    var menu = document.getElementById("second");
    menu.options.length=0;
    var begin = document.createElement("option");
    begin.text = "Specifically";
    begin.value = "null";
    menu.appendChild(begin);

    if (val === "texture") {
        updateTexture(menu);
    }

    else if (val === "taste") {
        updateTaste(menu);
    }

    else if (val === "color") {
        updateColor(menu);
    }
    else {
        
    }
}