function init() {
    bugs = JSON.parse(data_bugs);
    developers = JSON.parse(data_developers)
    for (var i = 0; i < developers.length; i++) {
        add_developers_to_carosuel(developers[i].developer, developers[i].image)
    }
    for (var i = 0; i < developers.length; i++) {
        add_developers_to_carosuel(developers[i].developer, developers[i].image)
    }
    for (var i = 0; i < bugs.length; i++) {
        add_bug_to_list(bugs[i].name, bugs[i].bug_image)
    }
};

function add_developers_to_carosuel(dev_name, image_src) {
    carosuel = document.getElementById("carousel");
    if (carosuel !== null) {
        dev = create_dev_html_el(dev_name, image_src)
        carosuel.appendChild(dev);
    }
}

function add_bug_to_list(name, bug_image) {
    bug_list = document.getElementById("bug-list")
    if (bug_list !== null) {
        bug_list.appendChild(create_bug_el(name, bug_image))
    }
}

function create_dev_html_el(dev_name, image_src) {
    var figure = document.createElement("figure");
    var image = document.createElement("img")
    image.src = image_src;
    image.alt = dev_name
    var img = figure.appendChild(image);
    image.onclick = function () {
        // window.location.href = "https://kamilulianowski.github.io";
        localStorage.setItem("dev_name", this.alt);
        localStorage.setItem("dev_image", this.src);
    };
    return figure;
}

function create_bug_el(name, bug_image) {
    var el = document.createElement("li");
    el.innerText = name;
    el.onclick = function () {
        window.location.href = "https://kamilulianowski.github.io";
        localStorage.setItem("bug_name", name);
        localStorage.setItem("bug_image", bug_image);
    };
    return el;
}



function test() {
    alert("hej");
};

init();