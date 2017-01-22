
setInterval(function() {
		if($(".dialog-frame > .title:contains('Session expired')").length)
    		setTimeou(function() {
    				location.reload();
        }, 2 * 60 * 1000); //reboot 2 minutes after someone logged into account
}, 5000);












$(".icon-emoji-on").click();


var chats = [];

function next(arr, i, track) {
    console.log(arr, i);
    if (arr.length <= i) return;
    API.sendChat((track ? "/me " : "") + arr[i].match(/[^ ]+(?: (?=.*[^ ]))?/g).join(""));
    console.log(track ? "track:" : "notrack:", arr[i].match(/[^ ]+(?: (?=.*[^ ]))?/g).join(""));
    if (track) chats.push(arr[i].match(/[^ ]+(?: (?=.*[^ ]))?/g).join(""));
    setTimeout(next, 1000, arr, i + 1, track);
}

function chat() {
    var a, b;
    if (a = (b = arguments)[0]) next(((("string" === typeof a) ? a : a[~~(Math.random() * a.length)]).replace("$name", API.getUser().username).replace(/\$\d+/g, function(c) {
        return b[parseInt(c.substring(1)) + 1];
    })).match(/[^ ]+(?: (?=.*[^ ]))?/g).join("").match(/(?:[^ ]|^)(?:.{0,248}[^ ](?= |$)|[^ ]{0,249})/g), 0, true);
}

function notrackchat() {
    var a, b;
    if (a = (b = arguments)[0]) next(((("string" === typeof a) ? a : a[~~(Math.random() * a.length)]).replace("$name", API.getUser().username).replace(/\$\d+/g, function(c) {
        return b[parseInt(c.substring(1)) + 1];
    })).match(/(?:[^ ]|^)(?:.{0,244}[^ ](?= |$)|[^ ]{0,248})/g), 0, false);
}

API.on(API.CHAT, function(data) { //cleans up own messages after 30 seconds
    if ((data.uid === API.getUser().id) && chats.filter(function(a) {
            return $(".text.cid-" + data.cid)[0].innerText.split("\n").some(function(b) {
                return b === a;
            }) && (chats.splice(chats.indexOf(a), 1) || true);
        }).length) {
        console.log("delete:", data.message, data);
        setTimeout(function() {
            API.moderateDeleteChat(data.cid);
        }, 60 * 1000);
    }
});

function fromname(name, exact) {
    var j;
    if ((users = API.getUsers()).some(function(a, i) {
            j = i;
            return name === ((exact) ? a.username : a.username.substring(0, name.length));
        })) return users[j];
}
var noskip = false;


var COUNTRIES = {
    AF: "Afghanistan",
    AX: "Åland Islands",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua and Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia (Plurinational State of)",
    BQ: "Bonaire, Sint Eustatius and Saba",
    BA: "Bosnia and Herzegovina",
    BW: "Botswana",
    BV: "Bouvet Island",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BN: "Brunei Darussalam",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    CV: "Cabo Verde",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CX: "Christmas Island",
    CC: "Cocos (Keeling) Islands",
    CO: "Colombia",
    KM: "Comoros",
    CG: "Congo",
    CD: "Congo (Democratic Republic of the)",
    CK: "Cook Islands",
    CR: "Costa Rica",
    CI: "Côte d'Ivoire",
    HR: "Croatia",
    CU: "Cuba",
    CW: "Curaçao",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Republic",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    ET: "Ethiopia",
    FK: "Falkland Islands (Malvinas)",
    FO: "Faroe Islands",
    FJ: "Fiji",
    FI: "Finland",
    FR: "France",
    GF: "French Guiana",
    PF: "French Polynesia",
    TF: "French Southern Territories",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Gemany",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Greece",
    GL: "Greenland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard Island and McDonald Islands",
    VA: "Holy See",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran (Islamic Republic of)",
    IQ: "Iraq",
    IE: "Ireland",
    IM: "Isle of Man",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JE: "Jersey",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "Korea (Democratic People's Republic of)",
    KR: "Korea (Republic of)",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao People's Democratic Republic",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MO: "Macao",
    MK: "Macedonia (the former Yugoslav Republic of)",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexico",
    FM: "Micronesia (Federated States of)",
    MD: "Moldova (Republic of)",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Netherlands",
    NC: "New Caledonia",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MP: "Northern Mariana Islands",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestine, State of",
    PA: "Panama",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Poland",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Romania",
    RU: "Russian Federation",
    RW: "Rwanda",
    BL: "Saint Barthélemy",
    SH: "Saint Helena, Ascension and Tristan da Cunha",
    KN: "Saint Kitts and Nevis",
    LC: "Saint Lucia",
    MF: "Saint Martin (French part)",
    PM: "Saint Pierre and Miquelon",
    VC: "Saint Vincent and the Grenadines",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome and Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapore",
    SX: "Sint Maarten (Dutch part)",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    GS: "South Georgia and the South Sandwich Islands",
    SS: "South Sudan",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SJ: "Svalbard and Jan Mayen",
    SZ: "Swaziland",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syrian Arab Republic",
    TW: "Taiwan, Province of China",
    TJ: "Tajikistan",
    TZ: "Tanzania, United Republic of",
    TH: "Thailand",
    TL: "Timor-Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad and Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TC: "Turks and Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    UM: "United States Minor Outlying Islands",
    US: "United States of America",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Venezuela (Bolivarian Republic of)",
    VN: "Viet Nam",
    VG: "Virgin Islands (British)",
    VI: "Virgin Islands (U.S.)",
    WF: "Wallis and Futuna",
    EH: "Western Sahara",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe"
};


