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


function getCookie3(name) {
    let cookies = document.cookie.split(";")
    for (let cookie of cookies) {
        let keyValue = cookie.split("=")
        if (keyValue[0].trim() === name) {
            return decodeURIComponent(keyValue[1])
        }
    }
    return undefined;
}

function openNewPage(link) {
    window.location.href = `https://${link}`
}
bingSearchM.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && !e.shiftKey) {
        e.preventDefault()
        pageUniformRLocator = encodeURIComponent(bingSearchM.textContent)
        openSearchEngine()
    }
})
myUtilsSearchM.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && !e.shiftKey) {
        e.preventDefault()
        let prompt = myUtilsSearchM.textContent
        if (getCookie3("name")) {
            fetch(`https://newtabusersapi.onrender.com/api/users?name=${encodeURIComponent(getCookie3("name"))}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (Object.keys(shortcuts).length > 0) {
                    shortcuts = data.shortcuts[0]
                    if (Object.keys(shortcuts).includes(prompt)) {
                        openNewPage(shortcuts[prompt])
                    } else {
                        openNewPage(prompt)
                    }
                } else {
                    openNewPage(prompt)
                }
            })
        } else {
            openNewPage(prompt)
        }
    } else if (e.code === "Enter" && e.shiftKey) {
        e.preventDefault()
    }
})
function openSearchEngine() {
    if (getCookie3("name")) {
        fetch(`https://newtabusersapi.onrender.com/api/users?name=${encodeURIComponent(getCookie3("name"))}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            switch (data.searchEngine) {
                case 1:
                    window.location.href = `https://bing.com/search?q=${pageUniformRLocator}`
                    break
                case 2:
                    window.location.href = `https://google.com/search?q=${pageUniformRLocator}`
                    break
                case 3:
                    window.location.href = `https://ecosia.org/search?q=${pageUniformRLocator}`
                    break
            }
        })
    } else {
        window.location.href = `https://google.com/search?q=${pageUniformRLocator}`
    }
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
            let expiryDate = new Date()
            expiryDate.setFullYear(expiryDate.getFullYear() + 1000)
            expiryDate = expiryDate.toUTCString()
            document.cookie = `name=${username}; expires=${expiryDate}; path=/`
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
            let expiryDate = new Date()
            expiryDate.setFullYear(expiryDate.getFullYear() + 1000)
            expiryDate = expiryDate.toUTCString()
            document.cookie = `name=${username}; expires=${expiryDate}; path=/`
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
    deleteAccountBtn.setAttribute("disabled", "")
    let username = getCookie3("name")
    let password = prompt("Please enter your password in order to delete the account you are currently logged into...")
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
            artificialOkay = false;
        }
        return res.json()
    })
    .then(data => {
        if (artificialOkay) {
            document.cookie = `name=${username}; expires=Sun, 1 Jul 1967 12:00:00 UTC; path=/`
            alert("We have successfully deleted your account. You can login to another account or sign up another account after this page refreshes.")
            location.reload()
        } else {
            alert(data.message)
        }
    })
    .catch(err => {
        alert("We are currently facing issues. Please try again later.", err)
    })
})
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && !e.altKey && !e.shiftKey && e.code === "KeyS" && settModal.classList.contains("active")) {       
        e.preventDefault()
        let username = getCookie3("name")
        let password = prompt("Please enter your password in order to save the changes you made to your account...")
        let searchEngine;
        if (bingCheckbox.checked) {
            searchEngine = 1
        } else if (googleCheckbox.checked) {
            searchEngine = 2
        } else {
            searchEngine = 3
        }
        let shortcutValues = document.querySelectorAll(".shortcutValueField")
        let shortcuts = {}
        for (let value of shortcutValues) {
            let shortcutName;
            if (value.value) {
                let idTokens = value.id
                shortcutName = document.querySelector(`#shortcut${idTokens.match(/\d+/)[0]}Name`)
                shortcuts[shortcutName.value] = value.value
            }
        }
        let artificialOkay = true
        fetch("https://newtabusersapi.onrender.com/api/users", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": username,
            "pass": password,
            "searchEngine": searchEngine,
            "shortcuts": shortcuts
        })
    })
    .then(res => {
        if (!res.ok) {
            artificialOkay = false;
        }
        return res.json()
    })
    .then(data => {
        if (artificialOkay) {
            alert("We have successfully edited your account. You may continue to use this page as you normally would.")
        } else {
            alert(data.message)
            location.reload()
        }
    })
    .catch(err => {
        alert("We are currently facing issues. Please try again later.", err)
        location.reload()
    })
    }
})