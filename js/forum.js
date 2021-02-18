$(document).ready(function () {

    const forumBody = $("#forum-section")
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://collectionone-0bc0.restdb.io/rest/everything",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "602e11d35ad3610fb5bb620f",
            "cache-control": "no-cache"
        }
    };

    $.ajax(settings).done(function (response) {

    });


});
//end of doc