var messages = {
    skip: {
        meh: {
            skip: ["The community has voted off this song"],
            setAmount: ["Amount of mehs required for skip set to $0", "Okay, now I need $0 mehs for voteskip."],
            setFail: ["pls noob"],
            skipCmd: ["Song will be skipped at $0 mehs!", "I need $0 mehs for skip.", "In $0 this song will be terminated."]
        },
        op: ["That song is overplayed, @$0 check this list before playing again --> http://bit.ly/dteoplist", "Your song is on our Overplayed list, @$0 check this list before playing again --> http://bit.ly/dteoplist"],
        age: ["That video is age restricted! @$0 please remove it from your playlist!", "This video has been rated as inappropriate! @$0 please remove it from your playlist!"],
        history: ["That song is in history!", "That song has been already played recently!", "Hmmm, I think I've heard this before... Oh, right, song is in history."],
        stuck: ["That song appears to be stuck, autoskipping", "Looks like plug is borked again, i'll skip it :)", "Oh noes Bug.DJ is at it again! Skipping..."],
        duration: ["That song is too long!", "That song is past the  minute limit", "That song is longer than 8 minutes!"],
        na: {
            na: ["That song is no longer available.", "That song has been removed!", "This song doesnt exist! :("],
            dj: ["@$0 please update your playlist, $1 - $2 doesn't seem to exist anymore"],
            region: ["@$0 this song is blocked in following countries: $1", "@$0 this song is blocked in $1"]
        }
    },
    control: {
        kill: ["$name has been disabled", "$name has been murdered", "$name has been killed", "Weee! Holidays! *shutting down*"],
        load: ["$name has loaded!"],
        ver: ["$name version 1.0.2.2 || Created by @L0laapk3, with the help of @VitalCZ."],
        ping: ["pong!", "pong!", "pong!", "kong! ... No, wait ... pong!"], //different weights on messages
        help: ["go fk urself :3"],
        plughelp: ["Here: http://i.imgur.com/ZeRR07N.png"],
        msg: {
            msg: ["@$0 the message '$1' will be repeated every $2 minutes."],
            reset: ["@$0 automessage has been cleared"],
            wrong: ["@$0 thats not how it works u retard"]
        }
    },
    noSkip: {
        noSkip: ["Next song will not be skipped automatically."],
        now: ["This song will not be skipped! Skipping will continue normally after this song..", "Not skipping this video, next one will be skipped normally"],
        yesSkip: ["Next song will be skipped if it would normally"]
    },
    giveSpot: {
        all: ["Alright, who wants @$0's ($1) spot? Type \"me\" in chat if you want it!", "@$0 ($1) is giving out his spot, who wants it? Type \"me\" if you want it!"],
        nope: ["hahaha @$0 nice try!", "@$0 you can give spot only to someone who is at higher place than you.", "@$0 @$1 is higher in the waitlist, you can't do that!"],
        swap: ["swapping @$0 with @$1"],
        noone: ["@$0 sorry, can't find this user", "@$0 Sorry, but that user does not exist", "Alright, swapping with.. Wait, where did they go?!"],
        high: ["@$0 sorry, but there is noone you could give your spot to."],
        noSongs: ["@$0 you can't do that, @$1 doesn't have any songs queue'd up!", "@$1 you'll need to add a song to your playlist first if you want @$0's spot!"],
        dj: ["@$0 you can't do that, @$1 is DJ'ing right now!", "Sorry, but @$1 does not need your spot. He is already DJing."]
    },
    eta: {
        notWaitList: ["@$0 You need to join the waitlist first!", "@$0 You are not in the waitlist.", "Infinite. But joining the waitlist can reduce it alot.", "Unable to say, when you aren't in waitlist."],
        dj: ["@$0 you're DJing at the moment!", "@$0 it's your turn at the moment!", "@$0 umm.. Do I really have to look at where are you on the list? YOU ARE PLAYING.", "@$0 its your turn in -$1 seconds! :)"],
        eta: ["@$0 It's your turn $1.", "@$0 You will play $1."]
    },
    dc: {
        disabled: ["Sorry, but DC function has been disabled.."],
        nope: ["@$0 nope!", "@$0 Sorry, but you are not in my database.", "HAH! Looks like you have to wait again :trollface:"],
        dc: ["@$0 disconnected $1 Moving back to spot $2"]
    },
    rules: {
        rules: ["Please follow our rules to help us make this community more friendly: http://www.dtebot.us/rules.html", "To enjoy your stay, please follow the rules listed here: http://www.dtebot.us/rules.html"],
        op: ["Please, check out this list to not be skipped! http://www.dtebot.us/op-list.html", "To avoid being skipped, read the OP list here: http://www.dtebot.us/op-list.html"],
        fb: ["http://bit.ly/DTandE-FB"],
        discord: ["Join our Discord!  https://discord.gg/013btJEZ8GTjKMsEO"]
    },
    fun: {
        sudo: ["$0 is not in the sudoers file. This incident will be reported."],
        potato: ["Sometimes, potatoes are spelled potatos by people who don't use e's", "Potatoes are vegetables but they contain a lot of starch (carbohydrates) that make them more like rice, pasta and bread in terms of nutrition.", "Much like rice, wheat and maize (corn), potato crops are an important part the world’s diet.", "The word potato comes from the Spanish word patata.", "Potato plants are usually pollinated by insects such as bumblebees.", "Potatoes contain a variety of vitamins and minerals.", "There are thousands of different potato varieties but not all are commercially available, popular ones include Russet, Yukon Gold, Kennebec, Desiree and Fingerling.", "While the role of genetic modification is up for debate, research has led to genetically modified potato varieties that have potential benefits such as increased protein and resistance to viruses.", "Based on 2010 statistics, China is the leading producer of potatoes.", "Potatoes don’t store very well after purchase but they are relatively easy to grow.", "Potato storage facilities are kept at temperatures above 4 °C (39 °F) as potato starch turns into sugar and alters the taste below this temperature.", "Potatoes are prepared and served in many different ways, including boiled potatoes, mashed potatoes, baked potatoes, French fries and hash browns.", "French fries contain a lot of fat so don’t eat too many!", "Potatoes are usually served hot, but sometimes cold in the form of potato chips or potato salad.", "Despite health concerns, potato chips are one of the most common snack foods in the world with billions of packets being consumed every year.", "One of the main causes of the Great Famine in Ireland between 1845 and 1852 was a potato disease known as potato blight. The shortage of potatoes led to the death of around 1 million people who were dependent on them as a food source.", "Although it shares the same name, the sweet potato is a root vegetable and only loosely related to the potato.", "Potatoes are sometimes called spuds.", "Today potatoes are grown in all 50 states of the USA and in about 125 countries troughout the world.", "The sweet potato belongs in the same family as morning glories while the white potato belongs to the same group as tomatoes, tobacco, chile pepper, eggplant and the petunia.", "The potato is about 80% water and 20% solids.", "Potato blossoms used to be a big hit in royal fashion. Potatoes first became fashionable when Marie Antoinette paraded through the French countryside wearing potato blossoms in her hair."],
        cookie: ["You're doomed to hell if you ain't eating cookies with milk!"],
        swag: ["http://k37.kn3.net/ED68C6105.gif"],
        aptget: ["Failed to fetch http://ppa.launchpad.net/plugdj/dte/bot/important 404 Not Found", "Some index files failed to download. They have been ignored, or old ones used instead."],
        halp: ["How To Gets Halp: http://matheusavellar.github.io/plug/dtebot", "How To Gets Halp: https://meamme.github.io/", "How To Gets Halp: http://dtebot.us/"],
        rm: ["OMG! YOU JUST BROKE THE INTERNET!", "Unable to run the command, are you root?"],
        gif: {
            gif: ["@$0 $1 (tags: $2)"],
            none: ["@$0 no gifs found! (for tags: $1)"],
            random: ["@$0 $1"]
        },
        report: {
            one: ["@$0 u have been reported m9-1", "reproted @$0"],
            all: ["REPORT ME TEAM PLS", "gg I can't carry these noobs, report everyone pls"]
        },
        bouncer: ["@$0 your bouncer will arive in 14 business days!"],
        shit: ["@$0 ​What the fuck did you just fucking say about me, you НO0ОଠOOOOOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ? I’ll have you know I graduated top of my class in the good shit go౦ԁ sHit academy, and I’ve been involved in numerous secret raids on Baaddd ShIT, and I have over 300 confirmed (chorus: ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ). I am trained in goOd sHit warfare and I’m the top shiter in the entire US armed mMMMMᎷМ. You are nothing to me but just another Baaa AaAadDddD Sh1t. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, thats what im talking about right there right there . You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of go౦ԁ sHit across the USA and your IP is being traced right there right there, so if i do ƽaү so my self i say so, you better prepare for the storm, НO0ОଠOOOOOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, I could be right there right there and I can kill you in over seven hundred ways, and that’s just with my bare (chorus: ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ). Not only am I extensively trained in mMMMMᎷМ combat, but I have access to the entire arsenal of the United States Good shit Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little BAAaAaAaAd shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking shit. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, НO0ОଠOOOOOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ."]
    }
};


