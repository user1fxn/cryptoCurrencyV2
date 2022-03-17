const NO_IMAGE = "./image/no-image.png";
const LOAD_IMAGE = "./image/load-icon.png";
const REPORT_SIZE = 5

function getCard(data) {
    const colDiv = createElementWrapper("div", ["col"], data.id);
    const cardDiv = createElementWrapper("div", ["card", "shadow-sm"]);
    const cardBodyTopDiv = createElementWrapper("div", ["card-body"]);
    const rowDiv = createElementWrapper("div", ["row"]);
    const coinID = createElementWrapper("h5", ["col-8", "card-text"]);
    coinID.innerText = data.symbol; //data.id
    const switchDiv = createElementWrapper("div", ["col-4", "form-check", "form-switch"]);
    const switchInput = createElementWrapper("input", ["form-check-input", "float-end"], colDiv.id + "_switch");

    //switchInput.setAttribute("data-bs-toggle", "modal")
    //switchInput.setAttribute("data-bs-target", `[id="staticBackdrop"]`)

    switchInput.addEventListener("click", (e) => {
        const isChecked = e.target.checked
        const index = state.selectedCoinId.findIndex((cId) => {
            return cId.id === data.id
        })
        if (isChecked) {
            const canAdd = state.selectedCoinId.length < REPORT_SIZE
            if (canAdd) {
                const sCoin = new Coin({ id: data.id, name: data.name, symbol: data.symbol })
                state.selectedCoinId.push(sCoin) //{ id: data.id, name: data.name, symbol: data.symbol })
            }
            else {
                appendList(data.id)
                e.target.checked = !e.target.checked //prevent select
                DOM.staticModal.classList.add("show")
                DOM.staticModal.style.display = "block"
                DOM.staticModal.setAttribute("role", "dialog")
            }
        }
        else {
            //switchInput.classList.remove("show")
            if (index < 0) {
                return //do nothing already retured - should not happen
            }
            state.selectedCoinId.splice(index, 1)
        }
    })

    switchInput.type = "checkbox";
    switchDiv.append(switchInput);
    rowDiv.append(coinID, switchDiv);
    cardBodyTopDiv.append(rowDiv);
    const coinName = createElementWrapper("h6", ["card-text", "text-muted"]);
    coinName.innerText = data.name;
    const btnDiv = createElementWrapper("div", ["d-flex", "justify-content-between", "align-items-center"]);
    const collapsCardId = `${colDiv.id}_collaps`;
    const button = createElementWrapper("button", ["btn", "btn-sm", "btn-outline-primary"], colDiv.id + "_button");
    // also an option if not using event listener with toggle on 'show' class
    //button.setAttribute("data-bs-toggle", "collapse")
    //button.setAttribute("data-bs-target", `[id="${collapsCardId}"]`)
    button.setAttribute("aria-expanded", "false");
    button.type = "button";
    button.innerText = "more info";
    button.addEventListener("click", (e) => {
        const thisID = e.target.id.replace("_button", "");
        loader.classList.add("loader"); // in case of server lag / can use timeout to simulate
        //setTimeout(() => { // todo remove - just to see it :)
        const storage = JSON.parse(sessionStorage.getItem(thisID)); //date.id
        if (storage !== null && (new Date()).getTime() - (new Date(storage.dateTime)).getTime() <= 120000) { // under two mins or none get from sessionStorage
            setCurrencyInfo(storage, thisID);
        }
        else {
            onInfo(thisID, thisID); //date.id
        }
        loader.classList.remove("loader");

        cardSubDiv.classList.toggle("show");
        //}, 700);
    });
    const loader = createElementWrapper("div", ["col-6"]);
    btnDiv.append(button, loader);
    const cardSubDiv = createElementWrapper("div", ["card", "collapse", "justify-content-between", "align-items-center", "mt-3"], collapsCardId);
    const carsSubBodyDiv = createElementWrapper("div", ["card-body", "row", "subCard"]);
    const imgDiv = createElementWrapper("div", ["col-4"]);
    //html image element ea bit diferent
    const img = createElementWrapper("img", ["img-fluid", "rounded-start"], colDiv.id + "_img");
    img.alt = data.name;
    img.src = LOAD_IMAGE; // takes time to load image so adding default loading png
    // todo add loader image till loaded 
    imgDiv.append(img);
    const priceWrapperDiv = createElementWrapper("div", ["col-8"]);
    const priceInnerDiv = createElementWrapper("div", ["float-end"]);
    const usdDiv = createElementWrapper("div", ["card-text"], colDiv.id + "_usd");
    const euroDiv = createElementWrapper("div", ["card-text"], colDiv.id + "_euro");
    const shekelDiv = createElementWrapper("div", ["card-text"], colDiv.id + "_shekel");
    priceInnerDiv.append(usdDiv, euroDiv, shekelDiv);
    priceWrapperDiv.append(priceInnerDiv);
    carsSubBodyDiv.append(imgDiv, priceWrapperDiv);
    cardSubDiv.append(carsSubBodyDiv);
    cardDiv.append(rowDiv, coinName, btnDiv, cardSubDiv);
    colDiv.append(cardDiv);
    return colDiv;
}



async function onInfo(coinId, thisID) {
    const coinInfo = await getCoinInfo(coinId)
    // todo add validation
    // consider interface for that object 
    const coinInfoStorage = new CoinInfoStorage(
        new Date(),
        coinInfo.image.small,
        coinInfo.market_data.current_price.usd,
        coinInfo.market_data.current_price.eur,
        coinInfo.market_data.current_price.ils
    )
    setCurrencyInfo(coinInfoStorage, thisID)
    sessionStorage.setItem(coinId, JSON.stringify(coinInfoStorage)) //new Date()-dd //120000
}

async function getCoinInfo(coinId) {
    if (coinId === "") return "id..."
    const url = `${API_URL.COIN_API}/${coinId}`
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
function setCurrencyInfo(coinInfoStorage, thisID) {
    const image = document.querySelector(`[id="${thisID}_img"]`);
    const usd = document.querySelector(`[id="${thisID}_usd"]`);
    const euro = document.querySelector(`[id="${thisID}_euro"]`);
    const shekel = document.querySelector(`[id="${thisID}_shekel"]`);
    image.src = coinInfoStorage.image || NO_IMAGE;
    usd.innerHTML = `USD: ${CURRENCY_SYMBOL.USD}${coinInfoStorage.usd}`;
    euro.innerHTML = `EURO: ${CURRENCY_SYMBOL.EURO}${coinInfoStorage.euro}`;
    shekel.innerHTML = `ILS: ${CURRENCY_SYMBOL.ILS}${coinInfoStorage.ils}`;
}