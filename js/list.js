function init(){
    bugs = JSON.parse(data_bugs);
    developers = JSON.parse(data_developers)
    for(var i=0; i<developers.length; i++){
    add_developers_to_carosuel(developers[i].image)
    }
    for(var i=0; i<developers.length; i++){
        add_developers_to_carosuel(developers[i].image)
        }
};

function add_developers_to_carosuel(image_src){
    carosuel = document.getElementById("carousel");
    dev = create_dev_html_el(image_src)
    carosuel.appendChild(dev);
}

function create_dev_html_el(image_src){
    var figure =  document.createElement("figure");
    var image = document.createElement("img")
    image.src = image_src;
    var img = figure.appendChild(image);
    return figure;
}

function test(){
    alert("hej");
};

init();