
function getHeader() {
    const containerDiv = createElementWrapper("div", ["container", "py-5", "text-center", "parallax", "paraImg1"])
    const titleDiv = createElementWrapper("div", ["row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "g-3"])
    const h1 = createElementWrapper("h1", ["fw-light", "text-light"])
    h1.innerHTML = "Rock & Paper"
    titleDiv.append(h1)

    const mainNavDiv = createElementWrapper("div", ["row", "row-cols-1", "row-cols-sm-1", "row-cols-md-1", "g-3"], "mainNav")
    const colDiv = createElementWrapper("div", ["col"])
    const nav = createElementWrapper("nav", ["navbar", "navbar-expand-lg", "navbar-light", "bg-light"])
    const subContainerDiv = createElementWrapper("div", ["container-fluid"])

    const button = createElementWrapper("button", ["navbar-toggler"],)
    button.type = "button"
    button.setAttribute("data-bs-toggle", "collapse")
    button.setAttribute("data-bs-target", "#navbarRnP")
    button.setAttribute("aria-controls", "navbarRnP")
    button.setAttribute("aria-expanded", "false")
    button.setAttribute("aria-label", "Toggle navigation")
    const navSpan = createElementWrapper("span", ["navbar-toggler-icon"])
    button.append(navSpan)

    const aNav = createElementWrapper("a", ["navbar-brand"])
    aNav.href = "#"
    aNav.innerHTML = "cripto info"

    const collapseDiv = createElementWrapper("div", ["collapse", "navbar-collapse"], "navbarRnP")
    const ul = createElementWrapper("ul", ["navbar-nav", "me-auto", "mb-2", "mb-lg-0"])

    const li1 = createElementWrapper("li", ["nav-item"])
    const a1 = createElementWrapper("a", ["nav-link"], "coinNavID") // can add active to classes ..
    a1.setAttribute("aria-current", "page")
    a1.href = "#"
    a1.innerHTML = "Coin Cards"
    a1.addEventListener("click", () => {
        state.selectedCoinId = [] // will clear if back to page - by design - alternatively can reswitch the indicators to what state.selectedCoinId - maybe to do it ?!?!?
        clearInterval(DOM.chartInterval)
        drawCards(state.coinList)
    })
    li1.append(a1)

    const li2 = createElementWrapper("li", ["nav-item"])
    const a2 = createElementWrapper("a", ["nav-link"], "liveGraphNavID")
    a2.setAttribute("aria-current", "page")
    a2.href = "#"
    a2.innerHTML = "Live Graphs"
    a2.addEventListener("click", () => {
        state.rateAbleCoins = []
        const btnDiv = createElementWrapper("div", ["loader"])
        DOM.mainContent.append(btnDiv)
        setUpChart()
        DOM.chartInterval = setInterval(setUpChart, 60000) // 120000)
    })
    li2.append(a2)

    const li3 = createElementWrapper("li", ["nav-item"])
    const a3 = createElementWrapper("a", ["nav-link"], "aboutNavID")
    a3.setAttribute("aria-current", "page")
    a3.href = "#"
    a3.innerHTML = "About"
    a3.addEventListener("click", () => {
        clearInterval(DOM.chartInterval);
        drawAboutPage()
    })
    li3.append(a3)
    ul.append(li1, li2, li3)

    const dFlexDiv = createElementWrapper("div", ["d-flex"])
    const input = createElementWrapper("input", ["form-control", "me-2"], "searchInput")
    input.type = "search"
    input.placeholder = "Search a Coin..."
    input.setAttribute("aria-label", "Search")

    input.addEventListener("keyup", (e) => {
        if (!e.target.value) {
            drawCards(state.coinList)
            return;
        }
        // for exact match
        const coinFound = state.coinList.find((coin) => { return coin.symbol === e.target.value })
        if (!coinFound) {
            drawCards(state.coinList)
            return;
        }
        drawCards([coinFound])
    })

    dFlexDiv.append(input)
    collapseDiv.append(ul, dFlexDiv)
    subContainerDiv.append(button, aNav, collapseDiv)
    nav.append(subContainerDiv)
    colDiv.append(nav)
    mainNavDiv.append(colDiv)
    containerDiv.append(titleDiv, mainNavDiv)
    return containerDiv
}