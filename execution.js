function getEventID(hash) {
    if (document.querySelector(hash + " a")) {
        var anchor = document.querySelector(hash + " a");
        return anchor.getAttribute("href").replace("/events/", "");
    } else {
        return false;
    }
}

function getEventTitle(hash) {
    if (location.hash) {
        return document.querySelector(hash + "-content a").firstChild.nodeValue;
    } else {
        return false;
    }
}

function addCSS(css) {
    var head, style;
    head = document.getElementsByTagName("head")[0];
    if (!head) {
        return;
    }
    style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    head.appendChild(style);
}

function toggleTwitList(obj) {
    var ele = obj.nextSibling.nextSibling;
    ele.style.display = (ele.style.display == "none") ? "block" : "none";
}

function callback(json) {
    var i, atnder,
				userLen = json.events[0].users.length,
        sect = document.createElement("section"),
        list = document.createElement("ul");
    list.setAttribute("class", "twitList");
    list.setAttribute("style", "display:none");
    for (i = 0; i < userLen; i++) {
        atender = json.events[0].users[i];
        if (atender.twitter_id !== null) {
            list.innerHTML += "<li><img src='" + atender.twitter_img + "' alt=''> <a href='http://twitter.com/" + atender.twitter_id + "' class='a-bb'>" + atender.nickname + "</a></li>";
        } else {
            list.innerHTML += "<li><img src='http://t32k.com/s/atndmanager/default.png' alt=''> " + atender.nickname + "</li>";
        }
    }
    var sectionTitle;
    var eventTitle = getEventTitle(location.hash) || document.querySelector("#manage-content a").firstChild.nodeValue;
    switch (location.hash) {
    case "#manage":
        sectionTitle = "イベント管理リスト";
        break;
    case "#join":
        sectionTitle = "イベント参加リスト";
        break;
    case "#cancel":
        sectionTitle = "キャンセルリスト";
        break;
    default:
        sectionTitle = "イベント管理リスト";
        break;
    }
    sect.innerHTML = "<h2 class='hl-line cursor' onclick='toggleTwitList(this)'><span class='red symbol'>+</span>" + sectionTitle + "</h2>";
    sect.innerHTML += "<h3>" + eventTitle + "</h3>";
    sect.appendChild(list);
    document.querySelector("aside.side").appendChild(sect);
}

function makeTwitList() {
    var eventID;
    switch (location.hash) {
    case "#manage":
        eventID = getEventID("#manage-content");
        break;
    case "#join":
        eventID = getEventID("#join-content");
        break;
    case "#cancel":
        eventID = getEventID("#cancel-content");
        break;
    default:
        eventID = getEventID("#manage-content");
        break;
    }
    var eventScriptID = "num" + eventID;
    if (eventID !== false && !document.getElementById(eventScriptID)) {
        var s = document.createElement("script");
        s.id = eventScriptID;
        s.src = "http://api.atnd.org/events/users/?event_id=" + eventID + "&format=jsonp";
        document.body.appendChild(s);
    }
}

var prop = ".twitList img {width:18px; height:18px;}" + ".cursor{ cursor:pointer;}";

addCSS(prop);
makeTwitList();
window.addEventListener("hashchange", makeTwitList, false);