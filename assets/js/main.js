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
        case "wcaSim":
            window.location.href = "https://tinyurl.com/wcaSim"
    }
}

function tokenize(chars, bool, boolTwo = false) {
    if (bool) {
        tokens = [...chars]
        for (let i = 0; i < chars.length; i++) {
            switch (tokens[i]) {
                case "`":
                    tokens[i] = "%60"
                    break;
                case "@":
                    tokens[i] = "%40"
                    break;
                case "#":
                    tokens[i] = "%23"
                    break;
                case "$":
                    tokens[i] = "%24"
                    break;
                case "%":
                    tokens[i] = "%25"
                    break;
                case "^":
                    tokens[i] = "%5E"
                    break;
                case "&":
                    tokens[i] = "%26"
                    break;
                case "+":
                    tokens[i] = "%2B"
                    break;
                case "=":
                    tokens[i] = "%3D"
                    break;
                case "[":
                    tokens[i] = "%5B"
                    break;
                case "]":
                    tokens[i] = "%5D"
                    break;
                case "{":
                    tokens[i] = "%7B"
                    break;
                case "}":
                    tokens[i] = "%7D"
                    break;
                case "\\":
                    tokens[i] = "%5C"
                    break;
                case "|":
                    tokens[i] = "%7C"
                    break;
                case ";":
                    tokens[i] = "%3B"
                    break;
                case ":":
                    tokens[i] = "%3A"
                    break;
                case "'":
                    tokens[i] = "%27"
                    break;
                case ",":
                    tokens[i] = "%2C"
                    break;
                case "/":
                    tokens[i] = "%2F"
                    break;
            }
        }
        pageUniformRLocator = tokens.join("")
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

// ` = %60
// @ = %40
// # = %23
// $ = %24
// % = %25
// ^ = %5E
// & = %26
// + = %2B
// = = %3D
// [ = %5B
// ] = %5D
// { = %7B
// } = %7D
// \ = %5C
// | = %7C
// ; = %3B
// : = %3A
// ' = %27
// , = %2C
// / = %2F
// ? = %3F
// space = %20