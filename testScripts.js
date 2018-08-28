var fromWhere = document.referrer;

var referrerOutput = document.getElementById('pageReferrer');
var referrerCookie = document.getElementById('pageCookie');

referrerOutput.textContent = fromWhere;

document.cookie = "username=John Doe";
document.cookie = "referrer=" + fromWhere;

var fromCookie = document.cookie;

referrerCookie.textContent = fromCookie;