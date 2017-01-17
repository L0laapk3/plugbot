// ==UserScript==
// @name         plug bot
// @version      1.0
// @description  plug bot
// @author       L0laapk3
// @match        https://plug.dj/*/
// @downloadURL  https://raw.githubusercontent.com/L0laapk3/plugbot/master/run.js
// ==/UserScript==

function load(i) {
	$.getScript("https://rawgit.com/L0laapk3/plugbot/master/run.js").fail(function() {
	    if (i > 3) return location.reload();
	    load(i + 1);
	});
}

function checkload(i) {
    if (i > 300) return location.reload();
    try {
        $("#history-button:not('.selected')").click();
        if ((!API) || (!$("#history-panel .timestamp").length)) return setTimeout(checkload, 100, i + 1);
    } catch (ex) {
        setTimeout(checkload, 100, i + 1);
    }
    load(0);
}
checkload(0);