if (!localStorage.repeatmsg) localStorage.repeatmsg = "";
repeatmsg = (localStorage.repeatmsg.length > 0) ? setInterval(function() {
    notrackchat(localStorage.repeatmsg);
}, localStorage.repeattime) : "";


var OP = [
    /(?=.*Different Heaven|.*ReesaLunn)(?=.*Pentakill)(?!.*remix|.*mashup|.*bootleg)/i,
    /(?=.*Rootkit)(?=.*Do It)(?!.*remix|.*mashup|.*bootleg)/i,
    /(?=.*KDrew)(?=.*Bullseye)(?!.*remix|.*mashup|.*bootleg)/i,
    /(?=.*Ahrix)(?=.*Nova)(?!.*remix|.*mashup|.*bootleg)/i,
    /(?=.*OMFG)(?=.*Hello)(?!.*remix|.*mashup|.*bootleg)/i
];





var googlekey = "AIzaSyDmilFjSXzh_sN6kEMwcwU0Z55ttmS5Xeg";
var sckey = "06638c895e5070f4e4564ee2ea847695";
var giphykey = "dc6zaTOxFJmzC"; //dev key, has cap




var permissions = {
    everyone: function(user) {
        return true;
    },
    resident: function(user) {
        return user.role >= 1;
    },
    bouncer: function(user) {
        return user.role >= 2;
    },
    manager: function(user) {
        return user.role >= 3;
    },
    cohost: function(user) {
        return user.role >= 4;
    },
    owner: function(user) {
        return user.role >= 5;
    },
    plus: function(user) {
        var allowed = [3831882, 4817243, 5032850]; //L0laapk3 + BOT + L0Iaapk3
        return -1 !== allowed.indexOf(user.id);
    },
    residentplus: function(user) {
        return permissions.plus(user) || permissions.resident(user); //ppl above or RDj+
    },
    bouncerplus: function(user) {
        return permissions.plus(user) || permissions.bouncer(user); //ppl above or Bouncer+
    },
    managerplus: function(user) {
        return permissions.plus(user) || permissions.manager(user); //ppl above or manager+
    },
    cohostplus: function(user) {
        return permissions.plus(user) || permissions.cohost(user); //ppl above or cohost+
    },
    ownerplus: function(user) {
        return permissions.plus(user) || permissions.owner(user); //ppl or cohost+
    }
};




