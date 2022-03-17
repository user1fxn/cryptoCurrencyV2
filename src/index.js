const API_URL = {
    COIN_API: "https://api.coingecko.com/api/v3/coins",
    COIN_COMPARE_API: "https://min-api.cryptocompare.com/data/pricemulti"
}
const CURRENCY_SYMBOL = {
    USD: "&#36;",
    EURO: "&#8364;",
    ILS: "&#8362;"
}

const DEV_LIMIT = 100;

const DOM = {
    mainContent: document.querySelector("#mainContent"),
    mainHeader: document.querySelector("#mainHeader"),
    staticModal: document.querySelector('#staticModalId'),
    searchInput: document.querySelector('#searchInput'),
    coinNavID: document.querySelector('#coinNavID'),
    liveGraphNavID: document.querySelector('#liveGraphNavID'),
    aboutNavID: document.querySelector('#aboutNavID'),
    chartInterval: null
}

class Coin {
    constructor(cl) {
        this.id = cl.id;
        this.symbol = cl.symbol;
        this.name = cl.name;
    }
    static coinListRefact(coins) {
        //return coins.map((cl: ICoin) => {
        return coins.slice(0, DEV_LIMIT).filter((cl) => { return cl.id !== ""; }).map((cl) => {
            return new Coin(cl);
        });
    }
}
class CoinInfoStorage {
    constructor(datetime, image, usd, euro, ils) {
        this.dateTime = datetime;
        this.image = image;
        this.usd = usd;
        this.euro = euro;
        this.ils = ils;
    }
}

const state = {
    coinList: [],
    selectedCoinId: [],
    swapCoinId: {},
    rateAbleCoins: []
};
function init() {
    DOM.mainHeader.append(getHeader())
    DOM.mainContent.classList.add("parallax", "paraImg2")
    const btnDiv = createElementWrapper("div", ["loader"])
    DOM.mainContent.append(btnDiv)
    onLoad()
    drawModal() //draw once do not add to draw cards

}
init();

async function onLoad() {
    const consArray = await getCoinsList()
    if (!Array.isArray(consArray)) {
        //todo
        alert("no data?")
        return
    }
    const coinList = Coin.coinListRefact(consArray)
    state.coinList = coinList
    drawCards(state.coinList)
}
async function getCoinsList() {
    const url = `${API_URL.COIN_API}/list`
    try {
        const result = await fetch(url)
        const jsonResult = await result.json()
        return jsonResult
    }
    catch (ex) {
        // todo
        return "Something went wrong"
    }
}

function drawCards(coins) {
    DOM.mainContent.innerHTML = ""
    const cardContent = createElementWrapper("div", ["row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "g-3"], "cardContent");
    const result = coins.map(coin => getCard(coin));
    cardContent.append(...result);
    DOM.mainContent.append(cardContent)
}

function drawModal() {
    //class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    //aria-labelledby="staticModalLabel" style="display: none;" aria-hidden="true"
    DOM.staticModal.classList.add("modal", "fade")
    DOM.staticModal.setAttribute("data-bs-backdrop", "static")
    DOM.staticModal.setAttribute("data-bs-keyboard", "false")
    DOM.staticModal.setAttribute("tabindex", "-1")
    DOM.staticModal.setAttribute("aria-labelledby", "staticModalLabel")
    DOM.staticModal.setAttribute("aria-hidden", "true")
    DOM.staticModal.style.display = "none"
    const modalDiv = getModal()
    //console.log(modalDiv)
    DOM.staticModal.append(modalDiv)
}
function drawAboutPage() {
    DOM.mainContent.innerHTML = ""
    const about = setAboutPage()
    DOM.mainContent.append(about)
}

async function setUpChart() {
    const coinRateData = await getChartData()
    if (!coinRateData) {
        clearInterval(DOM.chartInterval);
        return
    }
    updateChartDB(coinRateData)
    drawChart()
}

async function getChartData() {
    const queryParams = _getQueryParams()
    if (!queryParams) {
        alert('select coins first')
        return
    }
    const url = `${API_URL.COIN_COMPARE_API}?${queryParams}`
    try {
        const result = await fetch(url)
        const jsonResult = await result.json()
        return jsonResult

    }
    catch (ex) {
        // todo
        return "Something went wrong"
    }
    function _getQueryParams() {
        const coinsStr = state.selectedCoinId.map((coin) => { return coin.symbol }).toString()
        if (!coinsStr) {
            return
        }

        return `fsyms=${coinsStr}&tsyms=USD&api_key=a695c07c0520194bc303846329af8f2d38f075e959177573c2710786ba437255`
    }
}

function drawChart() {
    DOM.mainContent.innerHTML = ""
    const chatDiv = createElementWrapper("div", [], "chartContainer");
    chatDiv.style.height = "370px"
    chatDiv.style.width = "100%"
    DOM.mainContent.append(chatDiv)
    setChart(state.rateAbleCoins)
}
