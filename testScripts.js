function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

var pageReferrer = new URL(document.referrer.toString());
var pageReferrerHostname = pageReferrer.hostname;
const pageCookie = document.cookie;
var cookieValue = getCookie('referrer');

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    var referrerOutput = document.getElementById('pageReferrer');
    var referrerHostnameOutput = document.getElementById('pageReferrerHostname');
    var cookieOutput = document.getElementById('pageCookie');
    var cookieNewOutput = document.getElementById('pageCookieNew');

    referrerOutput.textContent = pageReferrer;
    referrerHostnameOutput.textContent = pageReferrerHostname;
    cookieOutput.textContent = pageCookie;

    if (!cookieValue && pageReferrerHostname !== 'voloshko.com') {
        document.cookie = "referrer=" + pageReferrer;
    }

    const pageCookieNew = document.cookie;
    cookieNewOutput.textContent = pageCookieNew;
});