var lastgif = 0;

var commands = [{
    name: ".ping",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.control.ping);
    }
}, {
    name: ".rules",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.rules.rules);
    }
}, {
    name: ".discord",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.rules.discord);
    }
}, {
    name: ".op",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.rules.op);
    }
}, {
    name: ".ver",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.control.ver);
    }
}, {
    name: ".noskip",
    permission: permissions.bouncerplus,
    run: function(data) {
        chat((noskip = !noskip) ? messages.noSkip.noSkip : messages.noSkip.yesSkip);
    }
}, {
    name: /^\.(kill|die)$/,
    permission: permissions.managerplus,
    run: function(data) {
        localStorage.disabled = "true";
        chat(messages.control.kill);
        location.reload();
    }
}, {
    name: ".reload",
    permission: permissions.bouncerplus,
    run: function(data) {
        location.reload();
    }
}, {
    name: ".eta",
    permission: permissions.everyone,
    run: function(data) {
        if (API.getDJ().id === data.uid) return chat(messages.eta.dj, data.un, API.getTimeElapsed());
        var waitlistPosition = API.getWaitListPosition(data.uid);
        var av = JSON.parse(localStorage.average);
        var eta = waitlistPosition * av.average / av.n + API.getTimeRemaining();
        var hours = ~~(eta / 3600);
        var minutes = ~~(eta / 60) % 60;
        var seconds = ~~(eta % 60);
        var hourstring = (hours) ? (hours + ((hours === 1) ? " hour" : " hours")) : "";
        var minutestring = (minutes) ? (minutes + ((minutes === 1) ? " minute" : " minutes")) : "";
        var secondstring = (seconds) ? (seconds + ((seconds === 1) ? " second" : " seconds")) : "";
        var array = [];
        if (hourstring) array.push(hourstring);
        if (minutestring) array.push(minutestring);
        if (secondstring) array.push(secondstring);
        var string;
        if (array.length === 0) string = "now";
        if (array.length === 1) string = "in around " + array[0];
        if (array.length === 2) string = "in around " + array.join(" and ");
        if (array.length === 3) string = "in around " + array.shift() + ", " + array.join(" and ");
        if (waitlistPosition >= 0) {
            chat(messages.eta.eta, data.un, string);
        } else {
            chat(messages.eta.notWaitList, data.un);
        }
    }
}, {
    name: ".dc",
    permission: permissions.everyone,
    run: function(data) {
        var a, dc = localStorage["dc-" + data.uid];
        if (!dc || (localStorage.removeItem("dc-" + data.uid), (a = JSON.parse(dc)).time + 60 * 60 * 1000 < new Date().getTime()) || (a.spot > API.getWaitListPosition(data.uid))) return chat(messages.dc.nope, data.un);
        var minutes = ~~(((new Date().getTime()) - a.time) / 60 / 1000);
        chat(messages.dc.dc, data.un, (minutes) ? (minutes + " minute" + ((minutes === 1) ? "" : "s") + " ago.") : "just now.", a.spot);
        move(data.uid, a.spot, 0);
    }
}, {
    name: /^\.mehs?/,
    permission: permissions.managerplus,
    run: function(data) {
        var number, mehs = data.message.split(" ").splice(1).join("").split("+");
        if (mehs && mehs.length > 0) {
            //((number = parseInt(mehs)) > 0)
            mehsBase = 0;
            mehsScale = 0;
            mehs.forEach(function(a) {
                if (-1 === a.indexOf("n")) {
                    mehsBase += parseInt(a);
                } else {
                    mehsScale += parseFloat(a.split("").filter(function(a) {
                        return /[\d.]/.test(a);
                    }).join(""));
                }
            });
            if (mehsBase + mehsScale === 0 || !(mehsBase >= 0) || !(mehsScale >= 0))
                return chat(messages.skip.meh.setFail);
            localStorage.mehsneeded = mehsBase;
            localStorage.mehsneededscale = mehsScale;
            chat(messages.skip.meh.setAmount, mehsBase + (mehsScale === 0 ? "" : " + " + Math.round(mehsScale * 100) / 100 + "n"));
        }
    }
}, {
    name: /^(skip|\.skip|skip please)$/,
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.skip.meh.skipCmd, Math.round(parseInt(localStorage.mehsneeded) + API.getUsers().length * parseFloat(localStorage.mehsneededscale)));
    }
}, {
    name: ".givespot",
    permission: permissions.everyone,
    run: function(data) {
        var user = data.message.split(" ")[1];
        if (user) {
            var nuser = fromname(user.substring(1), false);
            if (!nuser) return chat(messages.giveSpot.noone, data.un);
            if (nuser.id === API.getDJ().id) return chat(messages.giveSpot.dj, data.un, nuser.username);
            if ((a = API.getWaitListPosition(data.uid) >>> 0) >= (b = API.getWaitListPosition(nuser.id) >>> 0)) return chat(messages.giveSpot.nope, data.un, nuser.username);
            move(nuser.id, a + 1, 0, false, function(canmove) {
                if (canmove) {
                    move(data.uid, b + 1, 0, true);
                    chat(messages.giveSpot.swap, data.un, nuser.username);
                } else chat(messages.giveSpot.noSongs, data.un, nuser.username);
            });
        } else {
            if ((a = (API.getWaitListPosition(data.uid) >>> 0) + 1) >= API.getWaitList().length) return chat(messages.giveSpot.high, data.un);
            givespot = (givespot) ? Math.min(givespot, API.getWaitListPosition(data.uid) + 1) : (API.getWaitListPosition(data.uid) + 1);
            if (cleargivespot) clearTimeout(cleargivespot);
            cleargivespot = setTimeout(function() {
                givespot = undefined;
            }, 300 * 1000);
            API.moderateRemoveDJ(data.uid);
            chat(messages.giveSpot.all, data.un, a);
        }
    }
}, {
    name: ".help",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.control.help);
    }
}, {
    name: ".plughelp",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.control.plughelp);
    }
}, {
    name: ".sudo",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.fun.sudo);
    }
}, {
    name: ".potato",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.fun.potato);
    }
}, {
    name: ".cookie",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.fun.cookie);
    }
}, {
    name: /shit [^ ]*bot/,
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.fun.shit, data.un;
    }
}, {
    name: ".swag",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.fun.swag);
    }
}, {
    name: ".apt-get",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.fun.aptget);
    }
}, {
    name: ".rm -rf /",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.fun.rm);
    }
}, {
    name: ".halp",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.fun.halp);
    }
}, {
    name: ".bouncer",
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.fun.bouncer, data.un);
    }
}, {
    name: ".report",
    permission: permissions.everyone,
    run: function(data) {
        if (data.message.split(" ").length > 1) return chat(messages.fun.report.one, data.message.replace(/^[^ ]* ?@/, ""));
        chat(messages.fun.report.all);
    }
}, {
    name: /^\.(fb|facebook)$/,
    permission: permissions.everyone,
    run: function(data) {
        chat(messages.rules.fb);
    }
}, {
    name: ".msg",
    permission: permissions.managerplus,
    run: function(data) {
        var time, args = data.message.substring(5).split(" ");
        if (args.length === 1) {
            localStorage.repeatmsg = "";
            clearInterval(repeatmsg);
            chat(messages.control.msg.reset, data.un);
        } else if ((args.length < 2) || isNaN(time = parseInt(args[0]) * 1000 * 60) || (time < 0)) {
            chat(messages.control.msg.wrong, data.un);
        } else {
            if (repeatmsg)
                clearInterval(repeatmsg);
            localStorage.repeattime = time;
            localStorage.repeatmsg = args.splice(1).join(" ");
            repeatmsg = setInterval(function() {
                notrackchat(localStorage.repeatmsg);
            }, time);
            chat(messages.control.msg.msg, data.un, localStorage.repeatmsg, time / 1000 / 60);
        }
    }
}, {
    name: ".gif",
    permission: permissions.everyone,
    run: function(data) {
        if (lastgif + 10 * 1000 >= new Date().getTime()) return;
        lastgif = new Date().getTime();
        if (data.message.length > 5) $.get("https://api.giphy.com/v1/gifs/search?api_key=" + giphykey + "&limit=100&rating=pg-13&q=" + data.message.substring(5).replace(/ /g, "+"), function(a) {
            if (a.data.length === 0) return chat(messages.fun.gif.none, data.un, data.message.substring(5).replace(/ /g, ", "));
            $(".text[class^='text cid-" + API.getUser().id + "']:contains('giphy.com/media'), .text[class^='text cid-" + API.getUser().id + "']:contains('amazonaws.com/giphygifs/media')").each(function(i, e) {
                API.moderateDeleteChat($(e).attr('class').substring(9));
            });
            chat(messages.fun.gif.gif, data.un, a.data[Math.floor(a.data.length * Math.random())].images.original.url, data.message.substring(5).replace(/ /g, ", "));
        });
        else $.get("https://api.giphy.com/v1/gifs/random?rating=pg-13&api_key=" + giphykey, function(a) {
            $(".text[class^='text cid-" + API.getUser().id + "']:contains('giphy.com/media'), .text[class^='text cid-" + API.getUser().id + "']:contains('amazonaws.com/giphygifs/media')").each(function(i, e) {
                API.moderateDeleteChat($(e).attr('class').substring(9));
            });
            chat(messages.fun.gif.random, data.un, a.data.image_url);
        });
    }
}];


