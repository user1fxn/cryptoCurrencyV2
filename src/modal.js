function getModal() {
    const modalDialogDiv = createElementWrapper("div", ["modal-dialog"])
    const modalContentDiv = createElementWrapper("div", ["modal-content"])
    const modalHeaderDiv = createElementWrapper("div", ["modal-header"])
    const h5 = createElementWrapper("h5", ["modal-title"], "staticModalLabel")
    h5.innerText = "Swap Coins" // change this on open
    //const buttonX = createElementWrapper("button", ["btn-close"])
    //buttonX.type = "button"
    //buttonX.setAttribute("data-bs-dismiss", "modal")
    // buttonX.setAttribute("aria-label", "Close")

    modalHeaderDiv.append(h5) //, buttonX)

    const modalBodyDiv = createElementWrapper("div", ["modal-body"], "modalBodyId")
    const modalFooterDiv = createElementWrapper("div", ["modal-footer"])
    const buttonClose = createElementWrapper("button", ["btn", "btn-secondary"])
    buttonClose.setAttribute("data-bs-dismiss", "modal")
    buttonClose.innerText = "Cancel"

    buttonClose.addEventListener("click", (e) => {
        modalBodyDiv.innerHTML = "" //append in card onclick on switch
        _onClickClose()
        state.swapCoinId.to = ""
        state.swapCoinId.from = ""
    })
    const buttonSwSelect = createElementWrapper("button", ["btn", "btn-primary"], "btnSeSelectId")
    buttonSwSelect.innerText = "Switch Selected"
    buttonSwSelect.addEventListener("click", (e) => {
        // console.log(state.selectedCoinId)
        if (state.swapCoinId.from === "") {
            alert('no swap coin selected')
        }
        else {
            const index = state.selectedCoinId.findIndex((cId) => {
                return cId.id === state.swapCoinId.from
            })
            state.selectedCoinId.splice(index, 1)
            const toCoin = state.coinList.find((cId) => { return cId.id === state.swapCoinId.to })
            state.selectedCoinId.push(toCoin) //{ id: data.id, name: data.name, symbol: data.symbol })

            //instad of redrawing
            const fromSwitch = document.querySelector(`[id="${state.swapCoinId.from}_switch"]`)
            //fromSwitch.click()
            fromSwitch.checked = false ///!fromSwitch.checked
            const toSwitch = document.querySelector(`[id="${state.swapCoinId.to}_switch"]`)
            toSwitch.checked = true //!toSwitch.checked
            //toSwitch.click()

            state.swapCoinId.to = ""
            state.swapCoinId.from = ""
            buttonClose.click();
        }
    })

    modalFooterDiv.append(buttonClose, buttonSwSelect)
    modalContentDiv.append(modalHeaderDiv, modalBodyDiv, modalFooterDiv)
    modalDialogDiv.append(modalContentDiv)
    return modalDialogDiv

    function _onClickClose() {
        DOM.staticModal.classList.remove("show")
        DOM.staticModal.style.display = "none"
        DOM.staticModal.removeAttribute("role")
    }
}
function getList(coin) {
    const div = createElementWrapper("div", ["form-check"])
    const input = createElementWrapper("input", ["form-check-input"], coin.id + "_radioId")
    input.type = "radio"
    input.name = "_radioName"
    input.addEventListener("click", (e) => {
        state.swapCoinId.from = coin.id
    })
    const label = createElementWrapper("label", ["form-check-label"])
    label.for = coin.id + "_radioId"
    label.innerText = coin.name

    div.append(input, label)
    return div
}
function appendList(id) {
    const modalContent = document.querySelector("#modalBodyId")
    const modalLabel = document.querySelector("#staticModalLabel")
    const coinRef = state.coinList.find((cId) => { return cId.id === id })
    modalLabel.innerText = `Swap Coin: ${coinRef.name}`
    state.swapCoinId.to = id
    const radioList = state.selectedCoinId.map(coin => getList(coin))
    modalContent.append(...radioList)
}