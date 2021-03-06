// ==UserScript==
// @name         plug bot
// @version      1.0
// @description  plug bot
// @author       L0laapk3
// @grant        none
// @match        https://plug.dj/*/
// @downloadURL  https://rawgit.com/L0laapk3/plugbot/master/run.js
// ==/UserScript==

function load(i) {
	try {
		window.botloaded = false;
		if (!$)
			return setTimeout(function() { load(i + 1); }, 50);
		$.getScript("https://rawgit.com/L0laapk3/plugbot/master/code.js").fail(function() {
			try {
				API.sendChat("critical error with bot code, please contact @L0laapk3 asap");
			} catch (_) {}
			console.error("\n\n\n\n\nBOT ERROR!!!!!!!!!!!!!!!!!!! noerror");
			setTimeout(function() { location.reload(); }, 30 * 60 * 1000); //try reboot every 30 minutes
			API.on(API.CHAT, function(data) { if (data.message === ".reload" || [3831882, 4817243, 5032850].indexOf(data.uid) >= 0) location.reload(); }); //manual reboot
		}).done(function() {
			setTimeout(function() {
				if (!window.botloaded) {
					try {
						API.sendChat("critical error with bot code, please contact @L0laapk3 asap");
					} catch (_) {}
					console.error("\n\n\n\n\nBOT ERROR!!!!!!!!!!!!!!!!!!! noerror");
					setTimeout(function() { location.reload(); }, 30 * 60 * 1000); //try reboot every 30 minutes
					API.on(API.CHAT, function(data) { if (data.message === ".reload" || [3831882, 4817243, 5032850].indexOf(data.uid) >= 0) location.reload(); }); //manual reboot
				}
			}, 60000); //give code 60 (!) sec to init...
		});
	} catch (ex) {
		setTimeout(function() {
			try {
				API.sendChat("critical error with bot code, please contact @L0laapk3 asap");
				API.sendChat("error: " + ex);
			} catch(_) {}
		}, 10000);
		console.error("\n\n\n\n\nBOT ERROR!!!!!!!!!!!!!!!!!!!" + ex);
		API.on(API.CHAT, function(data) { if (data.message === ".reload" || [3831882, 4817243, 5032850].indexOf(data.uid) >= 0) location.reload(); }); //manual reboot
		setTimeout(function() { location.reload(); }, 30 * 60 * 1000); //try reboot every 30 minutes
	}
}

function checkload(i) {
	i = i || 0;
    if (i > 300) return location.reload();
    try {
        $("#history-button:not('.selected')").click();
        if ((!API) || (!$("#history-panel .timestamp").length) || (!API.getHistory()) || (API.getHistory().length <= 0) || ($("#chat-messages").length <= 0)) return setTimeout(checkload, 100, i + 1);
    } catch (ex) {
        return setTimeout(checkload, 100, i + 1);
    }
    load(0);
}
window.addEventListener('load', function() {
	$(checkload);
});