function googl(url, callback) {
    //TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
}


var givespot, cleargivespot;
API.on(API.CHAT, function(data) {
    if (!givespot || (data.message !== "me") || ((a = (API.getWaitListPosition(data.uid) >>> 0) + 1) <= givespot)) return;
    if (cleargivespot) {
        clearTimeout(cleargivespot);
        cleargivespot = undefined;
    }
    cleargivespot = setTimeout(function() {
        givespot = undefined;
    }, 30 * 1000);
    b = givespot;
    givespot = undefined;
    move(data.uid, b, 0, false, function(canmove) {
        if (a < API.getWaitList().length) {
            if (canmove) givespot = a;
            else givespot = b;
        } else {
            clearTimeout(cleargivespot);
            cleargivespot = undefined;
        }
    });
});


function move(id, spot, i, protect, callback) {
    console.log("move:", id, spot, protect, callback, i, API.getWaitListPosition(id));
    if ($("#dialog-alert span:contains('You cannot add that person to the booth because they don')").length || (id === API.getDJ().id)) {
        $("#dialog-alert .button.submit").click();
        if (callback) callback(false);
        return;
    }
    if (!(i % 25)) API.moderateAddDJ(id);
    if (-1 === API.getWaitListPosition(id)) return setTimeout(move, 100, id, spot, i + 1, protect, callback);
    if ((!protect) && (spot > API.getWaitListPosition(id))) {
        if (callback) callback(false);
        return;
    }
    API.moderateMoveDJ(id, Math.min(spot, API.getWaitList().length));
    if (callback) callback(true);
}





