var fromWhere;
var referrerOutput;
var referrerCookie;

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    fromWhere = document.referrer;
    referrerOutput = document.getElementById('pageReferrer');
    referrerCookie = document.getElementById('pageCookie');
    referrerOutput.textContent = fromWhere;

    document.cookie = "username=John Doe";
    document.cookie = "referrer=" + fromWhere;

    var fromCookie = document.cookie;

    referrerCookie.textContent = fromCookie;
});


