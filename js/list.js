function init() {
    bugs = JSON.parse(data_bugs);
    developers = JSON.parse(data_developers)
    for (var i = 0; i < developers.length; i++) {
        add_developers_to_carosuel(developers[i].image)
    }
    for (var i = 0; i < developers.length; i++) {
        add_developers_to_carosuel(developers[i].image)
    }
    for (var i = 0; i < bugs.length; i++) {
        add_bug_to_list(bugs[i].name)
    }
};

function add_developers_to_carosuel(image_src) {
    carosuel = document.getElementById("carousel");
    if (carosuel !== null) {
        dev = create_dev_html_el(image_src)
        carosuel.appendChild(dev);
    }
}

function add_bug_to_list(name) {
    bug_list = document.getElementById("bug-list")
    if (bug_list !== null) {
        bug_list.appendChild(create_bug_el(name))
    }
}

function create_dev_html_el(image_src) {
    var figure = document.createElement("figure");
    var image = document.createElement("img")
    image.src = image_src;
    var img = figure.appendChild(image);
    return figure;
}

function create_bug_el(name) {
    var el = document.createElement("li");
    el.innerText = name;
    localStorage.setItem("bug_name", name);
    el.onclick = function() { window.location.href = "https://kamilulianowski.github.io"};
    return el;
}

function test() {
    alert("hej");
};

init();