// ==UserScript==
// @name         plug bot
// @version      1.0
// @description  plug bot
// @author       L0laapk3
// @match        https://plug.dj/*/
// @downloadURL  https://rawgit.com/L0laapk3/plugbot/master/run.js
// ==/UserScript==

function load(i) {
	try {
		$.getScript("https://rawgit.com/L0laapk3/plugbot/master/run.js").fail(function() {
		    if (i > 3) return location.reload();
		    load(i + 1);
		}).done(function() {
			setTimeout(function() {
				try {
					API.sendChat("critical error with bot code, please contact @L0laapk3 asap");
				}
				console.error("\n\n\n\n\nBOT ERROR!!!!!!!!!!!!!!!!!!! noerror");
				setTimeout(function() { location.reload(); }, 30 * 60 * 1000); //try reboot every 30 minutes
			}, 60000); //give code 60 (!) sec to init...
		});
	} catch (ex) {
		setTimeout(function() {
			try {
				API.sendChat("critical error with bot code, please contact @L0laapk3 asap");
				API.sendChat("error: " + ex);
			}
		}, 10000);
		console.error("\n\n\n\n\nBOT ERROR!!!!!!!!!!!!!!!!!!!" + ex);
		setTimeout(function() { location.reload(); }, 30 * 60 * 1000); //try reboot every 30 minutes
	}
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
