let tokens = []
let pageUniformRLocator;
let bingPrompt;
let utilsPrompt;
let boolSite;
let enterBingM = document.querySelector(".enterBing")
let enterCustomM = document.querySelector(".enterCustom")
let bingSearchM = document.querySelector("#bingSearch")
let myUtilsSearchM = document.querySelector("#myUtilsSearch")
let utilityImgM = document.querySelector(".utilityImg")
let bingImgM = document.querySelector(".bingImg")

function openNewPage(link) {
    window.location.href = `https://${link}`
}

function openBing() {
    window.location.href = `https://bing.com/search?q=${pageUniformRLocator}`
}

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

enterBingM.addEventListener("click", (e) => {
    bingPrompt = bingSearchM.textContent
    tokenize(bingPrompt, true)
})
bingImgM.addEventListener("click", (e) => {
    bingPrompt = bingSearchM.textContent
    tokenize(bingPrompt, true)
})

enterCustomM.addEventListener("click", (e) => {
    boolSite = confirm("You are entering a URL")
    if (boolSite) {
        utilsPrompt = myUtilsSearchM.textContent
        tokenize(utilsPrompt, false, true)
    } else {
        utilsPrompt = myUtilsSearchM.textContent
        tokenize(utilsPrompt, false)
    }
})
utilityImgM.addEventListener("click", (e) => {
    boolSite = confirm("You are entering a URL")
    if (boolSite) {
        utilsPrompt = myUtilsSearchM.textContent
        tokenize(utilsPrompt, false, true)
    } else {
        utilsPrompt = myUtilsSearchM.textContent
        tokenize(utilsPrompt, false)
    }
})