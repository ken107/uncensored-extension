
document.addEventListener("DOMContentLoaded", function() {
    var urlInput = document.getElementById("inp-url");
    var copyButton = document.getElementById("btn-copy");
    var successText = document.getElementById("txt-success");

    getActiveTab()
        .then(function(tab) {
            urlInput.value = tab.url;
        })

    copyButton.addEventListener("click", function() {
        urlInput.select();
        urlInput.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy");
        copyButton.style.display = "none";
        successText.style.display = "block";
    })
})
