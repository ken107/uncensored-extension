
getSettings(["expireTime", location.hostname])
    .then(function(settings) {
        if (settings.expireTime > Date.now()) return settings;
        else return loadSettingsFromServer();
    })
    .then(function(settings) {
        var css = settings[location.hostname];
        if (css) insertCss(css);
    })


function loadSettingsFromServer() {
    return ajaxGet("https://propaganda-remover.lsdsoftware.com/propaganda-remover.css")
        .then(function(text) {
            var settings = {expireTime: Date.now() + 3600*1000};
            var tokens = text.split(/\n\/\*\s*(\S+?)\s*\*\//);
            for (var i=1; i<tokens.length; i+=2) settings[tokens[i]] = tokens[i+1];
            return clearSettings()
                .then(function() {return updateSettings(settings)})
                .then(function() {return settings})
        })
}