if (localStorage.disabled === "true") {
    if (confirm("Do you want to load the bot?")) {
        localStorage.disabled = false;
        init();
    }
} else init();


function init() {
    /*
    setTimeout(function () {
        location.reload();
    }, 30 * 60 * 1000);
    */






    function updatedclist() {
        $("#history-button:not('.selected')").click();
        if (!$("#history-panel .timestamp").length) return setTimeout(updatedclist, 100);
        var history = API.getHistory();
        var last = 0;
        console.log(localStorage["dcsong"], localStorage["dclast"], (new Date().getTime() - parseInt(localStorage["dctime"])) / 60 / 1000);
        $("#history-panel .meta").each(function(i, a) {
            last = i;
            var e = $(a);
            localStorage.removeItem("dc-" + history[i].user.id);
            console.log(history[i].media.cid, history[i].user.id, parseInt(e.children(".timestamp").text()), (-1 === e.children(".timestamp").text().indexOf("minutes")));
            return !((history[i].media.cid === localStorage["dcsong"]) && (history[i].user.id === parseInt(localStorage["dclast"])) && ((-1 === e.children(".timestamp").text().indexOf("minutes")) || (Math.abs((new Date().getTime() - parseInt(localStorage["dctime"])) / 60 / 1000 - parseInt(e.children(".timestamp").text())) <= 2)));
        });
        console.log("dc database updated! " + last + " songs updated");
        $("#history-button.selected").click();
        localStorage["dclast"] = (API.getDJ() || {
            id: localStorage["dclast"]
        }).id;
        localStorage["dctime"] = new Date().getTime();
        localStorage["dcsong"] = (API.getMedia() || {
            cid: localStorage["dcsong"]
        }).cid;
    }
    updatedclist();


    var skipEvent;
    new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (!$(mutation.addedNodes).filter(".moderation").length) return;
            var b = $(mutation.addedNodes).filter(".moderation").find(".text").text();
            b.replace(/removed (.+) from the/, function(_, user) {
                localStorage.removeItem("dc-" + fromname(user, true).id);
            });
            b.replace(/moved (.+) from position (\w+) to position (\w+) in/, function(_, user, from, to) {
                localStorage["dc-" + fromname(user, true).id] = JSON.stringify({
                    time: new Date().getTime(),
                    spot: to
                });
            });
            b.replace(/skipped the current DJ/, function() {
                if (skipEvent) {
                    skipEvent();
                    skipEvent = undefined;
                }
            });
        });
    }).observe($("#chat-messages")[0], {
        attributes: true,
        childList: true,
        characterData: true
    });



    function updatedc(data) {
        console.log("updating dc-list");
        data.forEach(function(a, i) {
            if (!localStorage["dc-" + a.id] || !JSON.parse(localStorage["dc-" + a.id]).spot || (JSON.parse(localStorage["dc-" + a.id]).spot >= i + 1)) localStorage["dc-" + a.id] = JSON.stringify({
                time: new Date().getTime(),
                spot: (localStorage["dc-" + a.id] && JSON.parse(localStorage["dc-" + a.id]).spot) ? Math.min(JSON.parse(localStorage["dc-" + a.id]).spot, i + 1) : (i + 1)
            });
        });
        console.log(localStorage["dc-5032850"]);
    }
    API.on(API.WAIT_LIST_UPDATE, updatedc);
    updatedc(API.getWaitList());

    API.on(API.USER_LEAVE, function(data) { //refresh <timer></timer>
        if (localStorage["dc-" + data.id]) localStorage["dc-" + data.id] = JSON.stringify({
            time: new Date().getTime(),
            spot: JSON.parse(localStorage["dc-" + data.id]).spot
        });
    });

    API.on(API.ADVANCE, function(data) { //remove data from ppl who dj
        localStorage["dclast"] = data.dj.id;
        localStorage["dctime"] = new Date().getTime();
        localStorage["dcsong"] = data.media.cid;
        localStorage.removeItem("dc-" + data.dj.id);
    });



    setInterval(function() {
        if ($("h1").innerText === "500 Error") return location.reload();
        API.djJoin();
        hasjoined(0);
    }, 15 * 1000);

    function hasjoined(i) {
        if (i >= 100) return location.reload();
        if (-1 === API.getWaitListPosition()) return setTimeout(function() {
            hasjoined(i + 1);
        }, 50);
        API.djLeave();
    }



    API.on(API.ADVANCE, function(data) {
        setTimeout(function() {
            $("#woot").click();
        }, 10 * 1000);
    });
    setTimeout(function() {
        $("#woot").click();
    }, 10 * 1000);



    if (!localStorage.mehsneeded) localStorage.mehsneeded = 5;
    if (!localStorage.mehsneededscale) localStorage.mehsneededscale = 0;

    var hasskipped = false;
    API.on(API.VOTE_UPDATE, function(data) {
        if (hasskipped) return;
        if (API.getScore().negative >= Math.round(parseInt(localStorage.mehsneeded) + parseFloat(localStorage.mehsneededscale) * API.getUsers().length)) {
            hasskipped = true;
            API.moderateForceSkip();
            notrackchat(messages.skip.meh.skip);
        }
    });



    if (!localStorage.average) localStorage.average = JSON.stringify({
        average: 0,
        n: 0
    });
    var lasttime;
    API.on(API.ADVANCE, function(data) {
        hasskipped = false;
        var a = JSON.parse(localStorage.average);
        if (lasttime) localStorage.average = JSON.stringify({
            average: a.average + ~~((new Date().getTime() - lasttime) / 1000),
            n: a.n + 1
        });
        lasttime = new Date().getTime();
    });



    var lastReloadInterval;

    function checkForSkip(data) {
        if (API.getHistory()[0].media.cid !== data.media.cid) return setTimeout(checkForSkip, 100, data);
        if (noskip) {
            chat(messages.noSkip.now);
            return noskip = false;
        }
        if (data.media.duration > 8 * 60) {
            API.moderateForceSkip();
            return notrackchat(messages.skip.duration);
        }
        if (API.getHistory().some(function(a, i) {
                return (i > 0) && (a.media.cid === data.media.cid);
            })) {
            API.moderateForceSkip();
            return notrackchat(messages.skip.history);
        }

        if (data.media.format === 1) { //youtube
            $.get("https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,status&id=" + data.media.cid + "&key=" + googlekey, function(a) {
                if (!a.items.length || (a.items[0].status.uploadStatus != "processed")) {
                    API.moderateForceSkip();
                    notrackchat(messages.skip.na.na);
                    if (!localStorage["brokenlast" + data.dj.id.toString()]) {
                        localStorage["brokenlast" + data.dj.id.toString()] = "true";
                        skipEvent = function() {
                            chat(messages.skip.na.dj, data.dj.username, data.media.author, data.media.title);
                            move(data.dj.id, 1, 0);
                        };
                    }
                    return;
                }
                localStorage.removeItem("brokenlast" + data.dj.id.toString());
                if (a.items[0].contentDetails.contentRating && (a.items[0].contentDetails.contentRating.ytRating === "ytAgeRestricted")) {
                    API.moderateForceSkip();
                    return notrackchat(messages.skip.age, data.dj.username);
                }
                if (a.items[0].contentDetails.regionRestriction && a.items[0].contentDetails.regionRestriction.blocked.length) {
                    var countries = a.items[0].contentDetails.regionRestriction.blocked.map(function(a) {
                        return COUNTRIES[a];
                    });
                    if (countries.length > 8) {
                    	var len = countries.length;
                    	countries = countries.slice(0, 4);
                        countries.push(len - 5 + " more");
                    }
                    chat(messages.skip.na.region, data.dj.username, ((countries.length > 1) ? (countries.reverse().splice(1).reverse().join(", ") + " and ") : "") + countries[0] + ".");
                }
                shouldSkip(a.items[0].snippet.title, data.dj.username);
            });
        } else { //soundcloud
            $.ajax({
                url: "https://api.soundcloud.com/tracks/" + data.media.cid + ".json?client_id=" + sckey,
                complete: function(a) {
                    if (a.responseJSON.errors && a.responseJSON.errors.length) {
                        API.moderateForceSkip();
                        chat(messages.skip.na.na);
                        if (!localStorage["brokenlast" + data.dj.id.toString()]) {
                            localStorage["brokenlast" + data.dj.id.toString()] = "true";
                            skipEvent = function() {
                                notrackchat(messages.skip.na.dj, data.dj.username, data.media.author, data.media.title);
                                move(data.dj.id, 1, 0);
                            };
                        }
                        return;
                    }
                    localStorage.removeItem("brokenlast" + data.dj.id.toString());
                    shouldSkip(a.responseJSON.user.username + " - " + a.responseJSON.title, data.dj.username);
                }
            });
        }


        //stuck detection
        /*if (lastReloadInterval)
            clearTimeout(lastReloadInterval);
        lastReloadInterval = setTimeout(function() {
            location.reload();
        }, API.getTimeRemaining() * 1000 + 15000);*/
    }
    
    
    var count = 0;
    if (!localStorage.lastStuck)
    	localStorage.lastStuck = 0;
    function oneTick() {
        if (API.getTimeRemaining() === -1) {
        	count++;
            if (count === 3) {
                API.moderateForceSkip();
                if (localStorage.lastStuck + 16 * 60 * 1000 < (localStorage.lastStuck = new Date().getTime())) {
                    notrackchat(messages.skip.stuck);
                } else {
                    chat(messages.skip.stuck);
                }
            } else
            	setTimeout(oneTick, 2000);
        }
    }
    oneTick();
    
    
    checkForSkip({
        media: API.getMedia(),
        dj: API.getDJ()
    });


    function shouldSkip(song, name) {
        console.log("should i skip " + song + " from " + name + "?");
        if (OP.some(function(a) {
                return a.test(song);
            })) {
            console.log("yes!");
            API.moderateForceSkip();
            notrackchat(messages.skip.op, name, song);
        } else {
            console.log("never!");
        }
    }
    API.on(API.ADVANCE, checkForSkip);


    //credit to beta tester for this :3
    var chatObj = null;
    $.each(require.s.contexts._.defined, function(name, obj) {
        if (!obj) return;
        chatObj = (obj.chatView ? obj : chatObj);
        if (chatObj) return false;
    });


    API.on(API.CHAT, function(data) {
        chatObj.chatView.lastType = null; //split everytime

        var command;
        if (data.message.substring(0, 1) === "!") data.message = "." + data.message.substring(1);
        commands.forEach(function(e) {
            if ((typeof(e.name) === "string") ? (e.name.toLowerCase() === data.message.toLowerCase().substr(0, e.name.length)) : (-1 !== data.message.search(e.name))) command = e;
        });
        if (!command) return;
        API.moderateDeleteChat(data.cid);
        if (!command.permission(API.getUser(data.uid))) return;
        command.run(data);
    });

    console.log("LOADED! :)");
    chat(messages.control.load);
}