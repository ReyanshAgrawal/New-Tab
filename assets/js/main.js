let tokens = []
let pageUniformRLocator;
let bingPrompt;
let utilsPrompt;
let boolSite;
let bingSearchM = document.querySelector("#bingSearch")
let myUtilsSearchM = document.querySelector("#myUtilsSearch")
let loginSbmtBtn = document.querySelector("#loginSubmit")
let signupSbmtBtn = document.querySelector("#signupSubmit")
let loginName = document.querySelector(".logName")
let loginPass = document.querySelector(".logPass")
let signupName = document.querySelector(".signName")
let signupPass = document.querySelector(".signPass")
let deleteAccountBtn = document.querySelector(".deleteAccount")

function openNewPage(link) {
    window.location.href = `https://${link}`
}
function tokenize(chars, bool, boolTwo = false) {
    if (bool) {
        pageUniformRLocator = encodeURIComponent(chars)
        openBing()
    } else {
        if (boolTwo) {
            openNewPage(chars)
        } else {
            tokens = [...chars]
            tokens.splice(-4)
            pageUniformRLocator = tokens.join("")
            openUtil()
        }
    }
}
bingSearchM.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && !e.shiftKey) {
        e.preventDefault()
        bingPrompt = bingSearchM.textContent
        tokenize(bingPrompt, true)
    }
})
myUtilsSearchM.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && !e.shiftKey) {
        e.preventDefault()
        boolSite = confirm("You are entering a URL")
        if (boolSite) {
            utilsPrompt = myUtilsSearchM.textContent
            tokenize(utilsPrompt, false, true)
        } else {
            utilsPrompt = myUtilsSearchM.textContent
            tokenize(utilsPrompt, false)
        }
    } else if (e.code === "Enter" && e.shiftKey) {
        e.preventDefault()
    }
})


function openUtil() {
    switch (pageUniformRLocator) {
        case "calculator":
            window.location.href = `https://tinyurl.com/trashTerribleCalculator`
            break;
        case "wcaSim":
            window.location.href = "https://tinyurl.com/wcaSim"
        break;
    }
}
function openBing() {
    window.location.href = `https://bing.com/search?q=${pageUniformRLocator}`
}

loginSbmtBtn.addEventListener("click", e => {
    e.preventDefault()
    loginSbmtBtn.setAttribute("disabled", "")
    let username = loginName.value
    let password = loginPass.value
    let artificialOkay = true
    fetch("https://newtabusersapi.onrender.com/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": username,
            "pass": password
        })
    })
    .then(res => {
        if (!res.ok) {
            loginName.value = ""
            loginPass.value = ""
            artificialOkay = false;
        }
        return res.json()
    })
    .then(data => {
        if (artificialOkay) {
            document.cookie = `name=${username}; expires=Sun, 1 Jul 6767 12:00:00 UTC; path=/`
            alert("Login successful. This page will be refreshed")
            location.reload()
        } else {
            alert(data.message)
        }
    })
    .catch(err => {
        alert("We are currently facing issues. Please try again later.", err)
    })
})
signupSbmtBtn.addEventListener("click", e => {
    e.preventDefault()
    signupSbmtBtn.setAttribute("disabled", "")
    let username = signupName.value
    let password = signupPass.value
    let artificialOkay = true
    fetch("https://newtabusersapi.onrender.com/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": username,
            "pass": password
        })
    })
    .then(res => {
        if (!res.ok) {
            signupName.value = ""
            signupPass.value = ""
            artificialOkay = false;
        }
        return res.json()
    })
    .then(data => {
        if (artificialOkay) {
            document.cookie = `name=${username}; expires=Sun, 1 Jul 6767 12:00:00 UTC; path=/`
            alert("Successfully created your account. This page will be refreshed, in order to start using it, you must log in after the page refreshes.")
            location.reload()
        } else {
            alert(data.message)
        }
    })
    .catch(err => {
        alert("We are currently facing issues. Please try again later.", err)
    })
})
deleteAccountBtn.addEventListener("click", e => {
    e.preventDefault()
    deleteAccountBtn.setAttribute("disabled", "") // CONTINUE
    let username = signupName.value
    let password = signupPass.value
    let artificialOkay = true
    fetch("https://newtabusersapi.onrender.com/api/users", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": username,
            "pass": password
        })
    })
    .then(res => {
        if (!res.ok) {
            signupName.value = ""
            signupPass.value = ""
            artificialOkay = false;
        }
        return res.json()
    })
    .then(data => {
        if (artificialOkay) {
            document.cookie = `name=${username}; expires=Sun, 1 Jul 6767 12:00:00 UTC; path=/`
            alert("Successfully created your account. This page will be refreshed, in order to start using it, you must log in after the page refreshes.")
            location.reload()
        } else {
            alert(data.message)
        }
    })
    .catch(err => {
        alert("We are currently facing issues. Please try again later.", err)
    })
})