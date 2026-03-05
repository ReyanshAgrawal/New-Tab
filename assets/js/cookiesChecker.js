let overlay2 = document.querySelector("#overlay2")
function getCookie(name) {
    let cookies = document.cookie.split(";")
    for (let cookie of cookies) {
        let keyValue = cookie.split("=")
        if (keyValue[0].trim() === name) {
            if (keyValue.length > 2) {}
            return decodeURIComponent(keyValue[1])
        }
    }
    return null;
}
document.cookie = "testcookie=1; expires=Sun, 1 Jul 6767 12:00:00 UTC";
if (!document.cookie) {
    alert(`Please enable cookies in order to use this website\nWARNING: AFTER EXITING THIS ALERT, THERE WILL BE AN OVERLAY DISABLING YOU FROM INTERACTING WITH THE WEBSITE TILL YOU ENABLE COOKIES`)
} else {
    document.cookie = "testcookie=1; expires=Sun, 1 Jul 1967 12:00:00 UTC";
}

function ensureEnabledCookies() {
    setInterval(() => {
        document.cookie = "testcookie=1; expires=Sun, 1 Jul 6767 12:00:00 UTC";
        if (document.cookie) {
            if (overlay2.classList.contains("active")) {
                overlay2.classList.remove("active")
                overlay2.classList.add("inactive")
            }
            if (getCookie("testcookie")) {
                document.cookie = "testcookie=1; expires=Sun, 1 Jul 1967 12:00:00 UTC"
            }
        } else {
            if (overlay2.classList.contains("inactive")) {
                overlay2.classList.add("active")
                overlay2.classList.remove("inactive")
            }
        }
        requestAnimationFrame(ensureEnabledCookies)
    }, 3000)
}
requestAnimationFrame(ensureEnabledCookies)