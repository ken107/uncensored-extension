var brapi = (typeof chrome != 'undefined') ? chrome : (typeof browser != 'undefined' ? browser : {});

function getActiveTab() {
    return new Promise(function(fulfill) {
        brapi.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
            fulfill(tabs[0]);
        })
    })
}

function getSettings(names) {
    return new Promise(function(fulfill) {
        brapi.storage.local.get(names, fulfill);
    })
}

function updateSettings(items) {
    return new Promise(function(fulfill) {
        brapi.storage.local.set(items, fulfill);
    })
}

function clearSettings() {
    return new Promise(function(fulfill) {
        brapi.storage.local.clear(fulfill);
    })
}
  
function insertCss(css) {
    var elem = document.createElement("STYLE");
    elem.type = "text/css";
    elem.appendChild(document.createTextNode(css));
    document.head.appendChild(elem);
}

function ajaxGet(url) {
    return new Promise(function(fulfill) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) fulfill(xhr.response);
            }
        };
        xhr.send(null);
    })
}
